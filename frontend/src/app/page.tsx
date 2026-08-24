"use client";

import React from "react";
import { Box } from "@mui/material";

import PrimarySearchAppBar from "@/components/appbar";
import CategoryBar from "@/components/category";
import HomeHeroCarousel from "./home/components/home-hero-carousel";
import HomeFlashDeals from "./home/components/home-flash-deals";
import HomeCategoryGrid from "./home/components/home-category-grid";
import HomeTrustBadges from "./home/components/home-trust-badges";
import HomeFooter from "./home/components/home-footer";
import { useHomeProducts } from "./home/hooks/use-home-products";

import styles from "./home/home.module.css";

export default function Home() {
  const { products, timeLeft } = useHomeProducts();

  return (
    <Box className={styles.homeContainer}>
      <PrimarySearchAppBar />
      {/* <CategoryBar props={{ page: 1, limit: 9 }} /> */}

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
