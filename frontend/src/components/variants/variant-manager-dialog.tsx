"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { ProductVariantData } from "./variant-types";
import styles from "./variant-manager-dialog.module.css";

interface VariantManagerDialogProps {
  open: boolean;
  onClose: () => void;
  onSaveVariant: (variant: Partial<ProductVariantData>) => void;
}

export default function VariantManagerDialog({
  open,
  onClose,
  onSaveVariant,
}: VariantManagerDialogProps) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("10");
  const [thumbnail, setThumbnail] = useState("");
  const [attributes, setAttributes] = useState<{ key: string; value: string }[]>([
    { key: "Color", value: "" },
  ]);

  const handleAddAttr = () => {
    setAttributes((prev) => [...prev, { key: "", value: "" }]);
  };

  const handleRemoveAttr = (index: number) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAttrChange = (index: number, field: "key" | "value", val: string) => {
    setAttributes((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: val } : item))
    );
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    const attrObj: Record<string, string> = {};
    attributes.forEach((attr) => {
      if (attr.key.trim() && attr.value.trim()) {
        attrObj[attr.key.trim()] = attr.value.trim();
      }
    });

    onSaveVariant({
      name: name.trim(),
      sku: sku.trim() || undefined,
      price: price ? parseFloat(price) : undefined,
      stockQuantity: parseInt(stockQuantity, 10) || 0,
      thumbnail: thumbnail.trim() || undefined,
      images: thumbnail.trim() ? [thumbnail.trim()] : [],
      attributes: attrObj,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ fontWeight: 700 }}>Add Product Variant</DialogTitle>
      <DialogContent>
        <Box className={styles.dialogContent}>
          <TextField
            label="Variant Title (e.g. Red / 8GB / 256GB)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            fullWidth
            required
          />
          <Box style={{ display: "flex", gap: 12 }}>
            <TextField
              label="SKU"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              size="small"
              fullWidth
            />
            <TextField
              label="Price (₹)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              size="small"
              fullWidth
            />
            <TextField
              label="Stock"
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              size="small"
              fullWidth
              required
            />
          </Box>
          <TextField
            label="Image / Thumbnail URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            size="small"
            fullWidth
          />

          <Typography variant="subtitle2" style={{ fontWeight: 700, marginTop: 8 }}>
            Dynamic Attributes (e.g. Size, Color, RAM, Storage):
          </Typography>

          {attributes.map((attr, idx) => (
            <Box key={idx} className={styles.attrRow}>
              <TextField
                label="Attribute Name"
                placeholder="e.g. RAM"
                value={attr.key}
                onChange={(e) => handleAttrChange(idx, "key", e.target.value)}
                size="small"
                fullWidth
              />
              <TextField
                label="Value"
                placeholder="e.g. 16GB"
                value={attr.value}
                onChange={(e) => handleAttrChange(idx, "value", e.target.value)}
                size="small"
                fullWidth
              />
              {attributes.length > 1 && (
                <IconButton onClick={() => handleRemoveAttr(idx)} color="error">
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}

          <Button
            startIcon={<AddIcon />}
            onClick={handleAddAttr}
            size="small"
            style={{ alignSelf: "flex-start" }}
          >
            Add Attribute Key-Value
          </Button>
        </Box>
      </DialogContent>
      <DialogActions style={{ padding: 16 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!name.trim()}>
          Save Variant
        </Button>
      </DialogActions>
    </Dialog>
  );
}
