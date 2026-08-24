"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";
import { ProductData } from "@/services/product.service";
import styles from "../vendor.module.css";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: ProductData | null;
}

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  product,
}: DeleteConfirmModalProps) {
  if (!product) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{ paper: { className: styles.deleteDialogPaper } }}
    >
      <DialogTitle className={styles.modalTitle}>
        <Box className={styles.modalHeaderBar}>
          <Typography className={styles.modalTitle}>
            Confirm Product Deletion
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box className={styles.deleteConfirmBody}>
          <WarningIcon className={styles.deleteConfirmIcon} />
          <Typography className={styles.deleteConfirmText}>
            Are you sure you want to delete "{product.name}"?
          </Typography>
          <Typography className={styles.deleteConfirmSub}>
            This action will permanently remove this item from your seller storefront catalog.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} className={styles.cancelBtn}>
          CANCEL
        </Button>
        <Button onClick={onConfirm} className={styles.confirmDeleteBtn}>
          YES, DELETE PRODUCT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
