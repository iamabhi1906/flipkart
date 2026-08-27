"use client";

import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import styles from "./product-variant-item.module.css";

interface ProductVariantAttributesProps {
  attributes?: Record<string, string>;
  onChangeAttributes: (newAttrs: Record<string, string>) => void;
}

export default function ProductVariantAttributes({
  attributes = {},
  onChangeAttributes,
}: ProductVariantAttributesProps) {
  const [attrPairs, setAttrPairs] = useState<{ key: string; value: string }[]>(
    Object.entries(attributes).map(([k, v]) => ({ key: k, value: String(v) }))
  );

  const updateAttributes = (newPairs: { key: string; value: string }[]) => {
    setAttrPairs(newPairs);
    const obj: Record<string, string> = {};
    newPairs.forEach((p) => {
      if (p.key.trim() && p.value.trim()) {
        obj[p.key.trim()] = p.value.trim();
      }
    });
    onChangeAttributes(obj);
  };

  const handleAddAttr = () => updateAttributes([...attrPairs, { key: "", value: "" }]);
  const handleRemoveAttr = (idx: number) => updateAttributes(attrPairs.filter((_, i) => i !== idx));
  const handleAttrChange = (idx: number, field: "key" | "value", val: string) => {
    updateAttributes(
      attrPairs.map((pair, i) => (i === idx ? { ...pair, [field]: val } : pair))
    );
  };

  return (
    <Box className={styles.attrList}>
      <Typography variant="caption" style={{ fontWeight: 700, color: "#475569" }}>
        Dynamic Attributes (Key-Value Pairs e.g. Color=Blue, Size=XL, RAM=8GB):
      </Typography>
      {attrPairs.map((pair, aIdx) => (
        <Box key={aIdx} className={styles.attrRow}>
          <TextField
            size="small"
            label="Key"
            placeholder="e.g. RAM"
            value={pair.key}
            onChange={(e) => handleAttrChange(aIdx, "key", e.target.value)}
            style={{ flex: 1 }}
          />
          <TextField
            size="small"
            label="Value"
            placeholder="e.g. 16GB"
            value={pair.value}
            onChange={(e) => handleAttrChange(aIdx, "value", e.target.value)}
            style={{ flex: 1 }}
          />
          <IconButton size="small" color="error" onClick={() => handleRemoveAttr(aIdx)}>
            <DeleteIcon style={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      ))}
      <Button
        size="small"
        startIcon={<AddIcon style={{ fontSize: 14 }} />}
        onClick={handleAddAttr}
        style={{ alignSelf: "flex-start", fontSize: 12 }}
      >
        Add Attribute Key-Value
      </Button>
    </Box>
  );
}
