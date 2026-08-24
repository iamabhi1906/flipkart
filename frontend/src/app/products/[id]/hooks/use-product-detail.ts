"use client";

import { useState, useEffect } from "react";
import { getProduct, ProductData, ProductVariantData } from "@/services/product.service";

export function useProductDetail(productId: string) {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantData | null>(null);

  useEffect(() => {
    if (!productId) return;
    async function load() {
      setLoading(true);
      try {
        const data = await getProduct(productId);
        setProduct(data);

        const imgs = data.images && data.images.length > 0
          ? data.images.map((i: any) => i.imageUrl || i)
          : data.imageUrls || [];
        if (imgs.length > 0) {
          setSelectedImage(imgs[0]);
        }

        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [productId]);

  const displayPrice = selectedVariant?.price ? Number(selectedVariant.price) : Number(product?.price || 0);
  const effectiveStock = product?.variants && product.variants.length > 0
    ? selectedVariant
      ? Number(selectedVariant.stockQuantity || 0)
      : product.variants.reduce((sum, v) => sum + Number(v.stockQuantity || 0), 0)
    : Number(product?.effectiveStockQuantity ?? product?.stockQuantity ?? 0);

  return {
    product,
    loading,
    selectedImage,
    setSelectedImage,
    selectedVariant,
    setSelectedVariant,
    displayPrice,
    effectiveStock,
  };
}
