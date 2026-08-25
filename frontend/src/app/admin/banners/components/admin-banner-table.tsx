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
  IconButton,
  Tooltip,
  Typography,
  Switch,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { BannerData } from "@/services/banner.service";
import styles from "../admin-banner.module.css";

interface TableProps {
  banners: BannerData[];
  onEdit: (banner: BannerData) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (banner: BannerData) => void;
}

export default function AdminBannerTable({
  banners,
  onEdit,
  onDelete,
  onToggleStatus,
}: TableProps) {
  if (banners.length === 0) {
    return (
      <Box className={styles.tableCard} sx={{ p: 4, textAlign: "center" }}>
        <Typography color="textSecondary">
          No hero banners found. Click "Add New Banner" above to create one.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.tableCard}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableHeaderCell}>Banner</TableCell>
              <TableCell className={styles.tableHeaderCell}>Title / Subtitle</TableCell>
              <TableCell className={styles.tableHeaderCell}>Page Redirect Link</TableCell>
              <TableCell className={styles.tableHeaderCell} align="center">
                Sort Order
              </TableCell>
              <TableCell className={styles.tableHeaderCell} align="center">
                Status
              </TableCell>
              <TableCell className={styles.tableHeaderCell} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner.id} hover>
                <TableCell>
                  <img
                    src={banner.imageUrl}
                    alt={banner.title || "Banner"}
                    className={styles.bannerThumbnail}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {banner.title || "Untitled Banner"}
                  </Typography>
                  {banner.subtitle && (
                    <Typography variant="caption" color="textSecondary" sx={{ display: "block" }}>
                      {banner.subtitle}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {banner.linkUrl ? (
                    <Box
                      component="a"
                      href={banner.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        color: "#0771f3",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: 500,
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {banner.linkUrl}
                      <OpenInNewIcon sx={{ fontSize: 14 }} />
                    </Box>
                  ) : (
                    <Typography variant="caption" color="textSecondary">
                      No link set
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={banner.sortOrder ?? 0}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={banner.isActive ? "Active" : "Inactive"}
                    size="small"
                    className={banner.isActive ? styles.activeChip : styles.inactiveChip}
                  />
                </TableCell>
                <TableCell align="right">
                  <Box className={styles.actionBtnGroup} sx={{ justifyContent: "flex-end" }}>
                    <Tooltip title={banner.isActive ? "Deactivate" : "Activate"}>
                      <Switch
                        size="small"
                        checked={!!banner.isActive}
                        onChange={() => onToggleStatus(banner)}
                      />
                    </Tooltip>

                    <Tooltip title="Edit Banner">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => onEdit(banner)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Banner">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => banner.id && onDelete(banner.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
