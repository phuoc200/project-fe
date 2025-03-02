"use client";

import { Order } from "@/types";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export const useOrders = (userId?: number) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async (id?: number) => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/order/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    }
  }, [userId, fetchOrders]);

  return {
    orders,
    loading,
    fetchOrders,
  };
};
