"use client";

import { useState, useEffect } from "react";
import { getProducts, ProductData } from "@/services/product.service";

export function useHomeProducts() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 18 });

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await getProducts({ limit: 10 });
        const list = Array.isArray(data) ? data : data?.items || data?.data || [];
        setProducts(list);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return {
    products,
    loading,
    timeLeft,
  };
}
