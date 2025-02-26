"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, List } from "lucide-react";
import type { Product, SortOption } from "@/types";
import { ProductForm } from "@/app/components/product-form";
import { ProductAdmin } from "@/app/components/product-admin";
import { useProduct } from "@/hooks/use-products";

export default function ProductManagementPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    fetchProducts,
    loading,
    error,
    currentPage,
    totalPages,
    activeTab,
    sortBy,
    setSortBy,
    viewType,
    setViewType,
    editingProduct,
    setEditingProduct,
    handleTabChange,
    handleDelete,
    filteredAndSortedProducts,
  } = useProduct();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData: Partial<Product> = {
      id: editingProduct ? editingProduct.id : undefined,
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      brand: formData.get("brand") as string,
      category: formData.get("category") as "lte" | "scientific" | "medical",
      image: formData.get("image") as string,
      originalPrice: Number(formData.get("originalPrice")) || undefined,
      discount: Number(formData.get("discount")) || undefined,
      createdAt: editingProduct
        ? editingProduct.createdAt
        : new Date().toISOString(),
    };

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save product");
      }

      await fetchProducts(currentPage);
      setEditingProduct(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving product:", error);
      alert(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <div className="flex items-baseline gap-4 mb-4">
          <h1 className="text-4xl font-bold">Product Management</h1>
          <span className="text-gray-600">
            ({filteredAndSortedProducts.length} products)
          </span>
        </div>
      </div>

      <Tabs
        defaultValue={activeTab}
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8">
          <TabsTrigger
            value="lte"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-8 py-4"
          >
            LTE Devices
          </TabsTrigger>
          <TabsTrigger
            value="scientific"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-8 py-4"
          >
            Scientific
          </TabsTrigger>
          <TabsTrigger
            value="medical"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-8 py-4"
          >
            Medical
          </TabsTrigger>
        </TabsList>

        {["lte", "scientific", "medical"].map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
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
                    <SelectItem value="best-selling">Best selling</SelectItem>
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
                    <SelectItem value="date-asc">Date, old to new</SelectItem>
                    <SelectItem value="date-desc">Date, new to old</SelectItem>
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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditingProduct(null)}>
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingProduct ? "Edit Product" : "Add New Product"}
                      </DialogTitle>
                    </DialogHeader>
                    <ProductForm
                      product={editingProduct}
                      onSubmit={handleSubmit}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <div
                className={
                  viewType === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {filteredAndSortedProducts.map((product) => (
                  <ProductAdmin
                    key={product.id}
                    product={product}
                    viewType={viewType}
                    onEdit={(product) => {
                      setEditingProduct(product);
                      setIsDialogOpen(true);
                    }}
                    onDelete={handleDelete}
                  />
                ))}
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
  );
}
