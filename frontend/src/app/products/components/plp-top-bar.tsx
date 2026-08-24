"use client";

import React from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../plp.module.css";

interface PlpTopBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  total: number;
  sortBy: string;
  onSortByChange: (val: string) => void;
}

export default function PlpTopBar({
  search,
  onSearchChange,
  total,
  sortBy,
  onSortByChange,
}: PlpTopBarProps) {
  return (
    <Box className={styles.topBarCard}>
      <Box style={{ display: "flex", alignItems: "center", gap: 16, flexGrow: 1, maxWidth: 400 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search products by name..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "#64748b" }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Typography variant="body2" style={{ fontWeight: 600, color: "#475569" }}>
        Showing {total} product{total === 1 ? "" : "s"}
      </Typography>

      <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Typography variant="body2" style={{ fontWeight: 600, color: "#475569" }}>
          Sort By:
        </Typography>
        <Select
          size="small"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
        >
          <MenuItem value="newest">Newest Arrivals</MenuItem>
          <MenuItem value="price_asc">Price: Low to High</MenuItem>
          <MenuItem value="price_desc">Price: High to Low</MenuItem>
          <MenuItem value="popular">Most Popular</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}
