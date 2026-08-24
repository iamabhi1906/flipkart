"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Alert,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import AddIcon from "@mui/icons-material/Add";
import { processCheckout } from "@/services/order.service";
import { getAddresses, createAddress, AddressData } from "@/services/address.service";
import { useCart } from "@/context/cart-context";
import styles from "./cart.module.css";

interface CheckoutModalProps { open: boolean; onClose: () => void; }

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { cart, refreshCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [savedAddresses, setSavedAddresses] = useState<AddressData[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isAddNew, setIsAddNew] = useState(false);
  const [newAddr, setNewAddr] = useState({ fullName: "", mobileNumber: "", addressLine1: "", city: "", state: "", country: "India", postalCode: "" });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod" | "upi" | "net_banking">("card");

  const loadAddresses = useCallback(async () => {
    try {
      const data = await getAddresses();
      const list: AddressData[] = Array.isArray(data) ? data : data?.items || [];
      setSavedAddresses(list);
      if (list.length > 0) {
        const defaultAddr = list.find((a) => a.isDefault) || list[0];
        if (defaultAddr?.id) { setSelectedAddressId(defaultAddr.id); setIsAddNew(false); }
      } else { setIsAddNew(true); }
    } catch { setIsAddNew(true); }
  }, []);

  useEffect(() => { if (open) loadAddresses(); }, [open, loadAddresses]);

  const subtotal = cart?.totalAmount || 0;
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal > 1000 ? 0 : 99;
  const total = subtotal + tax + shipping;

  const handlePlaceOrder = async () => {
    setSubmitting(true); setErrorMsg(null);
    try {
      let payload: any = { paymentMethod };
      if (isAddNew || savedAddresses.length === 0) {
        if (!newAddr.fullName || !newAddr.mobileNumber || !newAddr.addressLine1 || !newAddr.city || !newAddr.state || !newAddr.postalCode) {
          throw new Error("Please complete all required shipping address fields");
        }
        await createAddress(newAddr as any);
        payload.shippingAddress = newAddr;
      } else {
        if (!selectedAddressId) throw new Error("Please select a shipping address");
        payload.addressId = selectedAddressId;
      }
      const order = await processCheckout(payload);
      setConfirmedOrder(order); await refreshCart();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Failed to process order";
      setErrorMsg(Array.isArray(msg) ? msg[0] : msg);
    } finally { setSubmitting(false); }
  };

  const handleClose = () => { setConfirmedOrder(null); setErrorMsg(null); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" slotProps={{ paper: { className: styles.drawerPaper } }}>
      <DialogTitle className={styles.headerBar}>
        <Box style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
          <Typography className={styles.headerTitle}>Checkout & Order Summary</Typography>
          <IconButton onClick={handleClose} size="small" style={{ color: "#fff" }}><CloseIcon /></IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {confirmedOrder ? (
          <Box style={{ textAlign: "center", padding: "24px 0" }}>
            <CheckCircleIcon style={{ fontSize: 64, color: "#16a34a", marginBottom: 12 }} />
            <Typography variant="h5" style={{ fontWeight: 800 }}>Order Confirmed!</Typography>
            <Typography variant="body1" style={{ color: "#475569", marginTop: 4 }}>Order Number: <strong>{confirmedOrder.orderNumber}</strong></Typography>
            <Typography variant="body2" style={{ color: "#64748b", marginTop: 8 }}>Total Paid: ₹{Number(confirmedOrder.totalAmount || total).toLocaleString("en-IN")}</Typography>
          </Box>
        ) : (
          <Box style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <LocalShippingIcon style={{ color: "#2874f0" }} />
                <Typography variant="subtitle1" style={{ fontWeight: 700 }}>1. Shipping Address</Typography>
              </Box>
              {savedAddresses.length > 0 && (
                <Button size="small" startIcon={<AddIcon />} onClick={() => setIsAddNew(!isAddNew)}>{isAddNew ? "Use Saved Address" : "Add New Address"}</Button>
              )}
            </Box>

            {savedAddresses.length === 0 && <Alert severity="warning">No saved address found. Please enter a shipping address below.</Alert>}

            {!isAddNew && savedAddresses.length > 0 ? (
              <RadioGroup value={selectedAddressId} onChange={(e) => setSelectedAddressId(e.target.value)}>
                {savedAddresses.map((addr) => (
                  <Box key={addr.id} style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 12px", marginBottom: 8, backgroundColor: selectedAddressId === addr.id ? "#eff6ff" : "#fff" }}>
                    <FormControlLabel value={addr.id} control={<Radio size="small" />} label={
                      <Box>
                        <Typography variant="subtitle2" style={{ fontWeight: 700 }}>{addr.fullName} ({addr.mobileNumber}) {addr.isDefault && <Chip label="DEFAULT" color="primary" size="small" style={{ height: 18, fontSize: 10 }} />}</Typography>
                        <Typography variant="body2" style={{ color: "#475569" }}>{addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ""}, {addr.city}, {addr.state} - {addr.postalCode}</Typography>
                      </Box>
                    } />
                  </Box>
                ))}
              </RadioGroup>
            ) : (
              <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <TextField size="small" label="Full Name *" value={newAddr.fullName} onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })} />
                <TextField size="small" label="Mobile Phone *" value={newAddr.mobileNumber} onChange={(e) => setNewAddr({ ...newAddr, mobileNumber: e.target.value })} />
                <TextField size="small" label="Address Line 1 *" style={{ gridColumn: "span 2" }} value={newAddr.addressLine1} onChange={(e) => setNewAddr({ ...newAddr, addressLine1: e.target.value })} />
                <TextField size="small" label="City *" value={newAddr.city} onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })} />
                <TextField size="small" label="State *" value={newAddr.state} onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })} />
                <TextField size="small" label="Postal Code *" value={newAddr.postalCode} onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })} />
              </Box>
            )}

            <Divider />
            <Box style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <PaymentIcon style={{ color: "#2874f0" }} />
              <Typography variant="subtitle1" style={{ fontWeight: 700 }}>2. Payment Method (Mock Payment)</Typography>
            </Box>
            <Select size="small" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as any)}>
              <MenuItem value="card">Credit / Debit Card (Simulated)</MenuItem>
              <MenuItem value="upi">UPI / GPay / PhonePe</MenuItem>
              <MenuItem value="net_banking">Net Banking</MenuItem>
              <MenuItem value="cod">Cash on Delivery (COD)</MenuItem>
            </Select>

            <Divider />
            <Box style={{ backgroundColor: "#f8fafc", padding: 16, borderRadius: 8 }}>
              <Typography variant="subtitle2" style={{ fontWeight: 700, marginBottom: 8 }}>Price Breakdown</Typography>
              <Box className={styles.summaryRow}><Typography variant="body2">Subtotal ({cart?.totalItems} items):</Typography><Typography variant="body2">₹{subtotal.toLocaleString("en-IN")}</Typography></Box>
              <Box className={styles.summaryRow}><Typography variant="body2">Estimated Tax (18% GST):</Typography><Typography variant="body2">₹{tax.toLocaleString("en-IN")}</Typography></Box>
              <Box className={styles.summaryRow}><Typography variant="body2">Shipping Fee:</Typography><Typography variant="body2">{shipping === 0 ? "FREE" : `₹${shipping}`}</Typography></Box>
              <Divider style={{ margin: "8px 0" }} />
              <Box className={styles.summaryRow}><Typography variant="subtitle1" style={{ fontWeight: 800 }}>Total Payable:</Typography><Typography variant="h6" style={{ fontWeight: 800, color: "#2874f0" }}>₹{total.toLocaleString("en-IN")}</Typography></Box>
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions style={{ padding: 16 }}>
        {confirmedOrder ? (
          <Button variant="contained" color="primary" onClick={handleClose} fullWidth>DONE & BACK TO STORE</Button>
        ) : (
          <>
            <Button onClick={handleClose} color="inherit">CANCEL</Button>
            <Button variant="contained" className={styles.checkoutBtn} onClick={handlePlaceOrder} disabled={submitting || !cart?.items?.length}>{submitting ? "PLACING ORDER..." : `PLACE ORDER (₹${total})`}</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
