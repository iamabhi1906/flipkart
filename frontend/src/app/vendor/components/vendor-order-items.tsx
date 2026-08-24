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
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
  getVendorOrderItems,
  updateVendorOrderItemStatus,
} from "@/services/order.service";
import styles from "../vendor.module.css";

const STATUS_COLORS: Record<string, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
  pending: "warning",
  confirmed: "info",
  processing: "primary",
  shipped: "secondary",
  delivered: "success",
  cancelled: "error",
};

export default function VendorOrderItems() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  const handleStatusChange = async (itemId: string, newStatus: string) => {
    setUpdatingId(itemId);
    try {
      await updateVendorOrderItemStatus(itemId, newStatus);
      await fetchItems();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update item status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LocalShippingIcon style={{ color: "#2874f0" }} />
          <Typography variant="h6" style={{ fontWeight: 700 }}>
            Vendor Order Fulfillment Hub ({items.length} items)
          </Typography>
        </Box>
        <IconButton onClick={fetchItems} color="primary">
          <RefreshIcon />
        </IconButton>
      </Box>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      {loading ? (
        <Box style={{ display: "flex", justifyContent: "center", padding: 48 }}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Alert severity="info">No orders assigned to your store yet.</Alert>
      ) : (
        <TableContainer component={Paper} style={{ borderRadius: 8, border: "1px solid #e2e8f0" }}>
          <Table size="small">
            <TableHead style={{ backgroundColor: "#f8fafc" }}>
              <TableRow>
                <TableCell style={{ fontWeight: 700 }}>Order #</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Product / Variant</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Qty</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Unit Price</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Total</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Shipping Dest.</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell style={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const orderNum = item.order?.orderNumber || item.orderId?.slice(0, 8);
                const isUpdating = updatingId === item.id;

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
                        <Typography variant="caption" style={{ color: "#64748b" }}>
                          SKU: {item.sku}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell style={{ fontWeight: 700 }}>{item.quantity}</TableCell>
                    <TableCell>₹{Number(item.unitPrice).toLocaleString("en-IN")}</TableCell>
                    <TableCell style={{ fontWeight: 800 }}>
                      ₹{Number(item.totalAmount).toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      {item.order ? (
                        <Typography variant="caption" style={{ color: "#475569" }}>
                          {item.order.shippingCity}, {item.order.shippingState} ({item.order.shippingPostalCode})
                        </Typography>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={(item.status || "pending").toUpperCase()}
                        color={STATUS_COLORS[item.status] || "default"}
                        size="small"
                        style={{ fontWeight: 700 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        size="small"
                        value={item.status || "pending"}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        disabled={isUpdating || item.status === "cancelled"}
                        style={{ fontSize: 13, height: 32 }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="confirmed">Confirmed</MenuItem>
                        <MenuItem value="processing">Processing</MenuItem>
                        <MenuItem value="shipped">Shipped</MenuItem>
                        <MenuItem value="delivered">Delivered</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
