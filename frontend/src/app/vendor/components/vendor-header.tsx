"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import styles from "../vendor.module.css";

interface VendorHeaderProps {
  onRefresh: () => void;
  onOpenAddForm: () => void;
}

export default function VendorHeader({
  onRefresh,
  onOpenAddForm,
}: VendorHeaderProps) {
  return (
    <Box className={styles.headerRow}>
      <Box>
        <Typography className={styles.headerTitle}>
          Seller Product Hub
        </Typography>
        <Typography className={styles.headerSub}>
          Manage inventory, prices, status, and track storefront catalog performance
        </Typography>
      </Box>
      <Box className={styles.headerActions}>
        <Button
          onClick={onRefresh}
          className={styles.refreshBtn}
          startIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
        <Button
          onClick={onOpenAddForm}
          className={styles.addProductBtn}
          startIcon={<AddIcon />}
        >
          ADD NEW PRODUCT
        </Button>
      </Box>
    </Box>
  );
}
