"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import PrimarySearchAppBar from "@/components/appbar";
import PdpGallery from "./components/pdp-gallery";
import PdpInfo from "./components/pdp-info";
import PdpSpecs from "./components/pdp-specs";
import { useProductDetail } from "./hooks/use-product-detail";
import styles from "./pdp.module.css";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Array.isArray(params?.id) ? params.id[0] : params?.id || "";

  const {
    product,
    loading,
    selectedImage,
    setSelectedImage,
    selectedVariant,
    setSelectedVariant,
    displayPrice,
    effectiveStock,
  } = useProductDetail(productId);

  return (
    <Box className={styles.pdpContainer}>
      <PrimarySearchAppBar />

      <Box className={styles.pdpMain}>
        {loading ? (
          <Box style={{ textAlign: "center", padding: 64 }}>
            <CircularProgress />
          </Box>
        ) : !product ? (
          <Box style={{ textAlign: "center", padding: 64 }}>
            <Typography variant="h5">Product Not Found</Typography>
          </Box>
        ) : (
          <>
            <Box className={styles.pdpCard}>
              <PdpGallery
                product={product}
                selectedImage={selectedImage}
                onSelectImage={setSelectedImage}
              />
              <PdpInfo
                product={product}
                displayPrice={displayPrice}
                effectiveStock={effectiveStock}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
              />
            </Box>
            <PdpSpecs product={product} />
          </>
        )}
      </Box>
    </Box>
  );
}
