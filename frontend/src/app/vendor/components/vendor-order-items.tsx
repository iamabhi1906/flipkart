"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Tooltip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LockIcon from "@mui/icons-material/Lock";
import SendIcon from "@mui/icons-material/Send";
import {
  getVendorOrderItems,
  updateVendorOrderItemStatus,
  resendVendorDeliveryOtp,
} from "@/services/order.service";

const STATUS_COLORS: Record<
  string,
  "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
> = {
  pending: "warning",
  confirmed: "info",
  processing: "primary",
  shipped: "secondary",
  out_for_delivery: "secondary",
  delivered: "success",
  cancelled: "error",
};

export default function VendorOrderItems() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // OTP Dialog state for Delivery verification
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [selectedItemForDelivery, setSelectedItemForDelivery] = useState<any | null>(null);
  const [deliveryOtp, setDeliveryOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [submittingOtp, setSubmittingOtp] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await getVendorOrderItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to load order items");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleStatusChange = async (item: any, newStatus: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    // If changing to 'delivered', require OTP entry via dialog
    if (newStatus === "delivered") {
      setSelectedItemForDelivery(item);
      setDeliveryOtp("");
      setOtpError(null);
      setOtpDialogOpen(true);
      return;
    }

    setUpdatingId(item.id);
    try {
      await updateVendorOrderItemStatus(item.id, newStatus);
      if (newStatus === "out_for_delivery") {
        setSuccessMsg(`Status updated to Out For Delivery. OTP email sent to customer!`);
      } else {
        setSuccessMsg(`Item status updated to ${newStatus.toUpperCase()}`);
      }
      await fetchItems();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update item status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleResendOtp = async (itemId: string) => {
    setResendingId(itemId);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      await resendVendorDeliveryOtp(itemId);
      setSuccessMsg("Delivery OTP resent to customer via email successfully!");
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to resend OTP";
      if (otpDialogOpen) {
        setOtpError(msg);
      } else {
        setErrorMsg(msg);
      }
    } finally {
      setResendingId(null);
    }
  };

  const handleConfirmDeliveryWithOtp = async () => {
    if (!selectedItemForDelivery) return;
    if (!deliveryOtp.trim()) {
      setOtpError("Please enter the 6-digit OTP provided by customer");
      return;
    }

    setSubmittingOtp(true);
    setOtpError(null);
    try {
      await updateVendorOrderItemStatus(
        selectedItemForDelivery.id,
        "delivered",
        deliveryOtp.trim(),
      );
      setSuccessMsg("Delivery OTP verified successfully! Order item marked as DELIVERED.");
      setOtpDialogOpen(false);
      setSelectedItemForDelivery(null);
      setDeliveryOtp("");
      await fetchItems();
    } catch (err: any) {
      setOtpError(err.response?.data?.message || err.message || "Invalid delivery OTP");
    } finally {
      setSubmittingOtp(false);
    }
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LocalShippingIcon style={{ color: "#2874f0" }} />
          <Typography
            variant="h6"
            style={{ fontWeight: 700 }}
            color="textPrimary"
          >
            Vendor Order Fulfillment Hub ({items.length} items)
          </Typography>
        </Box>
        <IconButton onClick={fetchItems} color="primary">
          <RefreshIcon />
        </IconButton>
      </Box>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {successMsg && <Alert severity="success">{successMsg}</Alert>}

      {loading ? (
        <Box style={{ display: "flex", justifyContent: "center", padding: 48 }}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Alert severity="info">No orders assigned to your store yet.</Alert>
      ) : (
        <TableContainer
          component={Paper}
          style={{ borderRadius: 8, border: "1px solid #e2e8f0" }}
        >
          <Table size="small">
            <TableHead style={{ backgroundColor: "#f8fafc" }}>
              <TableRow>
                <TableCell style={{ fontWeight: 700 }}>Order #</TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  Product / Variant
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>Qty</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Unit Price</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell style={{ fontWeight: 700 }}>
                  Shipping Dest.
                </TableCell>
                <TableCell style={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const orderNum =
                  item.order?.orderNumber || item.orderId?.slice(0, 8);
                const isUpdating = updatingId === item.id;
                const isResending = resendingId === item.id;

                return (
                  <TableRow key={item.id} hover>
                    <TableCell style={{ fontWeight: 700, color: "#2874f0" }}>
                      {orderNum}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" style={{ fontWeight: 700 }}>
                        {item.productName}
                      </Typography>
                      {item.sku && (
                        <Typography
                          variant="caption"
                          style={{ color: "#64748b" }}
                        >
                          SKU: {item.sku}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell style={{ fontWeight: 700 }}>
                      {item.quantity}
                    </TableCell>
                    <TableCell>
                      ₹{Number(item.unitPrice).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell style={{ fontWeight: 800 }}>
                      ₹{Number(item.totalAmount).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      {item.order ? (
                        <Typography
                          variant="caption"
                          style={{ color: "#475569" }}
                        >
                          {item.order.shippingCity}, {item.order.shippingState}{" "}
                          ({item.order.shippingPostalCode})
                        </Typography>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={(item.status || "pending").replace(/_/g, " ").toUpperCase()}
                        color={STATUS_COLORS[item.status] || "default"}
                        size="small"
                        style={{ fontWeight: 700 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Select
                          size="small"
                          value={item.status || "pending"}
                          onChange={(e) =>
                            handleStatusChange(item, e.target.value)
                          }
                          disabled={isUpdating || item.status === "cancelled"}
                          style={{ fontSize: 13, height: 32 }}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="confirmed">Confirmed</MenuItem>
                          <MenuItem value="processing">Processing</MenuItem>
                          <MenuItem value="shipped">Shipped</MenuItem>
                          <MenuItem value="out_for_delivery">Out for Delivery</MenuItem>
                          <MenuItem value="delivered">Delivered</MenuItem>
                          <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>

                        {item.status === "out_for_delivery" && (
                          <Tooltip title="Resend Delivery OTP to customer">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleResendOtp(item.id)}
                              disabled={isResending}
                            >
                              {isResending ? (
                                <CircularProgress size={16} />
                              ) : (
                                <SendIcon style={{ fontSize: 18 }} />
                              )}
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delivery OTP Dialog */}
      <Dialog
        open={otpDialogOpen}
        onClose={() => !submittingOtp && setOtpDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
          <LockIcon style={{ color: "#2874f0" }} />
          Verify Delivery OTP
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontSize: 14, marginBottom: 16 }}>
            Enter the 6-digit OTP received by the customer for item:{" "}
            <strong>{selectedItemForDelivery?.productName}</strong>
          </DialogContentText>

          {otpError && (
            <Alert severity="error" style={{ marginBottom: 16 }}>
              {otpError}
            </Alert>
          )}

          <TextField
            autoFocus
            label="Customer Delivery OTP"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            value={deliveryOtp}
            onChange={(e) => setDeliveryOtp(e.target.value)}
            slotProps={{ htmlInput: { maxLength: 6, style: { textAlign: "center", fontSize: 20, letterSpacing: 4, fontWeight: 700 } } }}
          />

          {selectedItemForDelivery && (
            <Box style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
              <Button
                size="small"
                startIcon={<SendIcon style={{ fontSize: 14 }} />}
                onClick={() => handleResendOtp(selectedItemForDelivery.id)}
                disabled={resendingId === selectedItemForDelivery.id}
                style={{ textTransform: "none", fontSize: 13 }}
              >
                {resendingId === selectedItemForDelivery.id ? "Resending..." : "Resend OTP to Customer"}
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions style={{ padding: "16px 24px" }}>
          <Button
            onClick={() => setOtpDialogOpen(false)}
            disabled={submittingOtp}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDeliveryWithOtp}
            variant="contained"
            disabled={submittingOtp || !deliveryOtp.trim()}
            style={{ backgroundColor: "#2874f0" }}
          >
            {submittingOtp ? <CircularProgress size={20} color="inherit" /> : "Verify & Complete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
