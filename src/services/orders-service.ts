import { fetchClient } from "@/lib/fetch-client";

// Types for the orders API
export interface Product {
  name: string;
  quantity: number;
}

export interface Order {
  orderId: number;
  orderDate: string;
  customerName: string;
  totalAmount: number;
  status: string;
  products: Product[];
}

// Orders service for interacting with the API
export const ordersService = {
  // Get all orders for a user
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return fetchClient(`/order/${userId}`);
  },

  // Get a single order by ID
  async getOrderById(orderId: number): Promise<Order> {
    return fetchClient(`/api/orders/detail/${orderId}`);
  },

  // Update order status
  async updateOrderStatus(orderId: number, status: string): Promise<void> {
    await fetchClient(`/api/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
  },
};
