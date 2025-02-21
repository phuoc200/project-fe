"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "BodyTrace Blood Pressure Monitor (BT106)",
      brand: "BodyTrace",
      price: 99.99,
      originalPrice: 109.99,
      discount: 10,
      category: "lte",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-18%20at%2004.12.04-OGPeuodkzcnG49loBCTvbUW1f9UwNH.png",
      description:
        "The BodyTrace Blood Pressure Monitor (BT106) is an FDA-cleared cellular-enabled blood pressure monitor.",
      createdAt: "2024-01-01",
    },
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("best-selling");
  const [activeTab, setActiveTab] = useState<"lte" | "scientific" | "medical">(
    "lte"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData: Omit<Product, "id"> = {
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

    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productData } : p
        )
      );
    } else {
      // Add new product
      setProducts([...products, { id: Date.now(), ...productData }]);
    }

    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleDelete = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) => product.category === activeTab);

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
  }, [activeTab, products, sortBy]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

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
        defaultValue="lte"
        className="w-full"
        onValueChange={(value) =>
          setActiveTab(value as "lte" | "scientific" | "medical")
        }
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
                    <div className={viewType === "list" ? "w-48" : "block"}>
                      <div className="aspect-[291/400] mb-4 overflow-hidden rounded-lg bg-gray-100 p-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={291}
                          height={400}
                          className="w-full h-full object-contain transition-transform hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="text-sm text-gray-600 mb-1">
                        {product.brand}
                      </p>
                      <h3 className="font-medium mb-2 line-clamp-2 h-12">
                        {product.name}
                      </h3>
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
                      <div className="flex gap-2 mt-auto">
                        <Button
                          variant="outline"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

interface ProductFormProps {
  product: Product | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function ProductForm({ product, onSubmit }: ProductFormProps) {
  const [price, setPrice] = useState(product?.price || 0);
  const [originalPrice, setOriginalPrice] = useState(
    product?.originalPrice || 0
  );
  const [discount, setDiscount] = useState(product?.discount || 0);

  useEffect(() => {
    if (originalPrice && discount) {
      const discountedPrice = originalPrice * (1 - discount / 100);
      setPrice(Number(discountedPrice.toFixed(2)));
    }
  }, [originalPrice, discount]);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input id="name" name="name" defaultValue={product?.name} required />
      </div>
      <div>
        <Label htmlFor="originalPrice">Original Price (USD)</Label>
        <Input
          id="originalPrice"
          name="originalPrice"
          type="number"
          step="0.01"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <Label htmlFor="discount">Discount (%)</Label>
        <Input
          id="discount"
          name="discount"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </div>
      <div>
        <Label htmlFor="price">Final Price (USD)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description}
          required
        />
      </div>
      <div>
        <Label htmlFor="brand">Brand</Label>
        <Input id="brand" name="brand" defaultValue={product?.brand} required />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue={product?.category || "lte"}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lte">LTE</SelectItem>
            <SelectItem value="scientific">Scientific</SelectItem>
            <SelectItem value="medical">Medical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input id="image" name="image" defaultValue={product?.image} required />
      </div>
      <Button type="submit" className="w-full">
        {product ? "Update Product" : "Add Product"}
      </Button>
    </form>
  );
}
