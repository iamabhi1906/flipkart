"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VerifiedIcon from "@mui/icons-material/Verified";

import PrimarySearchAppBar from "@/components/appbar";
import CategoryBar from "@/components/category";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserThunk } from "@/features/users/user.action";
import {
  becomeVendor,
  getMyVendorProfile,
  VendorData,
} from "@/services/vendor.service";
import styles from "./become-seller.module.css";

export default function BecomeSellerPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userRaw = useAppSelector((state: any) => state.users?.user);
  const user = userRaw?.data || userRaw;

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [existingVendor, setExistingVendor] = useState<any>(null);

  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const [formData, setFormData] = useState<VendorData>({
    businessName: "",
    businessDescription: "",
    businessEmail: "",
    businessPhone: "",
    taxNumber: "",
    registrationNumber: "",
  });

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  // Sync user info into initial form fields
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        businessEmail: prev.businessEmail || user.email || "",
        businessPhone: prev.businessPhone || user.mobileNumber || "",
      }));

      if (user.role === "vendor") {
        fetchVendorProfile();
      }
    }
  }, [user]);

  const fetchVendorProfile = async () => {
    setLoading(true);
    try {
      const vendor = await getMyVendorProfile();
      setExistingVendor(vendor);
    } catch (err) {
      // Vendor profile not found yet
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setFeedback({
        type: "error",
        msg: "Please login to register as a seller on Flipkart.",
      });
      return;
    }

    if (!formData.businessName) {
      setFeedback({
        type: "error",
        msg: "Business Name is required.",
      });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await becomeVendor(formData);
      setFeedback({
        type: "success",
        msg: "Congratulations! You are now a registered seller on Flipkart.",
      });
      setExistingVendor(res.vendorProfile || res);
      dispatch(getUserThunk());
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to register as a vendor. Please try again.";
      setFeedback({
        type: "error",
        msg: errorMsg,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className={styles.container}>
      <PrimarySearchAppBar />
      {/* <CategoryBar props={{ page: 1, limit: 9 }} /> */}

      {/* Hero Banner Header */}
      <Box className={styles.heroBanner}>
        <Box className={styles.heroContent}>
          <Typography className={styles.heroTitle}>
            Sell Online to 50+ Crore Customers on Flipkart
          </Typography>
          <Typography className={styles.heroSubtitle}>
            Create your Flipkart seller account in under 5 minutes and grow your
            business across India.
          </Typography>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box className={styles.mainContent}>
        {feedback && (
          <Alert
            severity={feedback.type}
            sx={{ mb: 3 }}
            onClose={() => setFeedback(null)}
          >
            {feedback.msg}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : existingVendor ? (
          /* Registered Vendor View */
          <Box className={styles.vendorStatusCard}>
            <CheckCircleIcon className={styles.statusIcon} />
            <Typography className={styles.statusTitle}>
              You are a Verified Flipkart Seller!
            </Typography>
            <Typography className={styles.statusText}>
              Your business is registered and active on Flipkart. Manage your
              catalog, view orders, and track revenue from your seller hub.
            </Typography>

            <Box className={styles.vendorDetailsBox}>
              <Box className={styles.detailRow}>
                <span className={styles.detailKey}>Business Name:</span>
                <span className={styles.detailValue}>
                  {existingVendor.businessName}
                </span>
              </Box>
              {existingVendor.businessEmail && (
                <Box className={styles.detailRow}>
                  <span className={styles.detailKey}>Business Email:</span>
                  <span className={styles.detailValue}>
                    {existingVendor.businessEmail}
                  </span>
                </Box>
              )}
              {existingVendor.businessPhone && (
                <Box className={styles.detailRow}>
                  <span className={styles.detailKey}>Business Phone:</span>
                  <span className={styles.detailValue}>
                    {existingVendor.businessPhone}
                  </span>
                </Box>
              )}
              {existingVendor.taxNumber && (
                <Box className={styles.detailRow}>
                  <span className={styles.detailKey}>GSTIN / Tax No:</span>
                  <span className={styles.detailValue}>
                    {existingVendor.taxNumber}
                  </span>
                </Box>
              )}
              <Box className={styles.detailRow}>
                <span className={styles.detailKey}>Verification Status:</span>
                <span
                  className={styles.detailValue}
                  style={{ color: "#388e3c" }}
                >
                  <VerifiedIcon
                    sx={{ fontSize: 16, verticalAlign: "middle", mr: 0.5 }}
                  />
                  Verified Seller
                </span>
              </Box>
            </Box>

            <button
              onClick={() => router.push("/dashboard")}
              className={styles.dashboardBtn}
            >
              Go to Dashboard
            </button>
          </Box>
        ) : (
          /* Become a Vendor Registration Form */
          <Box className={styles.formCard}>
            <Box className={styles.cardHeader}>
              <Typography className={styles.cardTitle}>
                Register Your Business Profile
              </Typography>
              <Typography className={styles.cardSub}>
                Enter your business details below to activate your Flipkart
                seller account.
              </Typography>
            </Box>

            {!user && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                You are not logged in. Please{" "}
                <strong
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => router.push("/login")}
                >
                  Log In
                </strong>{" "}
                or create an account before completing vendor registration.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box className={styles.formRow}>
                <Box className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Business / Store Name *
                  </label>
                  <input
                    type="text"
                    required
                    className={styles.formInput}
                    placeholder="e.g. Acme Superstore India"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                  />
                </Box>
                <Box className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Business Email Address
                  </label>
                  <input
                    type="email"
                    className={styles.formInput}
                    placeholder="seller@business.com"
                    value={formData.businessEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessEmail: e.target.value,
                      })
                    }
                  />
                </Box>
              </Box>

              <Box className={styles.formRow}>
                <Box className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Business Phone Number
                  </label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="10-digit mobile number"
                    value={formData.businessPhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessPhone: e.target.value,
                      })
                    }
                  />
                </Box>
                <Box className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    GSTIN / Tax Registration No. (Optional)
                  </label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="e.g. 22AAAAA0000A1Z5"
                    value={formData.taxNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, taxNumber: e.target.value })
                    }
                  />
                </Box>
              </Box>

              <Box className={styles.formRow}>
                <Box className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Business Registration / License No. (Optional)
                  </label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="e.g. REG-10928374"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationNumber: e.target.value,
                      })
                    }
                  />
                </Box>
              </Box>

              <Box className={styles.formRow}>
                <Box className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Business Description
                  </label>
                  <textarea
                    className={styles.formTextarea}
                    placeholder="Tell buyers about your products, brand, or business..."
                    value={formData.businessDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessDescription: e.target.value,
                      })
                    }
                  />
                </Box>
              </Box>

              <button
                type="submit"
                disabled={submitting || !user}
                className={styles.submitBtn}
              >
                {submitting ? "REGISTERING..." : "REGISTER AS SELLER"}
              </button>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
}
