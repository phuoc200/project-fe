"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { CartItem } from "@/types";
import { formatCurrency } from "@/lib/utils";

export function ShoppingCarts() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const router = useRouter();

  // This would typically come from a global state management solution
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      productId: 1,
      name: "Anew Weight Scale",
      price: 2162274,
      quantity: 1,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20at%2008.48.42-yU23Vh6yMBlYIUK3olmToizze2HxqY.png",
    },
    // Adding more items to demonstrate scrolling
    {
      id: 2,
      productId: 2,
      name: "Digital Blood Pressure Monitor",
      price: 1500000,
      quantity: 1,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      productId: 3,
      name: "Smart Health Watch",
      price: 2000000,
      quantity: 1,
      image: "/placeholder.svg",
    },
    {
      id: 4,
      productId: 4,
      name: "Digital Thermometer",
      price: 500000,
      quantity: 1,
      image: "/placeholder.svg",
    },
  ]);

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (orderNote) {
      // const note: OrderNote = {
      //   cartId: "cart-id",
      //   note: orderNote,
      // };
      // Save note to your backend
    }
    router.push("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg p-0">
        <div className="flex flex-col h-full">
          {/* Fixed Header */}
          <div className="p-6 border-b">
            <SheetHeader className="flex flex-row items-center justify-between">
              <SheetTitle className="text-xl font-bold">Your cart</SheetTitle>
            </SheetHeader>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto py-6 px-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Your cart is empty</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatCurrency(item.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-1 border-x">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:bg-gray-100 rounded-md"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <label className="text-sm font-medium">Add order note</label>
                  <Textarea
                    placeholder="Special instructions for your order"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Fixed Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 bg-white">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="font-medium">{formatCurrency(total)}</p>
                </div>
                <p className="text-sm text-gray-600">
                  Taxes and shipping calculated at checkout.
                </p>
                <Button
                  className="w-full bg-black hover:bg-gray-800"
                  onClick={handleCheckout}
                >
                  Checkout - {formatCurrency(total)}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
