"use client";

import React, { useState, useEffect } from "react";
import { Box, Chip, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import styles from "./stepper.module.css";

const ORDER_STEPS = [
  { key: "pending", label: "Order Placed", Icon: ReceiptLongIcon },
  { key: "confirmed", label: "Confirmed", Icon: AssignmentTurnedInIcon },
  { key: "processing", label: "Processing", Icon: InventoryIcon },
  { key: "shipped", label: "Shipped", Icon: LocalShippingIcon },
  { key: "out_for_delivery", label: "Out for Delivery", Icon: TwoWheelerIcon },
  { key: "delivered", label: "Delivered", Icon: CheckCircleIcon },
];

const getStepIndex = (status?: string) => {
  if (!status) return 0;
  if (status === "completed") return ORDER_STEPS.length - 1;
  const index = ORDER_STEPS.findIndex((s) => s.key === status);
  return index >= 0 ? index : 0;
};

export default function OrderStepper({ order }: { order: any }) {
  const activeStep = getStepIndex(order?.status);
  const totalSteps = ORDER_STEPS.length - 1;
  const targetPercentage = (activeStep / totalSteps) * 100;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(targetPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [targetPercentage]);

  const isCancelled =
    order?.status === "cancelled" || order?.status === "partially_cancelled";

  if (isCancelled) {
    return (
      <Box sx={{ py: 2, display: "flex", justifyContent: "center" }}>
        <Chip
          label={
            order.status === "partially_cancelled"
              ? "PARTIALLY CANCELLED"
              : "CANCELLED"
          }
          color="error"
          sx={{ fontWeight: 700, px: 2 }}
        />
      </Box>
    );
  }

  return (
    <Box className={styles.stepperContainer}>
      <Box className={styles.trackWrapper}>
        <Box className={styles.trackBg} />
        <Box className={styles.trackFill} style={{ width: `${progress}%` }} />

        {/* <Box className={styles.truckContainer} style={{ left: `${progress}%` }}>
          <LocalShippingIcon className={styles.truckIcon} />
        </Box> */}

        <Box className={styles.stepsList}>
          {ORDER_STEPS.map((step, idx) => {
            const isCompleted = idx < activeStep;
            const isActive = idx === activeStep;
            const StepIcon = step.Icon;
            let dotClass = styles.stepDotPending;
            let labelClass = styles.stepLabel;

            if (isCompleted) {
              dotClass = `${styles.stepDot} ${styles.stepDotCompleted}`;
              labelClass = `${styles.stepLabel} ${styles.stepLabelCompleted}`;
            } else if (isActive) {
              dotClass = `${styles.stepDot} ${styles.stepDotActive}`;
              labelClass = `${styles.stepLabel} ${styles.stepLabelActive}`;
            }

            return (
              <Box key={step.key} className={styles.stepItem}>
                <Box className={dotClass}>
                  <StepIcon fontSize="small" />
                </Box>
                {/* <Typography className={labelClass}>{step.label}</Typography> */}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
