"use client";

import type React from "react";

import { useToast } from "@/hooks/use-toast";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (cartId: number) => void;
  updateQuantity: (cartId: number, quantity: number) => void;
  clearCart: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  fetchCartItems: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const { toast } = useToast();

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Get user info to get userId
      fetch("http://localhost:5000/api/auth/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to fetch user info");
        })
        .then((data) => {
          setUserId(data.userId);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, []);

  // Fetch cart items when userId changes
  useEffect(() => {
    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  // Fetch cart items from API
  const fetchCartItems = useCallback(async () => {
    if (!isAuthenticated || !userId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        // If status is 404, set empty cart
        if (response.status === 404) {
          setItems([]);
        } else {
          console.error(
            "Failed to fetch cart items:",
            response.status,
            response.statusText
          );
        }
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setItems([]);
    }
  }, [isAuthenticated, userId]);

  const addItem = async (product: any) => {
    if (!isAuthenticated) {
      toast({
        title: "Please login",
        description: "You must be logged in to add items to cart",
        variant: "destructive",
      });
      return;
    }

    if (!userId) {
      toast({
        title: "Error",
        description: "User ID not found. Please try logging in again.",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Error",
        description: "Authentication token not found. Please log in again.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Chuẩn bị dữ liệu theo đúng định dạng CartDto
      const cartData = {
        userId: userId,
        productId: product.id,
        quantity: 1,
        name: product.name,
        price: product.price,
        image: product.image,
      };

      console.log("Sending cart data:", cartData);

      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });

      if (response.ok) {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
        // Refresh cart items after adding
        fetchCartItems();
      } else {
        const errorText = await response.text();
        console.error(
          "Failed to add item to cart:",
          response.status,
          errorText
        );
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (cartId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/remove/${cartId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // Update local state
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== cartId)
        );
        toast({
          title: "Removed from cart",
          description: "Item has been removed from your cart",
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to remove item from cart",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (cartId: number, quantity: number) => {
    if (quantity < 1) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/update/${cartId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity }),
        }
      );

      if (response.ok) {
        // Update local state
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === cartId ? { ...item, quantity } : item
          )
        );
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to update quantity",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!userId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/cart/clear/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setItems([]);
        toast({
          title: "Cart cleared",
          description: "Your cart has been cleared",
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || "Failed to clear cart",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isAuthenticated,
        setIsAuthenticated,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
