"use client";

import React from "react";
import { Box, Typography, Button, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import styles from "../admin-banner.module.css";

interface HeaderProps {
  bannerCount: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export default function AdminBannerHeader({
  bannerCount,
  searchTerm,
  onSearchChange,
  onAddClick,
}: HeaderProps) {
  return (
    <Box className={styles.headerCard}>
      <Box className={styles.titleRow}>
        <Box>
          <Typography className={styles.pageTitle}>
            Hero Banners Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Total {bannerCount} banners registered for the homepage hero carousel
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          sx={{
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            py: 1,
          }}
        >
          Add New Banner
        </Button>
      </Box>

      <Box className={styles.searchFilterRow}>
        <TextField
          placeholder="Search banners by title, subtitle or redirect link..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          sx={{ width: "380px" }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
}
