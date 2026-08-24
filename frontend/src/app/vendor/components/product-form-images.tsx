"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography, TextField, Button } from "@mui/material";
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
  return (
    <Box>
      <Typography className={styles.filterLabel}>
        Product Images (URLs)
      </Typography>
      <Box className={styles.imageInputContainer}>
        {(imageUrls || [""]).map((url, idx) => (
          <Box key={idx} className={styles.imageUrlRow}>
            {url ? (
              <Image
                src={url}
                alt="preview"
                width={44}
                height={44}
                className={styles.imagePreview}
                unoptimized
              />
            ) : (
              <Box className={styles.imagePreview} />
            )}
            <TextField
              fullWidth
              size="small"
              placeholder="https://images.unsplash.com/... or image link"
              value={url}
              onChange={(e) => onImageUrlChange(idx, e.target.value)}
            />
            {(imageUrls || []).length > 1 && (
              <Button
                color="error"
                size="small"
                onClick={() => onRemoveImageUrl(idx)}
              >
                Remove
              </Button>
            )}
          </Box>
        ))}
        <Button onClick={onAddImageUrl} className={styles.addImageUrlBtn}>
          + Add Another Image URL
        </Button>
      </Box>
    </Box>
  );
}
