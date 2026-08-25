"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import { submitProductReview, ReviewData } from "@/services/review.service";

const RATING_LABELS: Record<number, string> = {
  1: "Very Poor",
  2: "Poor",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

interface ReviewModalProps {
  open: boolean;
  orderItemId: string;
  productId: string;
  productName: string;
  existingReview?: ReviewData | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReviewModal({
  open,
  orderItemId,
  productId,
  productName,
  existingReview,
  onClose,
  onSuccess,
}: ReviewModalProps) {
  const [rating, setRating] = useState<number | null>(5);
  const [hover, setHover] = useState(-1);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating || 5);
      setTitle(existingReview.title || "");
      setComment(existingReview.comment || "");
    } else {
      setRating(5);
      setTitle("");
      setComment("");
    }
    setError(null);
  }, [existingReview, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || rating < 1) {
      setError("Please select a star rating");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await submitProductReview({
        orderItemId,
        productId,
        rating,
        title,
        comment,
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to submit review",
      );
    } finally {
      setLoading(false);
    }
  };

  const activeLabel =
    hover !== -1 ? RATING_LABELS[hover] : RATING_LABELS[rating || 0];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
          fontWeight: 700,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {existingReview ? "Edit Product Review" : "Rate & Review Product"}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{ display: "block" }}
          >
            {productName}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {error && <Alert severity="error">{error}</Alert>}

          <Box sx={{ textAlign: "center", py: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
              Select Overall Rating
            </Typography>
            <Rating
              name="product-rating"
              value={rating}
              precision={1}
              size="large"
              icon={<StarIcon fontSize="inherit" sx={{ color: "#faaf00" }} />}
              emptyIcon={<StarIcon fontSize="inherit" sx={{ opacity: 0.45 }} />}
              onChange={(_, newValue) => setRating(newValue)}
              onChangeActive={(_, newHover) => setHover(newHover)}
            />
            {activeLabel && (
              <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5 }}>
                {activeLabel}
              </Typography>
            )}
          </Box>

          <TextField
            label="Review Title / Headline (Optional)"
            placeholder="e.g. Outstanding quality & fast delivery!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            size="small"
          />

          <TextField
            label="Detailed Review (Optional)"
            placeholder="Tell us what you liked or disliked about this product after receiving it..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            rows={4}
            size="small"
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} disabled={loading} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: "#2874f0",
              fontWeight: 700,
              textTransform: "none",
              px: 3,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : existingReview ? (
              "Update Review"
            ) : (
              "Submit Review"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
