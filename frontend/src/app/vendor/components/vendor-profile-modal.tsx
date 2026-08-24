"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getMyVendorProfile, updateMyVendorProfile } from "@/services/vendor.service";
import {
  vendorProfileSchema,
  VendorProfileFormValues,
} from "../schemas/vendor-profile-schema";
import styles from "../vendor.module.css";

interface VendorProfileModalProps {
  open: boolean;
  onClose: () => void;
}

export default function VendorProfileModal({ open, onClose }: VendorProfileModalProps) {
  const [loading, setLoading] = React.useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VendorProfileFormValues>({
    resolver: zodResolver(vendorProfileSchema),
    defaultValues: {
      businessName: "",
      businessEmail: "",
      businessPhone: "",
      taxNumber: "",
      registrationNumber: "",
      businessDescription: "",
    },
  });

  useEffect(() => {
    if (!open) return;
    async function loadProfile() {
      setLoading(true);
      try {
        const data = await getMyVendorProfile();
        if (data) {
          reset({
            businessName: data.businessName || "",
            businessEmail: data.businessEmail || "",
            businessPhone: data.businessPhone || "",
            taxNumber: data.taxNumber || "",
            registrationNumber: data.registrationNumber || "",
            businessDescription: data.businessDescription || "",
          });
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [open, reset]);

  const onSubmit = async (values: VendorProfileFormValues) => {
    try {
      await updateMyVendorProfile(values);
      alert("Store business profile updated successfully!");
      onClose();
    } catch (err) {
      alert("Failed to update business profile");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ fontWeight: 800 }}>Manage Store Business Profile</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {loading ? (
            <Box style={{ textAlign: "center", padding: 32 }}>
              <CircularProgress size={32} />
            </Box>
          ) : (
            <Box className={styles.formFieldsGrid}>
              <Controller
                name="businessName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Store / Business Name *"
                    fullWidth
                    size="small"
                    error={Boolean(errors.businessName)}
                    helperText={errors.businessName?.message}
                  />
                )}
              />
              <Controller
                name="businessEmail"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Business Email"
                    fullWidth
                    size="small"
                    type="email"
                    error={Boolean(errors.businessEmail)}
                    helperText={errors.businessEmail?.message}
                  />
                )}
              />
              <Controller
                name="businessPhone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Business Phone Number"
                    fullWidth
                    size="small"
                    error={Boolean(errors.businessPhone)}
                    helperText={errors.businessPhone?.message}
                  />
                )}
              />
              <Controller
                name="taxNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tax / GST Number"
                    fullWidth
                    size="small"
                    error={Boolean(errors.taxNumber)}
                    helperText={errors.taxNumber?.message}
                  />
                )}
              />
              <Controller
                name="registrationNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Business Registration Number"
                    fullWidth
                    size="small"
                    error={Boolean(errors.registrationNumber)}
                    helperText={errors.registrationNumber?.message}
                  />
                )}
              />
              <Controller
                name="businessDescription"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Business Description"
                    fullWidth
                    multiline
                    rows={3}
                    size="small"
                    error={Boolean(errors.businessDescription)}
                    helperText={errors.businessDescription?.message}
                  />
                )}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions style={{ padding: "16px 24px" }}>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Business Profile"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
