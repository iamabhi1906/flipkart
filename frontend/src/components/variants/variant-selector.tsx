"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import {
  ProductVariantData,
  SelectedAttributes,
  VariantSelectionResult,
} from "./variant-types";
import {
  extractAttributeMap,
  findMatchingVariant,
  getInitialSelectedAttributes,
} from "./variant-utils";
import VariantAttributeGroup from "./variant-attribute-group";
import styles from "./variant-selector.module.css";

interface VariantSelectorProps {
  variants: ProductVariantData[];
  basePrice?: number;
  onVariantChange?: (result: VariantSelectionResult) => void;
}

export default function VariantSelector({
  variants = [],
  basePrice = 0,
  onVariantChange,
}: VariantSelectorProps) {
  const attributeMap = useMemo(
    () => extractAttributeMap(variants),
    [variants]
  );

  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributes>(
    () => getInitialSelectedAttributes(variants)
  );

  useEffect(() => {
    setSelectedAttributes(getInitialSelectedAttributes(variants));
  }, [variants]);

  const activeVariant = useMemo(
    () => findMatchingVariant(variants, selectedAttributes),
    [variants, selectedAttributes]
  );

  useEffect(() => {
    if (onVariantChange) {
      onVariantChange({
        selectedVariant: activeVariant,
        selectedAttributes,
        isAvailable: activeVariant ? activeVariant.stockQuantity > 0 : false,
      });
    }
  }, [activeVariant, selectedAttributes, onVariantChange]);

  const handleSelectAttributeOption = useCallback(
    (attrName: string, optionValue: string) => {
      setSelectedAttributes((prev) => ({
        ...prev,
        [attrName]: optionValue,
      }));
    },
    []
  );

  if (!variants || variants.length === 0) {
    return null;
  }

  const effectivePrice = activeVariant?.price ?? basePrice;
  const inStock = activeVariant ? activeVariant.stockQuantity > 0 : false;

  return (
    <Box className={styles.selectorWrapper}>
      {activeVariant && (
        <Box className={styles.variantMeta}>
          <Typography className={styles.variantName}>
            {activeVariant.name}
          </Typography>
          <Box className={styles.priceContainer}>
            <Typography className={styles.currentPrice}>
              ₹{Number(effectivePrice).toLocaleString("en-IN")}
            </Typography>
            <Box
              className={`${styles.stockBadge} ${
                inStock ? styles.inStock : styles.outOfStock
              }`}
            >
              {inStock ? (
                <>
                  <CheckCircleIcon style={{ fontSize: 16 }} /> In Stock (
                  {activeVariant.stockQuantity} available)
                </>
              ) : (
                <>
                  <ErrorIcon style={{ fontSize: 16 }} /> Out of Stock
                </>
              )}
            </Box>
          </Box>
        </Box>
      )}

      <Box className={styles.attributesList}>
        {Object.entries(attributeMap).map(([attrName, options]) => (
          <VariantAttributeGroup
            key={attrName}
            attributeName={attrName}
            options={options}
            selectedValue={selectedAttributes[attrName] || ""}
            onSelectOption={(val) =>
              handleSelectAttributeOption(attrName, val)
            }
          />
        ))}
      </Box>
    </Box>
  );
}
