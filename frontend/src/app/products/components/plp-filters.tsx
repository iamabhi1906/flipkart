"use client";

import React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import styles from "../plp.module.css";

interface PlpFiltersProps {
  categories: any[];
  categoryId: string;
  onSelectCategory: (id: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
  onReset: () => void;
}

export default function PlpFilters({
  categories,
  categoryId,
  onSelectCategory,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  onReset,
}: PlpFiltersProps) {
  return (
    <Box className={styles.sidebarCard}>
      <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <FilterListIcon style={{ color: "#2874f0" }} />
        <Typography className={styles.sidebarTitle}>Filters</Typography>
      </Box>

      <Divider />

      <Box className={styles.filterSection}>
        <Typography className={styles.filterLabel}>Category</Typography>
        <Select
          fullWidth
          size="small"
          value={categoryId}
          onChange={(e) => onSelectCategory(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Divider />

      <Box className={styles.filterSection}>
        <Typography className={styles.filterLabel}>Price Range (₹)</Typography>
        <Box style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <TextField
            size="small"
            placeholder="Min"
            type="number"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
          />
          <Typography style={{ color: "#94a3b8" }}>-</Typography>
          <TextField
            size="small"
            placeholder="Max"
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
          />
        </Box>
      </Box>

      <Divider />

      <Button variant="outlined" color="secondary" onClick={onReset} fullWidth>
        CLEAR ALL FILTERS
      </Button>
    </Box>
  );
}
