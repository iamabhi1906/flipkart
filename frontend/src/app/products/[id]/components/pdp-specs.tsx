"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { ProductData } from "@/services/product.service";
import styles from "../pdp.module.css";

interface PdpSpecsProps {
  product: ProductData;
}

export default function PdpSpecs({ product }: PdpSpecsProps) {
  return (
    <Box className={styles.specsCard}>
      <Typography variant="h6" style={{ fontWeight: 800, marginBottom: 12 }}>
        Product Specifications & Description
      </Typography>
      <Divider style={{ marginBottom: 16 }} />

      <Typography
        variant="body1"
        style={{ color: "#334155", lineHeight: 1.6, whiteSpace: "pre-line" }}
      >
        {product.description ||
          "No detailed description provided for this product listing."}
      </Typography>
    </Box>
  );
}
