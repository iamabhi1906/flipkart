"use client";

import React, { useMemo } from "react";
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
  const baseImages = useMemo(() => {
    if (product.images && product.images.length > 0) {
      return product.images.map((i: any) => i.imageUrl || i);
    }
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls;
    }
    return [];
  }, [product]);

  const images = useMemo(() => {
    const vImages = selectedVariant?.images || [];
    const vThumb = selectedVariant?.thumbnail;

    const list: string[] = [];
    if (vThumb && typeof vThumb === "string" && vThumb.trim() !== "") {
      list.push(vThumb);
    }
    vImages.forEach((img: string) => {
      if (img && typeof img === "string" && img.trim() !== "" && !list.includes(img)) {
        list.push(img);
      }
    });

    if (list.length > 0) return list;
    return baseImages.length > 0 ? baseImages : ["/placeholder.png"];
  }, [selectedVariant, baseImages]);

  const mainUrl = selectedImage && images.includes(selectedImage) ? selectedImage : images[0];

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
                alt={`${product.name} thumbnail ${idx + 1}`}
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
