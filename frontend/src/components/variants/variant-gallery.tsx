"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./variant-gallery.module.css";

interface VariantGalleryProps {
  images?: string[];
  thumbnail?: string;
  fallbackImage?: string;
  altText?: string;
}

export default function VariantGallery({
  images = [],
  thumbnail,
  fallbackImage = "/placeholder.png",
  altText = "Product variant view",
}: VariantGalleryProps) {
  const allImages = React.useMemo(() => {
    const list: string[] = [];
    if (thumbnail && !list.includes(thumbnail)) {
      list.push(thumbnail);
    }
    images.forEach((img) => {
      if (img && !list.includes(img)) list.push(img);
    });
    return list.length > 0 ? list : [fallbackImage];
  }, [images, thumbnail, fallbackImage]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [images, thumbnail]);

  const currentImage = allImages[activeImageIndex] || fallbackImage;

  return (
    <Box className={styles.galleryContainer}>
      <Box className={styles.mainView}>
        {currentImage ? (
          <img
            src={currentImage}
            alt={altText}
            className={styles.mainImage}
          />
        ) : (
          <Typography className={styles.noImage}>No image available</Typography>
        )}
      </Box>

      {allImages.length > 1 && (
        <Box className={styles.thumbnailStrip}>
          {allImages.map((imgUrl, idx) => {
            const isActive = idx === activeImageIndex;
            return (
              <Box
                key={idx}
                className={`${styles.thumbnailItem} ${
                  isActive ? styles.thumbnailActive : ""
                }`}
                onClick={() => setActiveImageIndex(idx)}
              >
                <img
                  src={imgUrl}
                  alt={`${altText} thumbnail ${idx + 1}`}
                  className={styles.thumbnailImage}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
