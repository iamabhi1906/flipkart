"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Rating,
  LinearProgress,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VerifiedIcon from "@mui/icons-material/Verified";
import { getProductReviews, ReviewData, ProductReviewStats } from "@/services/review.service";

interface PdpReviewsProps {
  productId: string;
}

export default function PdpReviews({ productId }: PdpReviewsProps) {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [stats, setStats] = useState<ProductReviewStats>({
    totalReviews: 0,
    avgRating: 0,
    ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    getProductReviews(productId)
      .then((data) => {
        setReviews(data.reviews || []);
        setStats(
          data.stats || {
            totalReviews: 0,
            avgRating: 0,
            ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          },
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mt: 3,
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        backgroundColor: "#ffffff",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: "#0f172a" }}>
        Ratings & Customer Reviews
      </Typography>

      {/* Ratings Summary Header */}
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          alignItems: "center",
          backgroundColor: "#f8fafc",
          p: 2.5,
          borderRadius: "10px",
          mb: 3,
        }}
      >
        <Box sx={{ textAlign: "center", minWidth: "120px" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, color: "#0f172a", lineHeight: 1 }}
          >
            {stats.avgRating > 0 ? stats.avgRating : "N/A"}
          </Typography>

          {stats.avgRating > 0 && (
            <Rating
              value={stats.avgRating}
              precision={0.1}
              readOnly
              size="small"
              sx={{ my: 0.5 }}
            />
          )}

          <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>
            {stats.totalReviews} {stats.totalReviews === 1 ? "Review" : "Reviews"}
          </Typography>
        </Box>

        <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />

        {/* Rating Breakdown Bars */}
        <Box sx={{ flex: 1, minWidth: "220px" }}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.ratingCounts[star] || 0;
            const percentage =
              stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;

            return (
              <Box
                key={star}
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}
              >
                <Typography variant="caption" sx={{ fontWeight: 700, width: "24px" }}>
                  {star} ★
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    flex: 1,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#e2e8f0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor:
                        star >= 4 ? "#388e3c" : star === 3 ? "#ffa000" : "#d32f2f",
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ width: "32px", textAlign: "right" }}
                >
                  {count}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Review List */}
      {reviews.length === 0 ? (
        <Typography variant="body2" color="textSecondary" sx={{ py: 2 }}>
          No reviews yet for this product. Customers who purchase and receive this item can submit a rating & review!
        </Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {reviews.map((rev) => (
            <Box
              key={rev.id}
              sx={{
                p: 2,
                borderRadius: "8px",
                border: "1px solid #f1f5f9",
                backgroundColor: "#ffffff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    icon={<StarIcon sx={{ color: "#fff !important", fontSize: "14px !important" }} />}
                    label={rev.rating}
                    size="small"
                    sx={{
                      backgroundColor:
                        rev.rating >= 4 ? "#388e3c" : rev.rating === 3 ? "#ffa000" : "#d32f2f",
                      color: "#ffffff",
                      fontWeight: 800,
                      height: "24px",
                    }}
                  />
                  {rev.title && (
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {rev.title}
                    </Typography>
                  )}
                </Box>

                {rev.createdAt && (
                  <Typography variant="caption" color="textSecondary">
                    {new Date(rev.createdAt).toLocaleDateString()}
                  </Typography>
                )}
              </Box>

              {rev.comment && (
                <Typography variant="body2" sx={{ color: "#334155", mb: 1.5 }}>
                  {rev.comment}
                </Typography>
              )}

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  src={rev.user?.avatar}
                  sx={{ width: 22, height: 22, fontSize: "11px" }}
                >
                  {rev.user?.name?.[0] || "U"}
                </Avatar>
                <Typography variant="caption" sx={{ fontWeight: 600, color: "#64748b" }}>
                  {rev.user?.name || "Verified Customer"}
                </Typography>
                {rev.isVerifiedPurchase && (
                  <Chip
                    icon={<VerifiedIcon sx={{ fontSize: "12px !important" }} />}
                    label="Verified Purchase"
                    size="small"
                    variant="outlined"
                    color="success"
                    sx={{ fontSize: "10px", height: "20px" }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}
