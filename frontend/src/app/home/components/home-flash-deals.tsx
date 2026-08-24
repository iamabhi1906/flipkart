"use client";

import React from "react";
import Image from "next/image";
import { Box, Typography, Button, Chip } from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import StarIcon from "@mui/icons-material/Star";
import { ProductData } from "@/services/product.service";
import styles from "../home.module.css";

interface HomeFlashDealsProps {
  products: ProductData[];
  timeLeft: { hours: number; minutes: number; seconds: number };
}

export default function HomeFlashDeals({
  products,
  timeLeft,
}: HomeFlashDealsProps) {
  const pad = (num: number) => String(num).padStart(2, "0");

  const fallbackDeals: ProductData[] = [
    {
      id: "1",
      name: "Wireless Noise Cancelling Headphones Pro",
      categoryId: "1",
      price: 2999,
      compareAtPrice: 5999,
      imageUrls: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
    },
    {
      id: "2",
      name: "Smart Watch Ultra Titanium 49mm",
      categoryId: "1",
      price: 4499,
      compareAtPrice: 8999,
      imageUrls: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"],
    },
    {
      id: "3",
      name: "Ergonomic Mechanical Wireless Gaming Keyboard",
      categoryId: "1",
      price: 3499,
      compareAtPrice: 6999,
      imageUrls: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"],
    },
    {
      id: "4",
      name: "Ultra HD 4K Action Camera 60FPS",
      categoryId: "1",
      price: 7999,
      compareAtPrice: 12999,
      imageUrls: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400"],
    },
    {
      id: "5",
      name: "Precision Wireless Gaming Mouse RGB",
      categoryId: "1",
      price: 1499,
      compareAtPrice: 2999,
      imageUrls: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400"],
    },
  ];

  const dealProducts = products.length > 0 ? products.slice(0, 5) : fallbackDeals;

  return (
    <Box className={styles.sectionCard}>
      <Box className={styles.sectionHeaderRow}>
        <Box className={styles.sectionHeaderTitleGroup}>
          <Typography component="h2" className={styles.sectionMainTitle}>
            Deals of the Day
          </Typography>
          <Chip
            icon={<TimerIcon fontSize="small" />}
            label={`${pad(timeLeft.hours)} : ${pad(timeLeft.minutes)} : ${pad(
              timeLeft.seconds,
            )} Left`}
            className={styles.timerChip}
          />
        </Box>
        <Button className={styles.viewAllBtn}>VIEW ALL</Button>
      </Box>

      <Box className={styles.productGrid}>
        {dealProducts.map((prod) => {
          const img =
            prod.images && prod.images.length > 0
              ? prod.images[0].imageUrl || prod.images[0]
              : prod.imageUrls && prod.imageUrls.length > 0
              ? prod.imageUrls[0]
              : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400";

          const discount =
            prod.compareAtPrice && Number(prod.compareAtPrice) > Number(prod.price)
              ? Math.round(
                  ((Number(prod.compareAtPrice) - Number(prod.price)) /
                    Number(prod.compareAtPrice)) *
                    100,
                )
              : 50;

          return (
            <Box key={prod.id} className={styles.productCard}>
              <Box className={styles.discountBadge}>{discount}% OFF</Box>

              <Box className={styles.productImageWrapper}>
                <Image
                  src={img}
                  alt={prod.name}
                  width={140}
                  height={140}
                  className={styles.productCardImage}
                  unoptimized
                />
              </Box>

              <Typography className={styles.productCardTitle}>
                {prod.name}
              </Typography>

              <Box className={styles.productRatingRow}>
                <Chip
                  icon={<StarIcon style={{ color: "#fff", fontSize: 12 }} />}
                  label="4.5"
                  size="small"
                  className={styles.ratingBadge}
                />
                <Typography className={styles.ratingCountText}>
                  (1,240)
                </Typography>
              </Box>

              <Box className={styles.priceGroup}>
                <Typography className={styles.currentPrice}>
                  ₹{Number(prod.price).toLocaleString("en-IN")}
                </Typography>
                <Typography className={styles.mrpPrice}>
                  ₹{Number(prod.compareAtPrice || prod.price * 2).toLocaleString(
                    "en-IN",
                  )}
                </Typography>
              </Box>

              <Button className={styles.addToCartBtn}>ADD TO CART</Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
