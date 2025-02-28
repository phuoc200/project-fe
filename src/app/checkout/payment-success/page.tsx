"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const confirmOrder = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/order/payment/success?token=${token}`
          );
          if (response.ok) {
            toast({
              title: "Payment Successful",
              description:
                "Your order has been confirmed and is being processed.",
            });
          } else {
            throw new Error("Payment confirmation failed");
          }
        } catch (error) {
          console.error("Error confirming payment:", error);
          toast({
            title: "Payment Confirmation Failed",
            description:
              "There was an error confirming your payment. Please contact support.",
            variant: "destructive",
          });
        }
      }
    };

    confirmOrder();
  }, [toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="mb-4">
          Your order has been received and is being processed.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
