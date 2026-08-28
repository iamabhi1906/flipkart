"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./variant-chip.module.css";

interface VariantChipProps {
  label: string;
  selected: boolean;
  disabled?: boolean;
  imageUrl?: string;
  onClick: () => void;
}

export default function VariantChip({
  label,
  selected,
  disabled = false,
  imageUrl,
  onClick,
}: VariantChipProps) {
  if (imageUrl) {
    const swatchClasses = [
      styles.imageSwatch,
      selected ? styles.imageSwatchSelected : "",
      disabled ? styles.chipDisabled : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Box
        className={swatchClasses}
        onClick={!disabled ? onClick : undefined}
        role="button"
        aria-pressed={selected}
        tabIndex={disabled ? -1 : 0}
        title={label}
      >
        {selected && (
          <Box className={styles.checkBadge}>
            <CheckIcon style={{ fontSize: 10 }} />
          </Box>
        )}
        <img src={imageUrl} alt={label} className={styles.swatchImage} />
        <Typography
          className={`${styles.swatchLabel} ${
            selected ? styles.swatchLabelSelected : ""
          }`}
        >
          {label}
        </Typography>
      </Box>
    );
  }

  const pillClasses = [
    styles.chipButton,
    selected ? styles.chipSelected : "",
    disabled ? styles.chipDisabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Box
      className={pillClasses}
      onClick={!disabled ? onClick : undefined}
      role="button"
      aria-pressed={selected}
      tabIndex={disabled ? -1 : 0}
    >
      <Typography variant="body2" component="span" style={{ fontWeight: selected ? 700 : 600 }}>
        {label}
      </Typography>
    </Box>
  );
}
