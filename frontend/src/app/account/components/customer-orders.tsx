"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Divider,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StarIcon from "@mui/icons-material/Star";
import { getMyOrders, cancelCustomerOrder } from "@/services/order.service";
import { getOrderItemReview, ReviewData } from "@/services/review.service";
import ReviewModal from "@/components/review-modal";
import OrderStepper from "./stepper";

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

const deliveryStatus = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "partially_cancelled",
  "completed",
];

export default function CustomerOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReviewItem, setSelectedReviewItem] = useState<{
    orderItemId: string;
    productId: string;
    productName: string;
    existingReview?: ReviewData | null;
  } | null>(null);
  const [reviewsMap, setReviewsMap] = useState<Record<string, ReviewData>>({});

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setFeedback(null);
    try {
      const data = await getMyOrders();
      const loadedOrders = Array.isArray(data) ? data : [];
      setOrders(loadedOrders);

      // Fetch reviews for delivered items
      const map: Record<string, ReviewData> = {};
      for (const order of loadedOrders) {
        if (order.items) {
          for (const item of order.items) {
            const isDelivered =
              item.status === "delivered" || order.status === "delivered";
            if (isDelivered && item.id) {
              const review = await getOrderItemReview(item.id);
              if (review && review.id) {
                map[item.id] = review;
              }
            }
          }
        }
      }
      setReviewsMap(map);
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: err.message || "Failed to fetch order history",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    setCancellingId(orderId);
    setFeedback(null);
    try {
      await cancelCustomerOrder(orderId);
      setFeedback({ type: "success", msg: "Order cancelled successfully" });
      await fetchOrders();
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: err.message || "Failed to cancel order",
      });
    } finally {
      setCancellingId(null);
    }
  };

  const handleOpenReviewModal = (item: any, orderStatus: string) => {
    const existingReview = reviewsMap[item.id] || null;
    setSelectedReviewItem({
      orderItemId: item.id,
      productId: item.productId,
      productName: item.productName,
      existingReview,
    });
    setReviewModalOpen(true);
  };

  const handleReviewSuccess = () => {
    setFeedback({
      type: "success",
      msg: "Thank you! Your rating & review has been submitted.",
    });
    fetchOrders();
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <ShoppingBagIcon style={{ color: "#2874f0" }} />
        <Typography
          variant="h6"
          style={{ fontWeight: 700 }}
          color="textPrimary"
        >
          My Order History ({orders.length})
        </Typography>
      </Box>

      {feedback && <Alert severity={feedback.type}>{feedback.msg}</Alert>}

      {loading ? (
        <Box style={{ display: "flex", justifyContent: "center", padding: 48 }}>
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Alert severity="info">You haven&apos;t placed any orders yet.</Alert>
      ) : (
        orders.map((order) => {
          const canCancel = ["pending", "confirmed", "processing"].includes(
            order.status,
          );
          const isCancelling = cancellingId === order.id;

          return (
            <Paper key={order.id} elevation={0}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: 800, color: "#0f172a" }}
                  >
                    Order #{order.orderNumber}
                  </Typography>
                  <Typography variant="caption" style={{ color: "#64748b" }}>
                    Placed on:{" "}
                    {new Date(
                      order.createdAt || order.placedAt,
                    ).toLocaleDateString()}
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

              <Box
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
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
                        <Typography
                          variant="caption"
                          style={{ color: "#64748b" }}
                        >
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

                      {/* Rating and Review action for delivered items */}
                      {isDelivered && (
                        <Box sx={{ ml: "auto" }}>
                          {existingReview ? (
                            <Button
                              variant="outlined"
                              color="success"
                              size="small"
                              startIcon={<StarIcon sx={{ color: "#faaf00" }} />}
                              onClick={() =>
                                handleOpenReviewModal(item, order.status)
                              }
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
                              onClick={() =>
                                handleOpenReviewModal(item, order.status)
                              }
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
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      {isCancelling ? "CANCELLING..." : "CANCEL ORDER"}
                    </Button>
                  </Box>
                </>
              )}
            </Paper>
          );
        })
      )}

      {selectedReviewItem && (
        <ReviewModal
          open={reviewModalOpen}
          orderItemId={selectedReviewItem.orderItemId}
          productId={selectedReviewItem.productId}
          productName={selectedReviewItem.productName}
          existingReview={selectedReviewItem.existingReview}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedReviewItem(null);
          }}
          onSuccess={handleReviewSuccess}
        />
      )}
    </Box>
  );
}
