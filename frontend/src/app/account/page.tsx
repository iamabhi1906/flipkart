"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import PrimarySearchAppBar from "@/components/appbar";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getUserThunk,
  logoutThunk,
  updateUserProfileThunk,
} from "@/features/users/user.action";
import styles from "./account.module.css";
import CategoryBar from "@/components/category";

export default function AccountPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state: any) => state.users?.user);
  const loading = useAppSelector((state: any) => state.users?.loading);

  // Form edit states
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingMobile, setEditingMobile] = useState(false);

  // Form field values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [activeTab, setActiveTab] = useState("profile");
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [saving, setSaving] = useState(false);

  // useEffect(() => {
  //   dispatch(getUserThunk());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     setFirstName(user.profile?.firstName || user.username || "Abhishek");
  //     setLastName(user.profile?.lastName || "Kumar");
  //     setGender(user.profile?.gender?.toLowerCase() || "male");
  //     setEmail(user.email || "iamabhi0619@gmail.com");
  //     setMobileNumber(user.mobileNumber || "+916206418701");
  //   }
  // }, [user]);

  const handleSavePersonal = async () => {
    if (!user?.id) return;
    setSaving(true);
    setFeedback(null);
    try {
      await dispatch(
        updateUserProfileThunk({
          userId: user.id,
          data: { firstName, lastName, gender: gender.toUpperCase() },
        }),
      ).unwrap();
      setEditingPersonal(false);
      setFeedback({
        type: "success",
        msg: "Personal information updated successfully!",
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: typeof err === "string" ? err : "Failed to update profile",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEmail = async () => {
    if (!user?.id) return;
    setSaving(true);
    setFeedback(null);
    try {
      await dispatch(
        updateUserProfileThunk({
          userId: user.id,
          data: { email },
        }),
      ).unwrap();
      setEditingEmail(false);
      setFeedback({
        type: "success",
        msg: "Email address updated successfully!",
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: typeof err === "string" ? err : "Failed to update email",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveMobile = async () => {
    if (!user?.id) return;
    setSaving(true);
    setFeedback(null);
    try {
      await dispatch(
        updateUserProfileThunk({
          userId: user.id,
          data: { mobileNumber },
        }),
      ).unwrap();
      setEditingMobile(false);
      setFeedback({
        type: "success",
        msg: "Mobile number updated successfully!",
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: typeof err === "string" ? err : "Failed to update mobile number",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    router.push("/login");
  };

  const displayName =
    firstName || lastName
      ? `${firstName} ${lastName}`.trim()
      : user?.email?.split("@")[0] || "Abhishek Kumar";

  return (
    <Box className={styles.container}>
      <PrimarySearchAppBar />

      {/* Sub Header Navigation Bar */}
      <CategoryBar props={{ page: 1, limit: 9 }} />

      {/* Main Content Layout */}
      <Box className={styles.mainWrapper}>
        {/* Left Sidebar */}
        <Box className={styles.sidebar}>
          {/* User Header Card */}
          <Box className={styles.userCard}>
            <Box className={styles.avatar}>
              <Image
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-52156828.svg"
                alt="User Avatar"
                width={50}
                height={50}
                className={styles.avatarImg}
                onError={(e: any) => {
                  // Fallback avatar icon
                  e.target.style.display = "none";
                }}
              />
            </Box>
            <Box className={styles.userGreeting}>
              <Typography className={styles.helloText}>Hello,</Typography>
              <Typography className={styles.userName}>{displayName}</Typography>
            </Box>
          </Box>

          {/* Navigation Menu Card */}
          <Box className={styles.sidebarCard}>
            {/* MY ORDERS */}
            <Box className={styles.menuSection}>
              <Box
                className={styles.menuHeader}
                onClick={() => router.push("/orders")}
              >
                <Box className={styles.menuHeaderLeft}>
                  <ShoppingBagIcon sx={{ color: "#2874f0" }} />
                  <Typography
                    className={styles.menuHeaderTitle}
                    sx={{ color: "#2874f0" }}
                  >
                    MY ORDERS
                  </Typography>
                </Box>
                <ChevronRightIcon sx={{ color: "#878787" }} />
              </Box>
            </Box>

            {/* ACCOUNT SETTINGS */}
            <Box className={styles.menuSection}>
              <Box className={styles.menuHeader}>
                <Box className={styles.menuHeaderLeft}>
                  <PersonIcon sx={{ color: "#2874f0" }} />
                  <Typography
                    className={styles.menuHeaderTitle}
                    sx={{ color: "#878787" }}
                  >
                    ACCOUNT SETTINGS
                  </Typography>
                </Box>
              </Box>
              <Box
                className={`${styles.menuItem} ${activeTab === "profile" ? styles.menuItemActive : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile Information
              </Box>
              <Box
                className={`${styles.menuItem} ${activeTab === "addresses" ? styles.menuItemActive : ""}`}
                onClick={() => setActiveTab("addresses")}
              >
                Manage Addresses
              </Box>
              <Box
                className={`${styles.menuItem} ${activeTab === "pancard" ? styles.menuItemActive : ""}`}
                onClick={() => setActiveTab("pancard")}
              >
                PAN Card Information
              </Box>
            </Box>

            {/* PAYMENTS */}
            <Box className={styles.menuSection}>
              <Box className={styles.menuHeader}>
                <Box className={styles.menuHeaderLeft}>
                  <AccountBalanceWalletIcon sx={{ color: "#2874f0" }} />
                  <Typography
                    className={styles.menuHeaderTitle}
                    sx={{ color: "#878787" }}
                  >
                    PAYMENTS
                  </Typography>
                </Box>
              </Box>
              <Box className={styles.menuItem}>
                Gift Cards <span className={styles.greenBadge}>₹0</span>
              </Box>
              <Box className={styles.menuItem}>Saved UPI</Box>
              <Box className={styles.menuItem}>Saved Cards</Box>
            </Box>

            {/* MY STUFF */}
            <Box className={styles.menuSection}>
              <Box className={styles.menuHeader}>
                <Box className={styles.menuHeaderLeft}>
                  <FolderSpecialIcon sx={{ color: "#2874f0" }} />
                  <Typography
                    className={styles.menuHeaderTitle}
                    sx={{ color: "#878787" }}
                  >
                    MY STUFF
                  </Typography>
                </Box>
              </Box>
              <Box className={styles.menuItem}>My Coupons</Box>
              <Box className={styles.menuItem}>My Reviews & Ratings</Box>
              <Box className={styles.menuItem}>All Notifications</Box>
              <Box className={styles.menuItem}>My Wishlist</Box>
            </Box>

            {/* LOGOUT */}
            <Box className={styles.menuSection}>
              <Box className={styles.menuHeader} onClick={handleLogout}>
                <Box className={styles.menuHeaderLeft}>
                  <PowerSettingsNewIcon sx={{ color: "#878787" }} />
                  <Typography
                    className={styles.menuHeaderTitle}
                    sx={{ color: "#878787" }}
                  >
                    Logout
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Main Content Panel */}
        <Box className={styles.contentCard}>
          {feedback && (
            <Alert
              severity={feedback.type}
              sx={{ mb: 3 }}
              onClose={() => setFeedback(null)}
            >
              {feedback.msg}
            </Alert>
          )}

          {/* Section 1: Personal Information */}
          <Box>
            <Box className={styles.sectionHeader}>
              <Typography className={styles.sectionTitle}>
                Personal Information
              </Typography>
              <Typography
                className={styles.editBtn}
                onClick={() => setEditingPersonal(!editingPersonal)}
              >
                {editingPersonal ? "Cancel" : "Edit"}
              </Typography>
            </Box>

            <Box className={styles.inputGroupRow}>
              <Box className={styles.inputBox}>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!editingPersonal}
                  className={`${styles.inputField} ${editingPersonal ? styles.inputFieldEditable : ""}`}
                  placeholder="First Name"
                />
              </Box>
              <Box className={styles.inputBox}>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!editingPersonal}
                  className={`${styles.inputField} ${editingPersonal ? styles.inputFieldEditable : ""}`}
                  placeholder="Last Name"
                />
              </Box>
            </Box>

            {/* Your Gender */}
            <Box className={styles.genderSection}>
              <Typography className={styles.genderLabel}>
                Your Gender
              </Typography>
              <Box className={styles.genderOptions}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={!editingPersonal}
                    className={styles.radioInput}
                  />
                  Male
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={!editingPersonal}
                    className={styles.radioInput}
                  />
                  Female
                </label>
              </Box>
            </Box>

            {editingPersonal && (
              <button
                onClick={handleSavePersonal}
                disabled={saving}
                className={styles.saveBtn}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            )}
          </Box>

          {/* Section 2: Email Address */}
          <Box sx={{ mt: 5 }}>
            <Box className={styles.sectionHeader}>
              <Typography className={styles.sectionTitle}>
                Email Address
              </Typography>
              <Typography
                className={styles.editBtn}
                onClick={() => setEditingEmail(!editingEmail)}
              >
                {editingEmail ? "Cancel" : "Edit"}
              </Typography>
            </Box>

            <Box className={styles.inputBox}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editingEmail}
                className={`${styles.inputField} ${editingEmail ? styles.inputFieldEditable : ""}`}
                placeholder="Email Address"
              />
            </Box>

            {editingEmail && (
              <button
                onClick={handleSaveEmail}
                disabled={saving}
                className={styles.saveBtn}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            )}
          </Box>

          {/* Section 3: Mobile Number */}
          <Box sx={{ mt: 5 }}>
            <Box className={styles.sectionHeader}>
              <Typography className={styles.sectionTitle}>
                Mobile Number
              </Typography>
              <Typography
                className={styles.editBtn}
                onClick={() => setEditingMobile(!editingMobile)}
              >
                {editingMobile ? "Cancel" : "Edit"}
              </Typography>
            </Box>

            <Box className={styles.inputBox}>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                disabled={!editingMobile}
                className={`${styles.inputField} ${editingMobile ? styles.inputFieldEditable : ""}`}
                placeholder="Mobile Number"
              />
            </Box>

            {editingMobile && (
              <button
                onClick={handleSaveMobile}
                disabled={saving}
                className={styles.saveBtn}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            )}
          </Box>

          {/* Section 4: FAQs */}
          <Box className={styles.faqContainer}>
            <Typography className={styles.faqHeader}>FAQs</Typography>

            <Box className={styles.faqItem}>
              <Typography className={styles.faqQuestion}>
                What happens when I update my email address (or mobile number)?
              </Typography>
              <Typography className={styles.faqAnswer}>
                Your login email id (or mobile number) changes, likewise.
                You&apos;ll receive all your account related communication on
                your updated email address (or mobile number).
              </Typography>
            </Box>

            <Box className={styles.faqItem}>
              <Typography className={styles.faqQuestion}>
                When will my Flipkart account be updated with the new email
                address (or mobile number)?
              </Typography>
              <Typography className={styles.faqAnswer}>
                It happens as soon as you confirm the verification code sent to
                your email (or mobile) and save the changes.
              </Typography>
            </Box>

            <Box className={styles.faqItem}>
              <Typography className={styles.faqQuestion}>
                What happens to my existing Flipkart account when I update my
                email address (or mobile number)?
              </Typography>
              <Typography className={styles.faqAnswer}>
                Updating your email address (or mobile number) doesn&apos;t
                invalidate your account. Your account remains fully functional
                with all your past order details and saved addresses intact.
              </Typography>
            </Box>
          </Box>

          {/* Bottom Banner Image */}
          <Box className={styles.bottomBanner}>
            <Image
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/myaccounts-footer_4a92a7.png"
              alt="Flipkart Account Footer Graphic"
              width={800}
              height={100}
              className={styles.bannerImg}
              unoptimized
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
