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
  parseVariantAttributes,
} from "./variant-utils";
import VariantAttributeGroup from "./variant-attribute-group";
import styles from "./variant-selector.module.css";

interface VariantSelectorProps {
  variants: ProductVariantData[];
  selectedVariant?: ProductVariantData | null;
  basePrice?: number;
  onVariantChange?: (result: VariantSelectionResult) => void;
}

export default function VariantSelector({
  variants = [],
  selectedVariant,
  basePrice = 0,
  onVariantChange,
}: VariantSelectorProps) {
  const attributeMap = useMemo(
    () => extractAttributeMap(variants),
    [variants]
  );

  const [selectedAttributes, setSelectedAttributes] = useState<SelectedAttributes>(() => {
    if (selectedVariant) {
      return parseVariantAttributes(selectedVariant);
    }
    return getInitialSelectedAttributes(variants);
  });

  useEffect(() => {
    if (selectedVariant) {
      const attrs = parseVariantAttributes(selectedVariant);
      setSelectedAttributes(attrs);
    }
  }, [selectedVariant?.id, selectedVariant?.name]);

  const activeVariant = useMemo(
    () => findMatchingVariant(variants, selectedAttributes),
    [variants, selectedAttributes]
  );

  useEffect(() => {
    if (onVariantChange && activeVariant) {
      onVariantChange({
        selectedVariant: activeVariant,
        selectedAttributes,
        isAvailable: activeVariant.stockQuantity > 0,
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

  const getOptionImage = useCallback(
    (attrName: string, optionVal: string) => {
      const matched = variants.find((v) => {
        const attrs = parseVariantAttributes(v);
        return (
          String(attrs[attrName] || "").toLowerCase() ===
          String(optionVal || "").toLowerCase()
        );
      });
      return matched?.thumbnail || (matched?.images && matched.images[0]) || undefined;
    },
    [variants]
  );

  if (!variants || variants.length === 0) {
    return null;
  }

  const effectivePrice = activeVariant?.price ?? basePrice;
  const inStock = activeVariant ? activeVariant.stockQuantity > 0 : false;
  const hasMultipleAttrGroups = Object.keys(attributeMap).length > 1;

  return (
    <Box className={styles.selectorWrapper}>
      {activeVariant && (
        <Box className={styles.variantMeta}>
          <Typography className={styles.variantName}>
            Selected: {activeVariant.name}
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
            onSelectOption={(val) => handleSelectAttributeOption(attrName, val)}
            getOptionImage={(optionVal) => getOptionImage(attrName, optionVal)}
          />
        ))}
      </Box>

      {(!hasMultipleAttrGroups || variants.length > 1) && (
        <Box className={styles.directVariantsGroup}>
          <Typography className={styles.directTitle}>
            Available Product Variants ({variants.length}):
          </Typography>
          <Box className={styles.directCardsRow}>
            {variants.map((v, idx) => {
              const isSelected = activeVariant?.id
                ? activeVariant.id === v.id
                : activeVariant?.name === v.name;
              const vImg =
                v.thumbnail || (v.images && v.images[0]) || "/placeholder.png";

              return (
                <Box
                  key={v.id || idx}
                  className={`${styles.directCard} ${
                    isSelected ? styles.directCardSelected : ""
                  }`}
                  onClick={() => {
                    const attrs = parseVariantAttributes(v);
                    setSelectedAttributes(attrs);
                  }}
                >
                  <img
                    src={vImg}
                    alt={v.name}
                    className={styles.directCardImg}
                  />
                  <Typography className={styles.directCardName}>
                    {v.name}
                  </Typography>
                  <Typography className={styles.directCardPrice}>
                    ₹{Number(v.price || basePrice).toLocaleString("en-IN")}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}
