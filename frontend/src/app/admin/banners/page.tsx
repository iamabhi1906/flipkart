"use client";

import React from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import PrimarySearchAppBar from "@/components/appbar";
import AdminBannerHeader from "./components/admin-banner-header";
import AdminBannerTable from "./components/admin-banner-table";
import AdminBannerModal from "./components/admin-banner-modal";
import { useAdminBanners } from "./hooks/use-admin-banners";
import styles from "./admin-banner.module.css";

export default function AdminBannersPage() {
  const {
    banners,
    loading,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    editingBanner,
    submitting,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSaveBanner,
    handleToggleStatus,
    handleDeleteBanner,
  } = useAdminBanners();

  return (
    <Box className={styles.adminContainer}>
      <PrimarySearchAppBar />

      <Box className={styles.adminMain}>
        <Button href="/admin/vendors">Vendors management</Button>
        <AdminBannerHeader
          bannerCount={banners.length}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={handleOpenCreateModal}
        />

        {loading ? (
          <Box style={{ textAlign: "center", padding: 48 }}>
            <CircularProgress />
          </Box>
        ) : (
          <AdminBannerTable
            banners={banners}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteBanner}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </Box>

      <AdminBannerModal
        open={isModalOpen}
        editingBanner={editingBanner}
        submitting={submitting}
        onClose={handleCloseModal}
        onSave={handleSaveBanner}
      />
    </Box>
  );
}
