"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import KitchenIcon from "@mui/icons-material/Kitchen";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FaceIcon from "@mui/icons-material/Face";
import styles from "../home.module.css";

const CATEGORIES = [
  { id: 1, title: "Mobiles & Tech", sub: "Up to 40% Off", icon: <PhoneIphoneIcon /> },
  { id: 2, title: "Fashion & Trends", sub: "From ₹299", icon: <CheckroomIcon /> },
  { id: 3, title: "Home & Kitchen", sub: "Up to 60% Off", icon: <KitchenIcon /> },
  { id: 4, title: "Laptops & Computing", sub: "Top Brands", icon: <LaptopMacIcon /> },
  { id: 5, title: "Gaming & Console", sub: "Hot Deals", icon: <SportsEsportsIcon /> },
  { id: 6, title: "Beauty & Personal", sub: "Flat 30% Off", icon: <FaceIcon /> },
];

export default function HomeCategoryGrid() {
  return (
    <Box className={styles.sectionCard}>
      <Box className={styles.sectionHeaderRow}>
        <Typography component="h2" className={styles.sectionMainTitle}>
          Explore Top Categories
        </Typography>
      </Box>

      <Box className={styles.categoryGrid}>
        {CATEGORIES.map((cat) => (
          <Box key={cat.id} className={styles.categoryCard}>
            <Box className={styles.categoryIconBox}>{cat.icon}</Box>
            <Typography className={styles.categoryCardTitle}>
              {cat.title}
            </Typography>
            <Typography className={styles.categoryCardSub}>
              {cat.sub}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
