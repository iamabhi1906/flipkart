"use client";

import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import ImageIcon from "@mui/icons-material/Image";
import StyleIcon from "@mui/icons-material/Style";
import styles from "./product-form-header.module.css";

interface ProductFormHeaderProps {
  isEditing: boolean;
  activeTab: number;
  onTabChange: (tabIndex: number) => void;
  onClose: () => void;
}

export default function ProductFormHeader({
  isEditing,
  activeTab,
  onTabChange,
  onClose,
}: ProductFormHeaderProps) {
  return (
    <Box className={styles.headerWrapper}>
      <Box className={styles.topRow}>
        <Typography className={styles.titleText}>
          {isEditing ? "Edit Product Listing" : "Add New Product"}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Box className={styles.tabsRow}>
        <Box
          className={`${styles.tabButton} ${
            activeTab === 0 ? styles.tabActive : ""
          }`}
          onClick={() => onTabChange(0)}
          role="button"
          tabIndex={0}
        >
          <InfoIcon style={{ fontSize: 18 }} /> Basic Info
        </Box>
        <Box
          className={`${styles.tabButton} ${
            activeTab === 1 ? styles.tabActive : ""
          }`}
          onClick={() => onTabChange(1)}
          role="button"
          tabIndex={0}
        >
          <ImageIcon style={{ fontSize: 18 }} /> Product Gallery
        </Box>
        <Box
          className={`${styles.tabButton} ${
            activeTab === 2 ? styles.tabActive : ""
          }`}
          onClick={() => onTabChange(2)}
          role="button"
          tabIndex={0}
        >
          <StyleIcon style={{ fontSize: 18 }} /> Dynamic Variants
        </Box>
      </Box>
    </Box>
  );
}
