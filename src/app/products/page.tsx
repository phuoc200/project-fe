"use client";

import { useState } from "react";
import Layout from "../components/layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "../contexts/cart-context";
import { LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// This would typically come from an API
export const products = [
  {
    id: 1,
    name: "BodyTrace Blood Pressure Monitor (BT106)",
    brand: "BodyTrace",
    price: 90.0,
    originalPrice: 100.0,
    discount: 10,
    image:
      "https://thedigitalhealthstore.com/cdn/shop/products/6-1024x614.png?v=1634653872&width=1125",
    description:
      "The BodyTrace Blood Pressure Monitor (BT106) is an FDA-cleared cellular-enabled blood pressure monitor.",
  },
  {
    id: 2,
    name: "Smart Meter iBloodPressure Blood Pressure Monitor (SMBP802)",
    brand: "Smart Meter",
    price: 125.99,
    image:
      "https://thedigitalhealthstore.com/cdn/shop/products/image003_thumb_540x_298c91f9-848c-4890-82d9-eb5688044757.png?v=1634588179&width=575",
    description:
      "The Smart Meter iBloodPressure Monitor is a professional-grade blood pressure monitoring system with cellular connectivity.",
  },
  {
    id: 3,
    name: "Smart Meter iGlucose Blood Glucose Monitoring System (GM291)",
    brand: "Smart Meter",
    price: 99.0,
    originalPrice: 154.0,
    discount: 35,
    image:
      "https://thedigitalhealthstore.com/cdn/shop/files/iglucose.jpg?v=1727287980&width=1517",
    description:
      "The Smart Meter iGlucose system provides accurate blood glucose measurements with automatic data transmission.",
  },
  {
    id: 4,
    name: "BodyTrace Weight Scale (BT006)",
    brand: "BodyTrace",
    price: 199.99,
    image:
      "https://thedigitalhealthstore.com/cdn/shop/products/scale.png?v=1634654089&width=800",
    description:
      "The BodyTrace Weight Scale (BT006) is an easy-to-use weight scale that works right out of the box. This device utilizes LTE connectivity to automatically upload data after every reading, eliminating the headache of pairing Bluetooth and additional apps. The BodyTrace Weight Scale provides fast, accurate weight measurements and consistent data transmission for remote monitoring. It comes with 4 AA batteries and has a capacity of 440 pounds.In the box: BodyTrace Scale (BT006), 4 AA Batteries, User Manual",
  },
];

export default function ProductsPage() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const { addItem } = useCart();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">LTE Devices</h1>
          <p className="text-gray-600 mb-4">
            Browse the leading LTE / cellular-enabled medical devices.
          </p>
          <p className="text-gray-600">
            LTE devices automatically transmit clinical readings to patients'
            care team. No phone, tablet, or WiFi connection required.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Select defaultValue="best-selling">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best-selling">Best selling</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewType === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewType("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewType === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewType("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          className={
            viewType === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              : "space-y-6"
          }
        >
          {products.map((product) => (
            <div
              key={product.id}
              className={
                viewType === "list"
                  ? "relative flex items-center border rounded-lg p-6 gap-8"
                  : "relative h-[500px] flex flex-col"
              }
            >
              {product.discount && (
                <div className="absolute top-2 left-2 bg-[#BA0C2F] text-white text-xs font-bold px-2 py-1 rounded z-10">
                  Up to {product.discount}% off!
                </div>
              )}
              <Link
                href={`/products/${product.id}`}
                className={
                  viewType === "list" ? "w-[200px] shrink-0" : "block flex-1"
                }
              >
                <div
                  className={`aspect-square overflow-hidden rounded-lg bg-white p-4 ${
                    viewType === "list" ? "mb-0" : "mb-4"
                  }`}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={291}
                    height={291}
                    className="w-full h-full object-contain transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <div className={viewType === "list" ? "flex-1" : ""}>
                <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-medium mb-2 hover:text-blue-600 line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-semibold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => addItem({ ...product, quantity: 1 })}
                  className={`bg-black hover:bg-gray-800 ${
                    viewType === "list" ? "w-auto" : "w-full"
                  }`}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
