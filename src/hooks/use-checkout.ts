"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/contexts/cart-context";

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  country: string;
  phone: string;
  paymentMethod: "cod" | "paypal";
}

export const useCheckout = () => {
  const [form, setForm] = useState<CheckoutForm>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "Vietnam",
    phone: "",
    paymentMethod: "cod",
  });

  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleCheckout = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast({
            title: "Error",
            description: "You must be logged in to checkout",
            variant: "destructive",
          });
          return;
        }

        // Get userId from token or user context
        const userInfo = await fetch(
          "http://localhost:5000/api/auth/userinfo",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ).then((res) => res.json());

        const response = await fetch(
          "http://localhost:5000/api/order/checkout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId: userInfo.userId,
              // Include other necessary data from the form
              ...form,
              items: items,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Checkout failed");
        }

        const data = await response.json();

        if (form.paymentMethod === "paypal") {
          // Redirect to PayPal
          window.location.href = data.paymentUrl;
        } else {
          // COD or other payment methods
          toast({
            title: "Order placed successfully",
            description:
              "Your order has been placed and will be processed soon.",
          });
          clearCart();
          router.push("checkout/payment-success");
        }
      } catch (error) {
        console.error("Checkout error:", error);
        toast({
          title: "Checkout failed",
          description:
            "There was an error processing your order. Please try again.",
          variant: "destructive",
        });
      }
    },
    [form, items, clearCart, router, toast]
  );

  return {
    form,
    setForm,
    items,
    subtotal,
    shipping,
    total,
    handleCheckout,
  };
};
