"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { BannerData } from "@/services/banner.service";
import styles from "../admin-banner.module.css";

interface ModalProps {
  open: boolean;
  editingBanner: BannerData | null;
  submitting: boolean;
  onClose: () => void;
  onSave: (data: Partial<BannerData>, file?: File | null) => void;
}

export default function AdminBannerModal({
  open,
  editingBanner,
  submitting,
  onClose,
  onSave,
}: ModalProps) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>("");

  useEffect(() => {
    if (editingBanner) {
      setTitle(editingBanner.title || "");
      setSubtitle(editingBanner.subtitle || "");
      setImageUrl(editingBanner.imageUrl || "");
      setLinkUrl(editingBanner.linkUrl || "");
      setSortOrder(editingBanner.sortOrder ?? 0);
      setIsActive(editingBanner.isActive ?? true);
    } else {
      setTitle("");
      setSubtitle("");
      setImageUrl("");
      setLinkUrl("");
      setSortOrder(0);
      setIsActive(true);
    }
    setSelectedFile(null);
    setFilePreviewUrl("");
  }, [editingBanner, open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFilePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !imageUrl) {
      alert("Please upload a banner image or enter an image URL.");
      return;
    }

    onSave(
      {
        title,
        subtitle,
        imageUrl,
        linkUrl,
        sortOrder: Number(sortOrder),
        isActive,
      },
      selectedFile,
    );
  };

  const displayPreview = filePreviewUrl || imageUrl;

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalPaper}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }} color="textPrimary">
            {editingBanner ? "Edit Hero Banner" : "Add New Hero Banner"}
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, mb: 1 }}
                color="textPrimary"
              >
                Banner Image File *
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ py: 1.5, borderRadius: "8px", textTransform: "none" }}
              >
                {selectedFile ? selectedFile.name : "Choose Banner Image File"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Or Image URL"
                placeholder="https://example.com/banner.jpg"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setSelectedFile(null);
                  setFilePreviewUrl("");
                }}
                size="small"
                helperText="Provide direct image URL if not uploading a file"
              />
            </Grid>

            {displayPreview && (
              <Grid size={{ xs: 12 }}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ display: "block" }}
                >
                  Live Banner Preview:
                </Typography>
                <img
                  src={displayPreview}
                  alt="Banner preview"
                  className={styles.imagePreview}
                />
              </Grid>
            )}

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Banner Title"
                placeholder="e.g. Big Billion Days Deals"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="small"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Sort Order"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                size="small"
                helperText="Lower numbers appear first"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Subtitle / Description"
                placeholder="e.g. Up to 80% OFF on Top Electronics"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                size="small"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Page Redirect Link (linkUrl)"
                placeholder="e.g. /products, /categories/electronics, or https://..."
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                size="small"
                helperText="Where users go when they click this banner slide"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    color="primary"
                  />
                }
                slotProps={{
                  typography: { color: "textPrimary" },
                }}
                label="Active (Visible in Hero Carousel)"
              />
            </Grid>

            <Grid
              size={{ xs: 12 }}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 1,
              }}
            >
              <Button
                variant="outlined"
                onClick={onClose}
                disabled={submitting}
                sx={{ borderRadius: "8px", textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{ borderRadius: "8px", textTransform: "none", px: 3 }}
              >
                {submitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : editingBanner ? (
                  "Update Banner"
                ) : (
                  "Create Banner"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}
