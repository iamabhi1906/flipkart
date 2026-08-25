"use client";

import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import PrimarySearchAppBar from "@/components/appbar";
import AdminVendorHeader from "./components/admin-vendor-header";
import AdminVendorTable from "./components/admin-vendor-table";
import AdminVendorModal from "./components/admin-vendor-modal";
import { useAdminVendors } from "./hooks/use-admin-vendors";
import styles from "./admin-vendor.module.css";

export default function AdminVendorsPage() {
  const {
    vendors,
    loading,
    searchTerm,
    setSearchTerm,
    selectedVendor,
    setSelectedVendor,
    handleStatusChange,
  } = useAdminVendors();

  return (
    <Box className={styles.adminContainer}>
      <PrimarySearchAppBar />

      <Box className={styles.adminMain}>
        <Button href="/admin/banners">Banner management</Button>

        <AdminVendorHeader
          vendors={vendors}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <Box style={{ textAlign: "center", padding: 48 }}>
            <CircularProgress />
          </Box>
        ) : (
          <AdminVendorTable
            vendors={vendors}
            onSelectVendor={setSelectedVendor}
            onStatusChange={handleStatusChange}
          />
        )}
      </Box>

      <AdminVendorModal
        vendor={selectedVendor}
        onClose={() => setSelectedVendor(null)}
      />
    </Box>
  );
}
