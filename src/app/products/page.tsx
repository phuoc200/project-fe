"use client";

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
import { LayoutGrid, List, ChevronDown } from "lucide-react";
import type { SortOption } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductGrid } from "../components/product-grid";
import { useProduct } from "@/hooks/use-products";

export default function ProductsPage() {
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    activeTab,
    sortBy,
    setSortBy,
    fetchProducts,
    viewType,
    setViewType,
    selectedBrands,
    toggleBrand,
    handleTabChange,
    filteredAndSortedProducts,
  } = useProduct();

  const brands = [
    ...new Set(
      products
        .filter((product) => product.category === activeTab)
        .map((product) => product.brand)
    ),
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
                patients&apos; care team. No phone, tablet, or WiFi connection
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
          defaultValue={activeTab}
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
                <div className="hidden lg:block border-r border-gray-200">
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

                  <ProductGrid
                    products={filteredAndSortedProducts}
                    viewType={viewType}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => fetchProducts(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => fetchProducts(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </Layout>
  );
}
