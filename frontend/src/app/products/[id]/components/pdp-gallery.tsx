"use client";

import React from "react";
import { Box, ButtonBase } from "@mui/material";
import Image from "next/image";
import { ProductData } from "@/services/product.service";
import styles from "../pdp.module.css";

interface PdpGalleryProps {
  product: ProductData;
  selectedImage: string;
  onSelectImage: (url: string) => void;
  selectedVariant?: any;
}

export default function PdpGallery({
  product,
  selectedImage,
  onSelectImage,
  selectedVariant,
}: PdpGalleryProps) {
  const baseImages =
    product.images && product.images.length > 0
      ? product.images.map((i: any) => i.imageUrl || i)
      : product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls
      : [];

  const variantImages = selectedVariant?.images || [];
  const variantThumb = selectedVariant?.thumbnail;

  const combined = Array.from(
    new Set(
      [
        ...(variantThumb ? [variantThumb] : []),
        ...variantImages,
        ...baseImages,
      ].filter((u) => u && typeof u === "string" && u.trim() !== "")
    )
  );

  const images = combined.length > 0 ? combined : ["/placeholder.png"];
  const mainUrl = selectedImage || images[0];

  return (
    <Box className={styles.gallerySection}>
      <Box className={styles.mainImageFrame}>
        <Image
          src={mainUrl}
          alt={product.name}
          width={400}
          height={400}
          className={styles.mainImage}
          unoptimized
        />
      </Box>

      {images.length > 1 && (
        <Box className={styles.thumbStrip}>
          {images.map((url, idx) => (
            <ButtonBase
              key={idx}
              className={`${styles.thumbBtn} ${
                url === mainUrl ? styles.selectedThumb : ""
              }`}
              onClick={() => onSelectImage(url)}
            >
              <Image
                src={url}
                alt={`${product.name} thumbnail ${idx}`}
                width={60}
                height={60}
                className={styles.thumbImg}
                unoptimized
              />
            </ButtonBase>
          ))}
        </Box>
      )}
    </Box>
  );
}
