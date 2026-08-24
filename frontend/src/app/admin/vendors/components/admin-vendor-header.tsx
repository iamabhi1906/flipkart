"use client";

import React from "react";
import { Box, Typography, TextField, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { VendorData } from "@/services/vendor.service";
import styles from "../admin-vendor.module.css";

interface AdminVendorHeaderProps {
  vendors: VendorData[];
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

export default function AdminVendorHeader({
  vendors,
  searchTerm,
  onSearchChange,
}: AdminVendorHeaderProps) {
  const activeCount = vendors.filter((v) => v.user?.status === "active").length;
  const suspendedCount = vendors.filter((v) => v.user?.status === "suspended").length;
  const disabledCount = vendors.filter((v) => v.user?.status === "disabled").length;

  return (
    <Box className={styles.headerCard}>
      <Box className={styles.titleRow}>
        <Typography component="h1" className={styles.pageTitle}>
          Admin Vendor Management
        </Typography>
        <Box className={styles.statsRow}>
          <Chip label={`Active: ${activeCount}`} className={styles.activeChip} />
          <Chip label={`Suspended: ${suspendedCount}`} className={styles.suspendedChip} />
          <Chip label={`Disabled: ${disabledCount}`} className={styles.disabledChip} />
        </Box>
      </Box>

      <Box className={styles.searchFilterRow}>
        <TextField
          size="small"
          placeholder="Search vendor business name, email, or tax number..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: <SearchIcon style={{ marginRight: 8, color: "#64748b" }} />,
            },
          }}
          fullWidth
        />
      </Box>
    </Box>
  );
}
