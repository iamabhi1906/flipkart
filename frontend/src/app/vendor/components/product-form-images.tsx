"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { uploadProductImage } from "@/services/product.service";
import styles from "../vendor.module.css";

interface ProductFormImagesProps {
  imageUrls: string[];
  onAddImageUrl: () => void;
  onImageUrlChange: (index: number, val: string) => void;
  onRemoveImageUrl: (index: number) => void;
}

export default function ProductFormImages({
  imageUrls,
  onAddImageUrl,
  onImageUrlChange,
  onRemoveImageUrl,
}: ProductFormImagesProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleFileSelect = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIndex(index);
    try {
      const uploadedUrl = await uploadProductImage(file);
      if (uploadedUrl) {
        onImageUrlChange(index, uploadedUrl);
      }
    } catch (err) {
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingIndex(null);
    }
  };

  return (
    <Box>
      <Typography className={styles.filterLabel}>
        Product Images (Upload Images)
      </Typography>
      <Box className={styles.imageInputContainer}>
        {(imageUrls || [""]).map((url, idx) => (
          <Box key={idx} className={styles.imageUrlRow}>
            {uploadingIndex === idx ? (
              <Box className={styles.imagePreview}>
                <CircularProgress size={20} />
              </Box>
            ) : url ? (
              <Image
                src={url}
                alt="product thumbnail"
                width={50}
                height={50}
                className={styles.imagePreview}
                unoptimized
              />
            ) : (
              <Box className={styles.imagePreview} />
            )}

            <Button
              component="label"
              variant="outlined"
              size="small"
              startIcon={<CloudUploadIcon />}
              className={styles.uploadBtn}
            >
              {url ? "Change Image" : "Upload Image"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileSelect(idx, e)}
              />
            </Button>

            {(imageUrls || []).length > 1 && (
              <Button
                color="error"
                size="small"
                onClick={() => onRemoveImageUrl(idx)}
                startIcon={<DeleteIcon />}
              >
                Remove
              </Button>
            )}
          </Box>
        ))}

        <Button
          onClick={onAddImageUrl}
          startIcon={<AddIcon />}
          className={styles.addImageUrlBtn}
        >
          Add Another Image Slot
        </Button>
      </Box>
    </Box>
  );
}
