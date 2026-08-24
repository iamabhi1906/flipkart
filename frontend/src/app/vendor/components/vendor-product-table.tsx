"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import { ProductData } from "@/services/product.service";
import VendorProductRow from "./vendor-product-row";
import styles from "../vendor.module.css";

interface VendorProductTableProps {
  loading: boolean;
  products: ProductData[];
  onOpenAddForm: () => void;
  onQuickStockChange: (prod: ProductData, delta: number) => void;
  onQuickStatusChange: (prod: ProductData, status: "active" | "draft") => void;
  onPreview: (prod: ProductData) => void;
  onEdit: (prod: ProductData) => void;
  onPromptDelete: (id: string, prod: ProductData) => void;
}

export default function VendorProductTable({
  loading,
  products,
  onOpenAddForm,
  onQuickStockChange,
  onQuickStatusChange,
  onPreview,
  onEdit,
  onPromptDelete,
}: VendorProductTableProps) {
  if (loading) {
    return (
      <Box className={styles.emptyState}>
        <CircularProgress color="primary" />
        <Typography className={styles.emptySub}>Loading inventory...</Typography>
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box className={styles.emptyState}>
        <InventoryIcon className={styles.emptyIcon} />
        <Typography className={styles.emptyTitle}>No Products Found</Typography>
        <Typography className={styles.emptySub}>
          No items match your active search or inventory filter criteria.
        </Typography>
        <Button onClick={onOpenAddForm} className={styles.saveBtn}>
          + ADD PRODUCT
        </Button>
      </Box>
    );
  }

  return (
    <Box className={styles.tableWrapper}>
      <Table className={styles.productsTable}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableHeaderCell}>Product</TableCell>
            <TableCell className={styles.tableHeaderCell}>Category</TableCell>
            <TableCell className={styles.tableHeaderCell}>Price & MRP</TableCell>
            <TableCell className={styles.tableHeaderCell}>Stock Control</TableCell>
            <TableCell className={styles.tableHeaderCell}>Status</TableCell>
            <TableCell className={styles.tableHeaderCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((prod) => (
            <VendorProductRow
              key={prod.id}
              prod={prod}
              onQuickStockChange={onQuickStockChange}
              onQuickStatusChange={onQuickStatusChange}
              onPreview={onPreview}
              onEdit={onEdit}
              onPromptDelete={onPromptDelete}
            />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
