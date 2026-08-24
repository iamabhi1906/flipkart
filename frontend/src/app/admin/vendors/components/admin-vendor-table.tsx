"use client";

import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { VendorData } from "@/services/vendor.service";
import styles from "../admin-vendor.module.css";

interface AdminVendorTableProps {
  vendors: VendorData[];
  onSelectVendor: (vendor: VendorData) => void;
  onStatusChange: (
    vendorId: string,
    status: "active" | "disabled" | "suspended",
  ) => void;
}

export default function AdminVendorTable({
  vendors,
  onSelectVendor,
  onStatusChange,
}: AdminVendorTableProps) {
  return (
    <TableContainer className={styles.tableCard}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableHeaderCell}>Business Name</TableCell>
            <TableCell className={styles.tableHeaderCell}>Account Email</TableCell>
            <TableCell className={styles.tableHeaderCell}>Phone / Contact</TableCell>
            <TableCell className={styles.tableHeaderCell}>Tax / GST No.</TableCell>
            <TableCell className={styles.tableHeaderCell}>Account Status</TableCell>
            <TableCell className={styles.tableHeaderCell} align="right">
              Admin Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" style={{ padding: 32 }}>
                No vendors found.
              </TableCell>
            </TableRow>
          ) : (
            vendors.map((vendor) => {
              const status = vendor.user?.status || "active";

              return (
                <TableRow key={vendor.id} hover>
                  <TableCell style={{ fontWeight: 700 }}>
                    {vendor.businessName}
                  </TableCell>
                  <TableCell>{vendor.user?.email || vendor.businessEmail || "N/A"}</TableCell>
                  <TableCell>{vendor.businessPhone || "N/A"}</TableCell>
                  <TableCell>{vendor.taxNumber || "N/A"}</TableCell>
                  <TableCell>
                    {status === "active" && (
                      <Chip label="Active" className={styles.activeChip} size="small" />
                    )}
                    {status === "suspended" && (
                      <Chip label="Suspended" className={styles.suspendedChip} size="small" />
                    )}
                    {status === "disabled" && (
                      <Chip label="Disabled" className={styles.disabledChip} size="small" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Box className={styles.actionBtnGroup} style={{ justifyContent: "flex-end" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => onSelectVendor(vendor)}
                      >
                        View
                      </Button>

                      {status !== "active" && (
                        <Button
                          size="small"
                          variant="outlined"
                          className={styles.activateBtn}
                          startIcon={<CheckCircleIcon />}
                          onClick={() => vendor.id && onStatusChange(vendor.id, "active")}
                        >
                          Activate
                        </Button>
                      )}

                      {status !== "suspended" && (
                        <Button
                          size="small"
                          variant="outlined"
                          className={styles.suspendBtn}
                          startIcon={<PauseCircleIcon />}
                          onClick={() => vendor.id && onStatusChange(vendor.id, "suspended")}
                        >
                          Suspend
                        </Button>
                      )}

                      {status !== "disabled" && (
                        <Button
                          size="small"
                          variant="outlined"
                          className={styles.disableBtn}
                          startIcon={<CancelIcon />}
                          onClick={() => vendor.id && onStatusChange(vendor.id, "disabled")}
                        >
                          Disable
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
