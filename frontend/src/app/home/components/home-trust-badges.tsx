"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import styles from "../home.module.css";

const BADGES = [
  {
    icon: <VerifiedUserIcon className={styles.trustIcon} />,
    title: "100% Genuine Products",
    sub: "Directly from authorized vendors",
  },
  {
    icon: <LocalShippingIcon className={styles.trustIcon} />,
    title: "Free & Fast Delivery",
    sub: "On orders above ₹499 across India",
  },
  {
    icon: <AssignmentReturnIcon className={styles.trustIcon} />,
    title: "Easy 7-Day Returns",
    sub: "Hassle-free return policy",
  },
  {
    icon: <SupportAgentIcon className={styles.trustIcon} />,
    title: "24/7 Customer Care",
    sub: "Instant assistance anytime",
  },
];

export default function HomeTrustBadges() {
  return (
    <Box className={styles.trustGrid}>
      {BADGES.map((badge, idx) => (
        <Box key={idx} className={styles.trustCard}>
          {badge.icon}
          <Box>
            <Typography className={styles.trustTitle}>{badge.title}</Typography>
            <Typography className={styles.trustSub}>{badge.sub}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
