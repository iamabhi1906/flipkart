"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography, Chip, Button, Paper, Divider } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import OrderStepper from "./stepper";
import styles from "./customer-orders.module.css";
import { ReviewData } from "@/services/review.service";

const STATUS_COLORS: Record<
  string,
  "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
> = {
  pending: "warning",
  confirmed: "info",
  processing: "primary",
  shipped: "secondary",
  delivered: "success",
  cancelled: "error",
  partially_cancelled: "error",
};

interface CustomerOrderCardProps {
  order: any;
  cancellingId: string | null;
  reviewsMap: Record<string, ReviewData>;
  onCancelOrder: (orderId: string) => void;
  onOpenReviewModal: (item: any, orderStatus: string) => void;
}

export default function CustomerOrderCard({
  order,
  cancellingId,
  reviewsMap,
  onCancelOrder,
  onOpenReviewModal,
}: CustomerOrderCardProps) {
  const canCancel = ["pending", "confirmed", "processing"].includes(order.status);
  const isCancelling = cancellingId === order.id;

  return (
    <Paper elevation={0} className={styles.orderCard}>
      <Box className={styles.cardHeader}>
        <Box>
          <Typography
            variant="subtitle1"
            style={{ fontWeight: 800, color: "#0f172a" }}
          >
            Order #{order.orderNumber}
          </Typography>
          <Typography variant="caption" style={{ color: "#64748b" }}>
            Placed on:{" "}
            {new Date(order.createdAt || order.placedAt).toLocaleDateString()}
          </Typography>
        </Box>
        <Box style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Chip
            label={(order.status || "pending").toUpperCase()}
            color={STATUS_COLORS[order.status] || "default"}
            size="small"
            style={{ fontWeight: 700 }}
          />
          <Typography
            variant="h6"
            style={{ fontWeight: 800, color: "#2874f0" }}
          >
            ₹{Number(order.totalAmount).toLocaleString("en-IN")}
          </Typography>
        </Box>
      </Box>

      <Divider style={{ margin: "12px 0" }} />

      <OrderStepper order={order} />

      <Box style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {order.items?.map((item: any) => {
          const imgUrl =
            item.product?.images?.[0]?.imageUrl ||
            item.product?.images?.[0] ||
            "/placeholder.png";
          const isDelivered =
            item.status === "delivered" || order.status === "delivered";
          const existingReview = reviewsMap[item.id];

          return (
            <Box
              key={item.id}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Image
                src={imgUrl}
                alt={item.productName}
                width={50}
                height={50}
                style={{ borderRadius: 6, objectFit: "cover" }}
                unoptimized
              />
              <Box style={{ flex: 1, minWidth: "200px" }}>
                <Typography variant="body2" style={{ fontWeight: 700 }}>
                  {item.productName}
                </Typography>
                <Typography variant="caption" style={{ color: "#64748b" }}>
                  Qty: {item.quantity} | Unit: ₹
                  {Number(item.unitPrice).toLocaleString("en-IN")}
                </Typography>
              </Box>

              <Chip
                label={(item.status || "confirmed").toUpperCase()}
                variant="outlined"
                size="small"
                style={{ fontSize: 11 }}
              />

              {isDelivered && (
                <Box sx={{ ml: "auto" }}>
                  {existingReview ? (
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      startIcon={<StarIcon sx={{ color: "#faaf00" }} />}
                      onClick={() => onOpenReviewModal(item, order.status)}
                      sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "6px",
                      }}
                    >
                      ★ {existingReview.rating} Rated (Edit)
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<StarIcon />}
                      onClick={() => onOpenReviewModal(item, order.status)}
                      sx={{
                        backgroundColor: "#388e3c",
                        "&:hover": { backgroundColor: "#2e7d32" },
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "6px",
                      }}
                    >
                      Rate & Review
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {canCancel && (
        <>
          <Divider style={{ margin: "12px 0" }} />
          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              disabled={isCancelling}
              onClick={() => onCancelOrder(order.id)}
            >
              {isCancelling ? "CANCELLING..." : "CANCEL ORDER"}
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
}
