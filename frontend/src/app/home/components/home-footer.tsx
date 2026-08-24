"use client";

import React from "react";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import styles from "../home.module.css";

export default function HomeFooter() {
  return (
    <Box component="footer" className={styles.footerContainer}>
      <Box className={styles.footerWrapper}>
        <Box className={styles.footerGrid}>
          <Box>
            <Typography className={styles.footerColTitle}>ABOUT</Typography>
            <Link href="#" className={styles.footerLink}>
              Contact Us
            </Link>
            <Link href="#" className={styles.footerLink}>
              About Flipkart
            </Link>
            <Link href="#" className={styles.footerLink}>
              Careers
            </Link>
            <Link href="#" className={styles.footerLink}>
              Press Stories
            </Link>
            <Link href="#" className={styles.footerLink}>
              Corporate Info
            </Link>
          </Box>

          <Box>
            <Typography className={styles.footerColTitle}>HELP</Typography>
            <Link href="#" className={styles.footerLink}>
              Payments
            </Link>
            <Link href="#" className={styles.footerLink}>
              Shipping
            </Link>
            <Link href="#" className={styles.footerLink}>
              Cancellation & Returns
            </Link>
            <Link href="#" className={styles.footerLink}>
              FAQ & Support
            </Link>
          </Box>

          <Box>
            <Typography className={styles.footerColTitle}>
              CONSUMER POLICY
            </Typography>
            <Link href="#" className={styles.footerLink}>
              Return Policy
            </Link>
            <Link href="#" className={styles.footerLink}>
              Terms Of Use
            </Link>
            <Link href="#" className={styles.footerLink}>
              Security
            </Link>
            <Link href="#" className={styles.footerLink}>
              Privacy Policy
            </Link>
            <Link href="#" className={styles.footerLink}>
              Sitemap
            </Link>
          </Box>

          <Box>
            <Typography className={styles.footerColTitle}>
              SELLER HUB
            </Typography>
            <Link href="/become-seller" className={styles.footerLink}>
              Become a Seller
            </Link>
            <Link href="/vendor" className={styles.footerLink}>
              Vendor Dashboard
            </Link>
            <Link href="#" className={styles.footerLink}>
              Advertise on Platform
            </Link>
            <Link href="#" className={styles.footerLink}>
              Seller Learning Center
            </Link>
          </Box>

          <Box>
            <Typography className={styles.footerColTitle}>
              REGISTERED OFFICE
            </Typography>
            <Typography style={{ color: "#fff", lineHeight: 1.6 }}>
              Flipkart Internet Private Limited, <br />
              Buildings Alyssa, Begonia & Clove Embassy Tech Village, <br />
              Outer Ring Road, Devarabeesanahalli Village, <br />
              Bengaluru, 560103, Karnataka, India.
            </Typography>
          </Box>
        </Box>

        <Box className={styles.footerBottomRow}>
          <Typography style={{ color: "#ffffff", fontSize: "12px" }}>
            © 2026 Flipkart Clone. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
