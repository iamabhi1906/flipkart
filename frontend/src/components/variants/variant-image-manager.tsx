"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import { uploadProductImage } from "@/services/product.service";
import styles from "./variant-image-manager.module.css";

interface VariantImageManagerProps {
  label?: string;
  images: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export default function VariantImageManager({
  label = "Variant Images",
  images = [],
  onChange,
  maxImages = 6,
}: VariantImageManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlField, setShowUrlField] = useState(false);

  const validImages = images.filter((img) => img && img.trim() !== "");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadProductImage(files[i]);
        console.log(url);
        if (url) uploadedUrls.push(url);
      }
      onChange([...validImages, ...uploadedUrls].slice(0, maxImages));
    } catch (err) {
      console.error("Variant image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    onChange([...validImages, urlInput.trim()].slice(0, maxImages));
    setUrlInput("");
    setShowUrlField(false);
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    const reordered = [...validImages];
    const [selected] = reordered.splice(index, 1);
    reordered.unshift(selected);
    onChange(reordered);
  };

  const handleRemove = (index: number) => {
    const filtered = validImages.filter((_, idx) => idx !== index);
    onChange(filtered);
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.label}>
        {label} ({validImages.length}/{maxImages})
      </Typography>

      <Box className={styles.imageGrid}>
        {validImages.map((url, idx) => {
          const isPrimary = idx === 0;
          return (
            <Box
              key={idx}
              className={`${styles.imageCard} ${
                isPrimary ? styles.imageCardPrimary : ""
              }`}
            >
              <img
                src={url}
                alt={`Variant image ${idx + 1}`}
                className={styles.thumbnailImg}
              />
              <Box className={styles.actionOverlay}>
                <IconButton
                  size="small"
                  className={styles.actionBtn}
                  onClick={() => handleSetPrimary(idx)}
                  title={isPrimary ? "Primary Image" : "Set as primary"}
                >
                  {isPrimary ? (
                    <StarIcon style={{ fontSize: 14, color: "#ffb703" }} />
                  ) : (
                    <StarBorderIcon style={{ fontSize: 14 }} />
                  )}
                </IconButton>
                <IconButton
                  size="small"
                  className={styles.actionBtn}
                  onClick={() => handleRemove(idx)}
                  title="Remove image"
                >
                  <DeleteIcon style={{ fontSize: 14 }} />
                </IconButton>
              </Box>
              {isPrimary && <Box className={styles.primaryBadge}>Primary</Box>}
            </Box>
          );
        })}

        {validImages.length < maxImages && (
          <Box component="label" className={styles.uploadBox}>
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {uploading ? (
              <CircularProgress size={22} color="primary" />
            ) : (
              <>
                <AddPhotoAlternateIcon className={styles.uploadIcon} />
                <Typography className={styles.uploadText}>
                  Upload File
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>

      {validImages.length < maxImages && (
        <Box style={{ marginTop: 4 }}>
          {!showUrlField ? (
            <Button
              size="small"
              variant="text"
              startIcon={<AddIcon />}
              onClick={() => setShowUrlField(true)}
              style={{ fontSize: 11, textTransform: "none" }}
            >
              + Or paste image URL
            </Button>
          ) : (
            <Box style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <TextField
                size="small"
                placeholder="https://..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <Button
                size="small"
                variant="contained"
                onClick={handleAddUrl}
                style={{ fontSize: 11, minWidth: 50 }}
              >
                Add
              </Button>
              <Button
                size="small"
                variant="text"
                onClick={() => setShowUrlField(false)}
                style={{ fontSize: 11, color: "#64748b" }}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
