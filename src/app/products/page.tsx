"use client";

import { useState, useMemo } from "react";
import Layout from "../components/layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "../contexts/cart-context";
import { LayoutGrid, List, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product, SortOption } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// This would typically come from an API
const products: Product[] = [
  {
    id: 1,
    name: "BodyTrace Blood Pressure Monitor (BT106)",
    brand: "BodyTrace",
    price: 2327808,
    originalPrice: 2586453,
    discount: 10,
    category: "lte",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20at%2004.12.04-OGPeuodkzcnG49loBCTvbUW1f9UwNH.png",
    description:
      "The BodyTrace Blood Pressure Monitor (BT106) is an FDA-cleared cellular-enabled blood pressure monitor.",
    createdAt: "2024-01-01",
  },
  {
    id: 2,
    name: "Smart Meter iBloodPressure Blood Pressure Monitor (SMBP802)",
    brand: "Smart Meter",
    price: 3258673,
    category: "lte",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20at%2004.12.04-OGPeuodkzcnG49loBCTvbUW1f9UwNH.png",
    description:
      "Professional-grade blood pressure monitoring system with cellular connectivity.",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    name: "Smart Meter iGlucose Blood Glucose Monitoring System (GM291)",
    brand: "Smart Meter",
    price: 2560589,
    originalPrice: 3983133,
    discount: 36,
    category: "scientific",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20at%2004.12.04-OGPeuodkzcnG49loBCTvbUW1f9UwNH.png",
    description:
      "Accurate blood glucose measurements with automatic data transmission.",
    createdAt: "2024-02-01",
  },
  {
    id: 4,
    name: "Transtek TeleRPM 4G Blood Pressure Monitor Gen 2",
    brand: "Transtek MioConnect",
    price: 2276079,
    category: "medical",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20at%2004.12.04-OGPeuodkzcnG49loBCTvbUW1f9UwNH.png",
    description: "Next-generation blood pressure monitor with 4G connectivity.",
    createdAt: "2024-02-15",
  },
  // Additional products for other categories
  {
    id: 5,
    name: "Advanced Microscope Kit",
    brand: "Scientific Pro",
    price: 4500000,
    category: "scientific",
    image: "/placeholder.svg",
    description: "Professional microscope kit for scientific research.",
    createdAt: "2024-02-10",
  },
  {
    id: 6,
    name: "Medical Diagnostic Kit",
    brand: "MedTech",
    price: 3200000,
    category: "medical",
    image: "/placeholder.svg",
    description: "Comprehensive diagnostic kit for medical professionals.",
    createdAt: "2024-02-05",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductsPage() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("best-selling");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("lte");
  const { addItem } = useCart();

  // Get unique brands for the active category
  const brands = useMemo(() => {
    const categoryProducts = products.filter(
      (product) => product.category === activeTab
    );
    return [...new Set(categoryProducts.map((product) => product.brand))];
  }, [activeTab]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) => product.category === activeTab);

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "alphabetically-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alphabetically-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "date-asc":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "date-desc":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    return result;
  }, [activeTab, selectedBrands, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Reset selected brands when changing tabs
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedBrands([]);
    setSortBy("best-selling"); // Reset sorting when changing tabs
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex items-baseline gap-4 mb-4">
            <h1 className="text-5xl font-semibold">
              {activeTab === "lte" && "LTE Devices"}
              {activeTab === "scientific" && "Scientific Instruments"}
              {activeTab === "medical" && "Medical Equipment"}
            </h1>
            <span className="text-gray-600">
              ({filteredAndSortedProducts.length} products)
            </span>
          </div>
          {activeTab === "lte" && (
            <>
              <p className="text-base text-gray-600">
                Browse the leading LTE / cellular-enabled medical devices.
              </p>
              <p className="text-gray-600 mt-2">
                LTE devices automatically transmit clinical readings to
                patients' care team. No phone, tablet, or WiFi connection
                required.
              </p>
            </>
          )}
          {activeTab === "scientific" && (
            <>
              <p className="text-base text-gray-600">
                Explore our range of cutting-edge scientific instruments.
              </p>
              <p className="text-gray-600 mt-2">
                High-precision tools for research, analysis, and experimentation
                across various scientific disciplines.
              </p>
            </>
          )}
          {activeTab === "medical" && (
            <>
              <p className="text-base text-gray-600">
                Discover our comprehensive selection of medical equipment.
              </p>
              <p className="text-gray-600 mt-2">
                State-of-the-art devices and tools for diagnosis, treatment, and
                patient care in healthcare settings.
              </p>
            </>
          )}
        </div>

        <Tabs
          defaultValue="lte"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="w-full justify-start border-b text-[#2a2b2a] rounded-none h-auto p-0 bg-transparent mb-8">
            <TabsTrigger
              value="lte"
              className="rounded-none text-base font-semibold text-[#2a2b2a] border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-8 py-4"
            >
              LTE Devices
            </TabsTrigger>
            <TabsTrigger
              value="scientific"
              className="rounded-none text-base font-semibold text-[#2a2b2a] border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-8 py-4"
            >
              Scientific
            </TabsTrigger>
            <TabsTrigger
              value="medical"
              className="rounded-none text-base font-semibold text-[#2a2b2a] border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-8 py-4"
            >
              Medical
            </TabsTrigger>
          </TabsList>

          {["lte", "scientific", "medical"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="lg:grid lg:grid-cols-[240px_1fr] gap-8">
                {/* Desktop Filters */}
                <div className="hidden lg:block">
                  <div className="sticky top-4">
                    <h3 className="font-semibold mb-4">Brand</h3>
                    <div className="space-y-3">
                      {brands.map((brand) => (
                        <label
                          key={brand}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => toggleBrand(brand)}
                          />
                          <span>{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile Filters */}
                <div className="lg:hidden mb-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Filters
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[80vh]">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4">
                        <h3 className="font-semibold mb-4">Brand</h3>
                        <div className="space-y-3">
                          {brands.map((brand) => (
                            <label
                              key={brand}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                checked={selectedBrands.includes(brand)}
                                onCheckedChange={() => toggleBrand(brand)}
                              />
                              <span>{brand}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Select
                      value={sortBy}
                      onValueChange={(value: SortOption) => setSortBy(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="best-selling">
                          Best selling
                        </SelectItem>
                        <SelectItem value="alphabetically-asc">
                          Alphabetically, A-Z
                        </SelectItem>
                        <SelectItem value="alphabetically-desc">
                          Alphabetically, Z-A
                        </SelectItem>
                        <SelectItem value="price-asc">
                          Price, low to high
                        </SelectItem>
                        <SelectItem value="price-desc">
                          Price, high to low
                        </SelectItem>
                        <SelectItem value="date-asc">
                          Date, old to new
                        </SelectItem>
                        <SelectItem value="date-desc">
                          Date, new to old
                        </SelectItem>
                      </SelectContent>
                    </Select>

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
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        : "space-y-6"
                    }
                  >
                    {filteredAndSortedProducts.map((product) => (
                      <div
                        key={product.id}
                        className={
                          viewType === "list"
                            ? "flex gap-6 border rounded-lg p-4"
                            : "relative w-full max-w-[291px] mx-auto flex flex-col"
                        }
                      >
                        {product.discount && (
                          <div className="absolute top-2 left-2 bg-[#BA0C2F] text-white text-xs font-bold px-2 py-1 rounded z-10">
                            Up to {product.discount}% off!
                          </div>
                        )}
                        <Link
                          href={`/products/${product.id}`}
                          className={viewType === "list" ? "w-48" : "block"}
                        >
                          <div className="aspect-[291/400] mb-4 overflow-hidden rounded-lg bg-gray-100 p-4">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={291}
                              height={400}
                              className="w-full h-full object-contain transition-transform hover:scale-105"
                            />
                          </div>
                        </Link>
                        <div className="flex-1 flex flex-col">
                          <p className="text-sm text-gray-600 mb-1">
                            {product.brand}
                          </p>
                          <Link
                            href={`/products/${product.id}`}
                            className="flex-grow"
                          >
                            <h3 className="font-medium mb-2 hover:text-blue-600 line-clamp-2 h-12">
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-baseline gap-2 mb-4 h-8">
                            <span className="font-semibold">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                          <Button
                            onClick={() => addItem({ ...product, quantity: 1 })}
                            className="w-full bg-black hover:bg-gray-800"
                          >
                            Add to cart
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
