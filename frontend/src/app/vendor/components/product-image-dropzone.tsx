"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { uploadProductImage } from "@/services/product.service";
import styles from "./product-image-dropzone.module.css";

interface ProductImageDropzoneProps {
  label: string;
  images: string[];
  onChangeImages: (urls: string[]) => void;
  multiple?: boolean;
}

export default function ProductImageDropzone({
  label,
  images,
  onChangeImages,
  multiple = true,
}: ProductImageDropzoneProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadProductImage(files[i]);
        if (url) newUrls.push(url);
      }
      if (multiple) {
        const cleanExisting = images.filter((u) => u.trim() !== "");
        onChangeImages([...cleanExisting, ...newUrls]);
      } else {
        onChangeImages(newUrls.slice(0, 1));
      }
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, idx) => idx !== index);
    onChangeImages(updated);
  };

  const validImages = images.filter((u) => u && u.trim() !== "");

  return (
    <Box className={styles.uploaderContainer}>
      <Typography variant="subtitle2" style={{ fontWeight: 700 }}>
        {label}
      </Typography>

      <Box component="label" className={styles.dropzoneCard}>
        <input
          type="file"
          hidden
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
        />
        {uploading ? (
          <>
            <CircularProgress size={36} color="primary" />
            <Typography variant="body2" className={styles.uploadTitle}>
              Uploading to Cloudinary...
            </Typography>
          </>
        ) : (
          <>
            <CloudUploadIcon className={styles.cloudIcon} />
            <Typography variant="body2" className={styles.uploadTitle}>
              Click to select or upload image files
            </Typography>
            <Typography variant="caption" className={styles.uploadSubtitle}>
              Supports PNG, JPG, WEBP & GIF (Direct Cloudinary Upload)
            </Typography>
          </>
        )}
      </Box>

      {validImages.length > 0 && (
        <Box className={styles.gridContainer}>
          {validImages.map((url, idx) => (
            <Box key={idx} className={styles.imageCard}>
              <img
                src={url}
                alt={`Uploaded product preview ${idx + 1}`}
                className={styles.previewImage}
              />
              <IconButton
                size="small"
                className={styles.removeOverlay}
                onClick={() => handleRemove(idx)}
              >
                <DeleteIcon style={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
