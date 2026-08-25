"use client";

import React, { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

import PrimarySearchAppBar from "@/components/appbar";
import HomeHeroCarousel from "./home/components/home-hero-carousel";
import HomeFlashDeals from "./home/components/home-flash-deals";
import HomeCategoryGrid from "./home/components/home-category-grid";
import HomeTrustBadges from "./home/components/home-trust-badges";
import HomeFooter from "./home/components/home-footer";
import { useHomeProducts } from "./home/hooks/use-home-products";

import styles from "./home/home.module.css";

function HomeContent() {
  const { products, timeLeft } = useHomeProducts();

  return (
    <Box className={styles.homeContainer}>
      <PrimarySearchAppBar />
      <Box className={styles.mainContent}>
        <HomeHeroCarousel />
        <HomeFlashDeals products={products} timeLeft={timeLeft} />
        <HomeCategoryGrid />
        <HomeTrustBadges />
      </Box>
      <HomeFooter />
    </Box>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <CircularProgress />
        </Box>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
