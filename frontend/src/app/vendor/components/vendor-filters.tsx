"use client";

import React from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputAdornment,
  IconButton,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "../vendor.module.css";

interface VendorFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  categories: any[];
  onReset: () => void;
}

export default function VendorFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  categories,
  onReset,
}: VendorFiltersProps) {
  const isFiltered =
    searchQuery ||
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    sortBy !== "newest";

  const allCategoryOption = { id: "all", name: "All Categories" };
  const categoryOptions = [allCategoryOption, ...categories];
  const currentCategoryValue =
    categoryOptions.find((cat) => cat.id === selectedCategory) ||
    allCategoryOption;

  return (
    <Box className={styles.controlsCard}>
      <Box className={styles.searchBarRow}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search products by title, SKU, or keywords..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchQuery("")}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />
      </Box>

      <Box className={styles.filtersRow}>
        <Box className={styles.filterGroup}>
          <Typography className={styles.filterLabel}>Category:</Typography>
          <Autocomplete
            size="small"
            options={categoryOptions}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.name || ""
            }
            value={currentCategoryValue}
            onChange={(_, newValue) => {
              setSelectedCategory(newValue ? newValue.id : "all");
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            className={styles.filterAutocomplete}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder="Search category..."
              />
            )}
          />
        </Box>

        <Box className={styles.filterGroup}>
          <Typography className={styles.filterLabel}>Status:</Typography>
          <FormControl size="small">
            <Select
              className={styles.filterSelect}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="out_of_stock">Out of Stock</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className={styles.filterGroup}>
          <Typography className={styles.filterLabel}>Sort By:</Typography>
          <FormControl size="small">
            <Select
              className={styles.filterSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="newest">Newest First</MenuItem>
              <MenuItem value="price_asc">Price: Low to High</MenuItem>
              <MenuItem value="price_desc">Price: High to Low</MenuItem>
              <MenuItem value="stock_desc">Highest Stock</MenuItem>
              <MenuItem value="name_asc">Name: A to Z</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {isFiltered && (
          <Button
            size="small"
            variant="outlined"
            onClick={onReset}
            className={styles.resetFiltersBtn}
          >
            Reset Filters
          </Button>
        )}
      </Box>
    </Box>
  );
}
