"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/types";

export function useProductForm(product: Product | null) {
  const [price, setPrice] = useState(product?.price || 0);
  const [originalPrice, setOriginalPrice] = useState(
    product?.originalPrice || 0
  );
  const [discount, setDiscount] = useState(product?.discount || 0);

  useEffect(() => {
    if (originalPrice && discount) {
      const discountedPrice = originalPrice * (1 - discount / 100);
      setPrice(Number(discountedPrice.toFixed(2)));
    }
  }, [originalPrice, discount]);

  return {
    price,
    setPrice,
    originalPrice,
    setOriginalPrice,
    discount,
    setDiscount,
  };
}
