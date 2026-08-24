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
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import PrimarySearchAppBar from "@/components/appbar";
import CategoryBar from "@/components/category";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getUserThunk,
  logoutThunk,
  updateUserProfileThunk,
} from "@/features/users/user.action";
import {
  getAddressesThunk,
  createAddressThunk,
  updateAddressThunk,
  setDefaultAddressThunk,
  deleteAddressThunk,
} from "@/features/addresses/address.action";
import { AddressData } from "@/services/address.service";
import CustomerOrders from "./components/customer-orders";
import styles from "./account.module.css";

const INITIAL_ADDRESS_FORM: AddressData & { editingId?: string } = {
  fullName: "",
  mobileNumber: "",
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  city: "",
  state: "",
  country: "India",
  addressType: "home",
  isDefault: false,
};

export default function AccountPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userRaw = useAppSelector((state: any) => state.users?.user);
  const userLoading = useAppSelector((state: any) => state.users?.loading);

  const addresses = useAppSelector(
    (state: any) => state.addresses?.addresses || [],
  );
  const addressLoading = useAppSelector(
    (state: any) => state.addresses?.loading,
  );
  const addressSaving = useAppSelector((state: any) => state.addresses?.saving);

  // Safely extract user object whether wrapped or raw
  const user = userRaw?.data || userRaw;

  // Main navigation tab
  const [activeTab, setActiveTab] = useState<
    "profile" | "addresses" | "pancard" | "orders"
  >("profile");

  // Profile Form states
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingMobile, setEditingMobile] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  // Address Form states
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<
    AddressData & { editingId?: string }
  >(INITIAL_ADDRESS_FORM);

  // Load User Info on mount
  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  // Sync user state into profile form fields
  useEffect(() => {
    if (user) {
      setFirstName(
        user.profile?.firstName || user.firstName || user.username || "",
      );
      setLastName(user.profile?.lastName || user.lastName || "");
      setGender(
        user.profile?.gender?.toLowerCase() ||
          user.gender?.toLowerCase() ||
          "male",
      );
      setEmail(user.email || "");
      setMobileNumber(user.mobileNumber || "");
    }
  }, [user]);

  // Load Addresses when switching to addresses tab
  useEffect(() => {
    if (activeTab === "addresses") {
      dispatch(getAddressesThunk());
    }
  }, [activeTab, dispatch]);

  // Helper to extract user ID safely
  const getUserId = () => {
    return user?.id || user?._id;
  };

  // Save Personal Info
  const handleSavePersonal = async () => {
    const userId = getUserId();
    if (!userId) {
      setFeedback({
        type: "error",
        msg: "User session not found. Please log in again.",
      });
      return;
    }

    setSavingProfile(true);
    setFeedback(null);
    try {
      await dispatch(
        updateUserProfileThunk({
          userId,
          data: { firstName, lastName, gender: gender.toLowerCase() },
        }),
      ).unwrap();
      setEditingPersonal(false);
      setFeedback({
        type: "success",
        msg: "Personal information updated successfully!",
      });
      dispatch(getUserThunk());
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: typeof err === "string" ? err : "Failed to update personal info",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  // Save Email Address
  const handleSaveEmail = async () => {
    const userId = getUserId();
    if (!userId) {
      setFeedback({
        type: "error",
        msg: "User session not found. Please log in again.",
      });
      return;
    }

    setSavingProfile(true);
    setFeedback(null);
    try {
      await dispatch(
        updateUserProfileThunk({
          userId,
          data: { email },
        }),
      ).unwrap();
      setEditingEmail(false);
      setFeedback({
        type: "success",
        msg: "Email address updated successfully!",
      });
      dispatch(getUserThunk());
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: typeof err === "string" ? err : "Failed to update email address",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  // Save Mobile Number
  const handleSaveMobile = async () => {
    const userId = getUserId();
    if (!userId) {
      setFeedback({
        type: "error",
        msg: "User session not found. Please log in again.",
      });
      return;
    }

    setSavingProfile(true);
    setFeedback(null);
    try {
      await dispatch(
        updateUserProfileThunk({
          userId,
          data: { mobileNumber },
        }),
      ).unwrap();
      setEditingMobile(false);
      setFeedback({
        type: "success",
        msg: "Mobile number updated successfully!",
      });
      dispatch(getUserThunk());
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: typeof err === "string" ? err : "Failed to update mobile number",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  // Address Handlers
  const handleOpenNewAddressForm = () => {
    setAddressForm(INITIAL_ADDRESS_FORM);
    setShowAddressForm(true);
  };

  const handleEditAddress = (addr: AddressData) => {
    setAddressForm({
      editingId: addr.id,
      fullName: addr.fullName,
      mobileNumber: addr.mobileNumber,
      postalCode: addr.postalCode,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 || "",
      landmark: addr.landmark || "",
      city: addr.city,
      state: addr.state,
      country: addr.country || "India",
      addressType: addr.addressType || "home",
      isDefault: addr.isDefault || false,
    });
    setShowAddressForm(true);
  };

  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
    setAddressForm(INITIAL_ADDRESS_FORM);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !addressForm.fullName ||
      !addressForm.mobileNumber ||
      !addressForm.postalCode ||
      !addressForm.addressLine1 ||
      !addressForm.city ||
      !addressForm.state
    ) {
      setFeedback({
        type: "error",
        msg: "Please fill in all required address fields.",
      });
      return;
    }

    setFeedback(null);
    try {
      if (addressForm.editingId) {
        await dispatch(
          updateAddressThunk({
            id: addressForm.editingId,
            data: addressForm,
          }),
        ).unwrap();
        setFeedback({
          type: "success",
          msg: "Address updated successfully!",
        });
      } else {
        await dispatch(createAddressThunk(addressForm)).unwrap();
        setFeedback({
          type: "success",
          msg: "New address added successfully!",
        });
      }
      setShowAddressForm(false);
      setAddressForm(INITIAL_ADDRESS_FORM);
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: typeof err === "string" ? err : "Failed to save address",
      });
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    setFeedback(null);
    try {
      await dispatch(setDefaultAddressThunk(id)).unwrap();
      setFeedback({
        type: "success",
        msg: "Default address updated!",
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: typeof err === "string" ? err : "Failed to set default address",
      });
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    setFeedback(null);
    try {
      await dispatch(deleteAddressThunk(id)).unwrap();
      setFeedback({
        type: "success",
        msg: "Address deleted successfully!",
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        msg: typeof err === "string" ? err : "Failed to delete address",
      });
    }
  };

  const handleLogout = async () => {
    await dispatch(logoutThunk());
    router.push("/login");
  };

  const displayName =
    firstName || lastName
      ? `${firstName} ${lastName}`.trim()
      : user?.email?.split("@")[0] || "User Profile";

  return (
    <Box className={styles.container}>
      <PrimarySearchAppBar />
      {/* <CategoryBar props={{ page: 1, limit: 9 }} /> */}

      <Box className={styles.mainWrapper}>
        {/* Left Sidebar */}
        <Box className={styles.sidebar}>
          <Box className={styles.userCard}>
            <Box className={styles.avatar}>
              <Image
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-52156828.svg"
                alt="User Avatar"
                width={50}
                height={50}
                className={styles.avatarImg}
                onError={(e: any) => {
                  e.target.style.display = "none";
                }}
              />
            </Box>
            <Box className={styles.userGreeting}>
              <Typography className={styles.helloText}>Hello,</Typography>
              <Typography className={styles.userName}>{displayName}</Typography>
            </Box>
          </Box>

          <Box className={styles.sidebarCard}>
            {/* MY ORDERS */}
            <Box className={styles.menuSection}>
              <Box
                className={`${styles.menuHeader} ${activeTab === "orders" ? styles.menuItemActive : ""}`}
                onClick={() => setActiveTab("orders")}
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

            <Box className={styles.menuSection}>
              <Box className={styles.menuHeader}>
                <Box className={styles.menuHeaderLeft}>
                  <PersonIcon sx={{ color: "#2874f0" }} />
                  <Typography className={styles.menuHeaderTitle}>
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
            <Box className={styles.menuSection}>
              <Box className={styles.menuHeader}>
                <Box className={styles.menuHeaderLeft}>
                  <AccountBalanceWalletIcon sx={{ color: "#2874f0" }} />
                  <Typography className={styles.menuHeaderTitle}>
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
            <Box className={styles.menuSection}>
              <Box className={styles.menuHeader}>
                <Box className={styles.menuHeaderLeft}>
                  <FolderSpecialIcon sx={{ color: "#2874f0" }} />
                  <Typography className={styles.menuHeaderTitle}>
                    MY STUFF
                  </Typography>
                </Box>
              </Box>
              <Box className={styles.menuItem}>My Coupons</Box>
              <Box className={styles.menuItem}>My Reviews & Ratings</Box>
              <Box className={styles.menuItem}>All Notifications</Box>
              <Box className={styles.menuItem}>My Wishlist</Box>
            </Box>

            <Box className={styles.menuSection}>
              <Box className={styles.menuHeader} onClick={handleLogout}>
                <Box className={styles.menuHeaderLeft}>
                  <PowerSettingsNewIcon sx={{ color: "#878787" }} />
                  <Typography className={styles.menuHeaderTitle}>
                    Logout
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

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

          {activeTab === "orders" && <CustomerOrders />}

          {activeTab === "profile" && (
            <Box>
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
                    disabled={savingProfile}
                    className={styles.saveBtn}
                  >
                    {savingProfile ? "Saving..." : "Save"}
                  </button>
                )}
              </Box>
              <Box sx={{ mt: 5 }}>
                <Box className={styles.sectionHeader}>
                  <Typography className={styles.sectionTitle}>
                    Email Address
                  </Typography>
                </Box>

                <Box className={styles.inputBox}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={true}
                    className={`${styles.inputField} ${editingEmail ? styles.inputFieldEditable : ""}`}
                    placeholder="Email Address"
                  />
                </Box>
              </Box>
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
                    disabled={savingProfile}
                    className={styles.saveBtn}
                  >
                    {savingProfile ? "Saving..." : "Save"}
                  </button>
                )}
              </Box>

              {/* Section 4: FAQs */}
              <Box className={styles.faqContainer}>
                <Typography className={styles.faqHeader}>FAQs</Typography>

                <Box className={styles.faqItem}>
                  <Typography className={styles.faqQuestion}>
                    What happens when I update my email address (or mobile
                    number)?
                  </Typography>
                  <Typography className={styles.faqAnswer}>
                    Your login email id (or mobile number) changes, likewise.
                    You&apos;ll receive all your account related communication
                    on your updated email address (or mobile number).
                  </Typography>
                </Box>

                <Box className={styles.faqItem}>
                  <Typography className={styles.faqQuestion}>
                    When will my Flipkart account be updated with the new email
                    address (or mobile number)?
                  </Typography>
                  <Typography className={styles.faqAnswer}>
                    It happens as soon as you confirm the verification code sent
                    to your email (or mobile) and save the changes.
                  </Typography>
                </Box>

                <Box className={styles.faqItem}>
                  <Typography className={styles.faqQuestion}>
                    What happens to my existing Flipkart account when I update
                    my email address (or mobile number)?
                  </Typography>
                  <Typography className={styles.faqAnswer}>
                    Updating your email address (or mobile number) doesn&apos;t
                    invalidate your account. Your account remains fully
                    functional with all your past order details and saved
                    addresses intact.
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
          )}

          {activeTab === "addresses" && (
            <Box>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionTitle}>
                  Manage Addresses
                </Typography>
              </Box>

              {/* Add New Address Button */}
              {!showAddressForm && (
                <Box
                  className={styles.addAddressCardToggle}
                  onClick={handleOpenNewAddressForm}
                >
                  <AddIcon />
                  <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                    ADD A NEW ADDRESS
                  </Typography>
                </Box>
              )}

              {/* Address Form Card */}
              {showAddressForm && (
                <Box className={styles.addressFormCard}>
                  <Typography className={styles.formTitle}>
                    {addressForm.editingId
                      ? "EDIT ADDRESS"
                      : "ADD A NEW ADDRESS"}
                  </Typography>
                  <form onSubmit={handleSaveAddress}>
                    <Box className={styles.formRow}>
                      <Box className={styles.formGroup}>
                        <label className={styles.formLabel}>Full Name *</label>
                        <input
                          type="text"
                          required
                          className={styles.formInput}
                          placeholder="Name"
                          value={addressForm.fullName}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              fullName: e.target.value,
                            })
                          }
                        />
                      </Box>
                      <Box className={styles.formGroup}>
                        <label className={styles.formLabel}>
                          10-digit mobile number *
                        </label>
                        <input
                          type="text"
                          required
                          className={styles.formInput}
                          placeholder="10-digit mobile number"
                          value={addressForm.mobileNumber}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              mobileNumber: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Box>

                    <Box className={styles.formRow}>
                      <Box className={styles.formGroup}>
                        <label className={styles.formLabel}>Pincode *</label>
                        <input
                          type="text"
                          required
                          className={styles.formInput}
                          placeholder="Pincode"
                          value={addressForm.postalCode}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              postalCode: e.target.value,
                            })
                          }
                        />
                      </Box>
                      <Box className={styles.formGroup}>
                        <label className={styles.formLabel}>
                          Locality / Street *
                        </label>
                        <input
                          type="text"
                          required
                          className={styles.formInput}
                          placeholder="Locality"
                          value={addressForm.addressLine1}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              addressLine1: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Box>

                    <Box className={styles.formRow}>
                      <Box className={styles.formGroup}>
                        <label className={styles.formLabel}>
                          Flat, House No., Building (Optional)
                        </label>
                        <input
                          type="text"
                          className={styles.formInput}
                          placeholder="Address Line 2"
                          value={addressForm.addressLine2}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              addressLine2: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Box>

                    <Box className={styles.formRow}>
                      <Box className={styles.formGroup}>
                        <label className={styles.formLabel}>
                          City / District / Town *
                        </label>
                        <input
                          type="text"
                          required
                          className={styles.formInput}
                          placeholder="City/District/Town"
                          value={addressForm.city}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              city: e.target.value,
                            })
                          }
                        />
                      </Box>
                      <Box className={styles.formGroup}>
                        <label className={styles.formLabel}>State *</label>
                        <input
                          type="text"
                          required
                          className={styles.formInput}
                          placeholder="State"
                          value={addressForm.state}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              state: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Box>

                    <Box className={styles.formRow}>
                      <Box className={styles.formGroup}>
                        <label className={styles.formLabel}>
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          className={styles.formInput}
                          placeholder="Landmark"
                          value={addressForm.landmark}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              landmark: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Box>

                    <Typography className={styles.addressTypeLabel}>
                      Address Type
                    </Typography>
                    <Box className={styles.typeRadioGroup}>
                      <label className={styles.typeRadioLabel}>
                        <input
                          type="radio"
                          name="addressType"
                          value="home"
                          checked={addressForm.addressType === "home"}
                          onChange={() =>
                            setAddressForm({
                              ...addressForm,
                              addressType: "home",
                            })
                          }
                          className={styles.radioInput}
                        />
                        Home (All day delivery)
                      </label>
                      <label className={styles.typeRadioLabel}>
                        <input
                          type="radio"
                          name="addressType"
                          value="work"
                          checked={addressForm.addressType === "work"}
                          onChange={() =>
                            setAddressForm({
                              ...addressForm,
                              addressType: "work",
                            })
                          }
                          className={styles.radioInput}
                        />
                        Work (Delivery between 10 AM - 6 PM)
                      </label>
                    </Box>

                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={addressForm.isDefault}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            isDefault: e.target.checked,
                          })
                        }
                      />
                      Make this my default address
                    </label>

                    <Box className={styles.formActions}>
                      <button
                        type="submit"
                        disabled={addressSaving}
                        className={styles.saveBtn}
                      >
                        {addressSaving ? "SAVING..." : "SAVE"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelAddressForm}
                        className={styles.cancelBtn}
                      >
                        CANCEL
                      </button>
                    </Box>
                  </form>
                </Box>
              )}

              {/* Address List */}
              {addressLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                  <CircularProgress color="primary" />
                </Box>
              ) : addresses.length === 0 && !showAddressForm ? (
                <Box className={styles.emptyState}>
                  <LocationOnIcon
                    sx={{ fontSize: 64, color: "#cbd5e1", mb: 2 }}
                  />
                  <Typography className={styles.emptyStateTitle}>
                    No Saved Addresses Found
                  </Typography>
                  <Typography className={styles.emptyStateSub}>
                    Add your delivery address to enjoy fast checkout
                  </Typography>
                  <button
                    onClick={handleOpenNewAddressForm}
                    className={styles.saveBtn}
                  >
                    + ADD NEW ADDRESS
                  </button>
                </Box>
              ) : (
                <Box className={styles.addressList}>
                  {addresses.map((addr: AddressData) => (
                    <Box key={addr.id} className={styles.addressCard}>
                      <Box className={styles.addressCardHeader}>
                        <Box className={styles.tagGroup}>
                          <span className={styles.typeTag}>
                            {addr.addressType || "HOME"}
                          </span>
                          {addr.isDefault && (
                            <span className={styles.defaultTag}>DEFAULT</span>
                          )}
                        </Box>
                      </Box>

                      <Box className={styles.addressUserInfo}>
                        <Typography className={styles.recipientName}>
                          {addr.fullName}
                        </Typography>
                        <Typography className={styles.recipientPhone}>
                          {addr.mobileNumber}
                        </Typography>
                      </Box>

                      <Typography className={styles.addressDetailsText}>
                        {addr.addressLine1}
                        {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
                        {addr.landmark
                          ? `, Landmark: ${addr.landmark}`
                          : ""}, {addr.city}, {addr.state} -{" "}
                        <strong>{addr.postalCode}</strong>
                      </Typography>

                      <Box className={styles.addressCardActions}>
                        <button
                          className={styles.actionBtn}
                          onClick={() => handleEditAddress(addr)}
                        >
                          EDIT
                        </button>
                        <button
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          onClick={() =>
                            addr.id && handleDeleteAddress(addr.id)
                          }
                        >
                          DELETE
                        </button>
                        {!addr.isDefault && (
                          <button
                            className={styles.actionBtn}
                            onClick={() =>
                              addr.id && handleSetDefaultAddress(addr.id)
                            }
                          >
                            SET AS DEFAULT
                          </button>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}

          {activeTab === "pancard" && (
            <Box>
              <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionTitle}>
                  PAN Card Information
                </Typography>
              </Box>
              <Typography sx={{ color: "#878787", fontSize: 14 }}>
                PAN Card details integration feature coming soon.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
