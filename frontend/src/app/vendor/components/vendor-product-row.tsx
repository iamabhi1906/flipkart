"use client";

import React from "react";
import Image from "next/image";
import {
  TableRow,
  TableCell,
  Box,
  Typography,
  Chip,
  Button,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ProductData } from "@/services/product.service";
import styles from "../vendor.module.css";

interface VendorProductRowProps {
  prod: ProductData;
  onQuickStockChange: (prod: ProductData, delta: number) => void;
  onQuickStatusChange: (prod: ProductData, status: "active" | "draft") => void;
  onPreview: (prod: ProductData) => void;
  onEdit: (prod: ProductData) => void;
  onPromptDelete: (id: string, prod: ProductData) => void;
}

export default function VendorProductRow({
  prod,
  onQuickStockChange,
  onQuickStatusChange,
  onPreview,
  onEdit,
  onPromptDelete,
}: VendorProductRowProps) {
  const primaryImg =
    prod.images && prod.images.length > 0
      ? prod.images[0].imageUrl || prod.images[0]
      : prod.imageUrls && prod.imageUrls.length > 0
      ? prod.imageUrls[0]
      : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200";

  const categoryName = prod.category?.name || "General";
  const stock = Number(prod.stockQuantity || 0);

  let discountPercent = 0;
  if (
    prod.compareAtPrice &&
    Number(prod.compareAtPrice) > Number(prod.price)
  ) {
    discountPercent = Math.round(
      ((Number(prod.compareAtPrice) - Number(prod.price)) /
        Number(prod.compareAtPrice)) *
        100,
    );
  }

  return (
    <TableRow hover>
      <TableCell className={styles.tableBodyCell}>
        <Box className={styles.productCell}>
          <Image
            src={primaryImg}
            alt={prod.name}
            width={56}
            height={56}
            className={styles.productThumb}
            unoptimized
          />
          <Box>
            <Typography className={styles.productNameText}>{prod.name}</Typography>
            <Typography className={styles.productSkuText}>
              SKU: {prod.sku || "N/A"}
            </Typography>
          </Box>
        </Box>
      </TableCell>

      <TableCell className={styles.tableBodyCell}>
        <Chip label={categoryName} size="small" className={styles.categoryChip} />
      </TableCell>

      <TableCell className={styles.tableBodyCell}>
        <Box className={styles.priceCell}>
          <Box>
            <Typography component="span" className={styles.priceText}>
              ₹{Number(prod.price).toLocaleString("en-IN")}
            </Typography>
            {prod.compareAtPrice &&
              Number(prod.compareAtPrice) > Number(prod.price) && (
                <Typography component="span" className={styles.comparePriceText}>
                  ₹{Number(prod.compareAtPrice).toLocaleString("en-IN")}
                </Typography>
              )}
          </Box>
          {discountPercent > 0 && (
            <Chip
              label={`${discountPercent}% OFF`}
              size="small"
              className={styles.discountChip}
            />
          )}
        </Box>
      </TableCell>

      <TableCell className={styles.tableBodyCell}>
        <Box className={styles.stockControlCell}>
          <Chip
            label={
              stock === 0
                ? "Out of Stock"
                : stock <= 5
                ? `Low (${stock})`
                : `${stock} Units`
            }
            size="small"
            className={
              stock === 0
                ? styles.stockChipOut
                : stock <= 5
                ? styles.stockChipLow
                : styles.stockChipInStock
            }
          />
          <Box className={styles.stockAdjustGroup}>
            <Button
              className={styles.stockBtn}
              onClick={() => onQuickStockChange(prod, -1)}
            >
              -
            </Button>
            <Typography className={styles.stockValueText}>{stock}</Typography>
            <Button
              className={styles.stockBtn}
              onClick={() => onQuickStockChange(prod, 1)}
            >
              +
            </Button>
          </Box>
        </Box>
      </TableCell>

      <TableCell className={styles.tableBodyCell}>
        <Select
          size="small"
          value={prod.status || "active"}
          onChange={(e) =>
            onQuickStatusChange(prod, e.target.value as "active" | "draft")
          }
          className={`${styles.statusSelect} ${
            prod.status === "active" ? styles.statusActive : styles.statusDraft
          }`}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="draft">Draft</MenuItem>
        </Select>
      </TableCell>

      <TableCell className={styles.tableBodyCell}>
        <Box className={styles.actionBtnGroup}>
          <IconButton
            size="small"
            onClick={() => onPreview(prod)}
            className={styles.viewIconBtn}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onEdit(prod)}
            className={styles.editIconBtn}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => prod.id && onPromptDelete(prod.id, prod)}
            className={styles.deleteIconBtn}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}
