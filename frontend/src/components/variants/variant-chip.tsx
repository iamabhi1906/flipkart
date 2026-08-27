"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./variant-chip.module.css";

interface VariantChipProps {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export default function VariantChip({
  label,
  selected,
  disabled = false,
  onClick,
}: VariantChipProps) {
  const classNames = [
    styles.chipButton,
    selected ? styles.chipSelected : "",
    disabled ? styles.chipDisabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Box
      className={classNames}
      onClick={!disabled ? onClick : undefined}
      role="button"
      aria-pressed={selected}
      tabIndex={disabled ? -1 : 0}
    >
      <Typography variant="body2" component="span">
        {label}
      </Typography>
    </Box>
  );
}
