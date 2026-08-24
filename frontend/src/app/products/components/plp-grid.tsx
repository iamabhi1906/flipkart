"use client";

import React from "react";
import { Box, Typography, Chip, Pagination } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ProductData } from "@/services/product.service";
import styles from "../plp.module.css";

interface PlpGridProps {
  products: ProductData[];
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function PlpGrid({
  products,
  page,
  totalPages,
  onPageChange,
}: PlpGridProps) {
  const router = useRouter();

  if (!products || products.length === 0) {
    return (
      <Box style={{ textAlign: "center", padding: 48, backgroundColor: "#fff", borderRadius: 12 }}>
        <Typography variant="h6" style={{ color: "#64748b" }}>
          No products matched your criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box className={styles.productGrid}>
        {products.map((product) => {
          const imgUrl =
            product.images && product.images.length > 0
              ? product.images[0].imageUrl || product.images[0]
              : product.imageUrls && product.imageUrls.length > 0
              ? product.imageUrls[0]
              : "/placeholder.png";

          const price = Number(product.price || 0);
          const comparePrice = Number(product.compareAtPrice || 0);
          const discount =
            comparePrice > price
              ? Math.round(((comparePrice - price) / comparePrice) * 100)
              : 0;

          const stock = Number(
            product.effectiveStockQuantity ?? product.stockQuantity ?? 0,
          );

          return (
            <Box
              key={product.id}
              className={styles.productCard}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <Box className={styles.cardImageFrame}>
                <Image
                  src={imgUrl}
                  alt={product.name}
                  width={180}
                  height={180}
                  className={styles.cardImage}
                  unoptimized
                />
              </Box>
              <Box className={styles.cardBody}>
                <Typography className={styles.cardCategory}>
                  {product.category?.name || "General Catalog"}
                </Typography>
                <Typography className={styles.cardTitle}>
                  {product.name}
                </Typography>
                <Box className={styles.cardPriceRow}>
                  <Typography className={styles.cardPrice}>
                    ₹{price.toLocaleString("en-IN")}
                  </Typography>
                  {comparePrice > price && (
                    <>
                      <Typography className={styles.cardComparePrice}>
                        ₹{comparePrice.toLocaleString("en-IN")}
                      </Typography>
                      <Typography variant="caption" style={{ color: "#166534", fontWeight: 700 }}>
                        {discount}% OFF
                      </Typography>
                    </>
                  )}
                </Box>
                <Box style={{ marginTop: 4 }}>
                  {stock > 0 ? (
                    <Chip label="In Stock" size="small" color="success" />
                  ) : (
                    <Chip label="Out of Stock" size="small" color="error" />
                  )}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {totalPages > 1 && (
        <Box className={styles.paginationRow}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}
