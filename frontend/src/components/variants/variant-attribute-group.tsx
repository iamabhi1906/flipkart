"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import VariantChip from "./variant-chip";
import styles from "./variant-attribute-group.module.css";

interface VariantAttributeGroupProps {
  attributeName: string;
  options: string[];
  selectedValue: string;
  onSelectOption: (option: string) => void;
  isOptionAvailable?: (option: string) => boolean;
  getOptionImage?: (option: string) => string | undefined;
}

export default function VariantAttributeGroup({
  attributeName,
  options,
  selectedValue,
  onSelectOption,
  isOptionAvailable = () => true,
  getOptionImage,
}: VariantAttributeGroupProps) {
  const isColorAttr = attributeName.toLowerCase().includes("color");

  return (
    <Box className={styles.groupContainer}>
      <Box className={styles.groupHeader}>
        <Typography className={styles.attributeTitle}>
          {attributeName.toUpperCase()}:
        </Typography>
        <Typography className={styles.selectedValue}>
          {selectedValue || "Select"}
        </Typography>
      </Box>

      <Box className={styles.chipsContainer}>
        {options.map((option) => {
          const isSelected = selectedValue === option;
          const available = isOptionAvailable(option);
          const imageUrl = getOptionImage ? getOptionImage(option) : undefined;

          return (
            <VariantChip
              key={option}
              label={option}
              selected={isSelected}
              disabled={!available}
              imageUrl={isColorAttr ? imageUrl : undefined}
              onClick={() => onSelectOption(option)}
            />
          );
        })}
      </Box>
    </Box>
  );
}
