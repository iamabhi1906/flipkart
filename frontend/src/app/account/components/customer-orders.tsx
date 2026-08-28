"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { getMyOrders, cancelCustomerOrder } from "@/services/order.service";
import { getOrderItemReview, ReviewData } from "@/services/review.service";
import ReviewModal from "@/components/review-modal";
import CustomerOrderCard from "./customer-order-card";
import styles from "./customer-orders.module.css";

export default function CustomerOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

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
    <Box className={styles.container}>
      <Box className={styles.header}>
        <ShoppingBagIcon className={styles.headerIcon} />
        <Typography
          variant="h6"
          className={styles.headerTitle}
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
        orders.map((order) => (
          <CustomerOrderCard
            key={order.id}
            order={order}
            cancellingId={cancellingId}
            reviewsMap={reviewsMap}
            onCancelOrder={handleCancelOrder}
            onOpenReviewModal={handleOpenReviewModal}
          />
        ))
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
