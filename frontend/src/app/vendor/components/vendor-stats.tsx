"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import styles from "../vendor.module.css";

interface VendorStatsProps {
  totalProducts: number;
  activeProducts: number;
  totalStock: number;
  lowStockCount: number;
  totalValuation: number;
}

export default function VendorStats({
  totalProducts,
  activeProducts,
  totalStock,
  lowStockCount,
  totalValuation,
}: VendorStatsProps) {
  return (
    <Box className={styles.statsGrid}>
      <Box className={styles.statCard}>
        <Box className={`${styles.statIconBox} ${styles.statIconBlue}`}>
          <InventoryIcon />
        </Box>
        <Box>
          <Typography className={styles.statValue}>{totalProducts}</Typography>
          <Typography className={styles.statLabel}>Total Products</Typography>
        </Box>
      </Box>

      <Box className={styles.statCard}>
        <Box className={`${styles.statIconBox} ${styles.statIconGreen}`}>
          <CheckCircleIcon />
        </Box>
        <Box>
          <Typography className={styles.statValue}>{activeProducts}</Typography>
          <Typography className={styles.statLabel}>Active Listings</Typography>
        </Box>
      </Box>

      <Box className={styles.statCard}>
        <Box className={`${styles.statIconBox} ${styles.statIconPurple}`}>
          <InventoryIcon />
        </Box>
        <Box>
          <Typography className={styles.statValue}>{totalStock}</Typography>
          <Typography className={styles.statLabel}>Total Stock Items</Typography>
        </Box>
      </Box>

      <Box className={styles.statCard}>
        <Box className={`${styles.statIconBox} ${styles.statIconAmber}`}>
          <WarningIcon />
        </Box>
        <Box>
          <Typography className={styles.statValue}>{lowStockCount}</Typography>
          <Typography className={styles.statLabel}>Low Stock Alert</Typography>
        </Box>
      </Box>

      <Box className={styles.statCard}>
        <Box className={`${styles.statIconBox} ${styles.statIconGreen}`}>
          <TrendingUpIcon />
        </Box>
        <Box>
          <Typography className={styles.statValue}>
            ₹{totalValuation.toLocaleString("en-IN")}
          </Typography>
          <Typography className={styles.statLabel}>Stock Valuation</Typography>
        </Box>
      </Box>
    </Box>
  );
}
