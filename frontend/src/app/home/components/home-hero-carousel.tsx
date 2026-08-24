"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Typography, Button, IconButton, Chip } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "../home.module.css";

const SLIDES = [
  {
    id: 1,
    tag: "BIG SAVINGS DAY",
    title: "Next-Gen Tech & Electronics Festival",
    sub: "Up to 50% Off on Top Smartphones, Laptops, Audio & Accessories",
    cta: "SHOP TECH DEALS",
    image: "/images/hero-electronics.png",
  },
  {
    id: 2,
    tag: "URBAN FASHION REFRESH",
    title: "The Ultimate Fashion Collection 2026",
    sub: "Flat 20% Extra Off | Use Code: TREND20",
    cta: "EXPLORE CATALOG",
    image: "/images/hero-fashion.png",
  },
];

export default function HomeHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <Box className={styles.heroCard}>
      <Box className={styles.heroSlide}>
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority
          className={styles.heroImage}
          unoptimized
        />
        <Box className={styles.heroContentOverlay}>
          <Chip label={slide.tag} size="small" className={styles.heroTag} />
          <Typography className={styles.heroTitle}>{slide.title}</Typography>
          <Typography className={styles.heroSub}>{slide.sub}</Typography>
          <Button className={styles.heroCtaBtn}>{slide.cta}</Button>
        </Box>
      </Box>

      <IconButton
        className={`${styles.carouselNavBtn} ${styles.carouselNavLeft}`}
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
        }
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        className={`${styles.carouselNavBtn} ${styles.carouselNavRight}`}
        onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}
