"use client";

import React from "react";
import { Modal, Box, Typography, Button, Divider } from "@mui/material";
import { VendorData } from "@/services/vendor.service";
import styles from "../admin-vendor.module.css";

interface AdminVendorModalProps {
  vendor: VendorData | null;
  onClose: () => void;
}

export default function AdminVendorModal({
  vendor,
  onClose,
}: AdminVendorModalProps) {
  if (!vendor) return null;

  return (
    <Modal open={Boolean(vendor)} onClose={onClose}>
      <Box className={styles.modalContent}>
        <Typography variant="h6" style={{ fontWeight: 800, marginBottom: 16 }}>
          Vendor Details: {vendor.businessName}
        </Typography>
        <Divider style={{ marginBottom: 16 }} />

        <Box style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Typography>
            <strong>Business Name:</strong> {vendor.businessName}
          </Typography>
          <Typography>
            <strong>Account Email:</strong> {vendor.user?.email || "N/A"}
          </Typography>
          <Typography>
            <strong>Business Email:</strong> {vendor.businessEmail || "N/A"}
          </Typography>
          <Typography>
            <strong>Contact Phone:</strong> {vendor.businessPhone || "N/A"}
          </Typography>
          <Typography>
            <strong>GST / Tax Number:</strong> {vendor.taxNumber || "N/A"}
          </Typography>
          <Typography>
            <strong>Registration Number:</strong> {vendor.registrationNumber || "N/A"}
          </Typography>
          <Typography>
            <strong>Description:</strong> {vendor.businessDescription || "N/A"}
          </Typography>
          <Typography>
            <strong>Account Status:</strong>{" "}
            <span style={{ textTransform: "capitalize", fontWeight: 700 }}>
              {vendor.user?.status || "active"}
            </span>
          </Typography>
        </Box>

        <Box style={{ marginTop: 24, textAlign: "right" }}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
