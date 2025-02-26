"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Minus, Plus, Share2, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/contexts/cart-context";
import type { Product } from "@/types";
import Layout from "@/app/components/layout";
import { useProduct } from "@/hooks/use-products";

function formatPrice(price: number | null | undefined) {
  if (price == null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const {
    products: relatedProducts,
    loading,
    error,
    fetchProducts,
  } = useProduct();

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      if (params?.id && !isNaN(Number(params.id))) {
        try {
          const response = await fetch(`/api/products/${params.id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          const data: Product = await response.json();
          setProduct(data);

          // Fetch related products
          fetchProducts(1);
        } catch (err) {
          console.error("Error fetching product:", err);
        }
      }
    };

    fetchProductAndRelated();
  }, [params?.id, fetchProducts]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p>{error || "Product not found"}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="relative">
            {product.discount && (
              <div className="absolute top-2 left-2 z-10 bg-[#BA0C2F] text-white text-xs font-bold px-2 py-1 rounded">
                Up to {product.discount}% off!
              </div>
            )}
            <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-white p-4">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div>
            <p className="text-gray-600 mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-baseline gap-2 mb-4">
              {product.discount ? (
                <>
                  <span className="font-semibold">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                </>
              ) : (
                <span className="font-semibold">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                className="flex-1 bg-black hover:bg-gray-800"
                onClick={() => addItem({ ...product, quantity })}
              >
                Add to cart
              </Button>
            </div>

            <Button className="w-full mb-4" variant="outline">
              Buy now with PayPal
            </Button>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-gray-600">Share:</span>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="h-5 w-5" />
              </button>
            </div>

            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="specs"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent"
                >
                  Specifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-gray-600 mb-4">{product.description}</p>
              </TabsContent>
              <TabsContent value="specs" className="mt-4">
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Technical specifications for this product will be listed
                    here.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <section className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">You may also like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="relative w-full max-w-[291px] mx-auto"
              >
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-[#BA0C2F] text-white text-xs font-bold px-2 py-1 rounded">
                    Up to {product.discount}% off!
                  </div>
                )}
                <Link href={`/products/${product.id}`} className="block">
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
                  <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                  <Link href={`/products/${product.id}`} className="flex-grow">
                    <h3 className="font-medium mb-2 hover:text-blue-600 line-clamp-2 h-12">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-baseline gap-2 mb-4">
                    {product.discount ? (
                      <>
                        <span className="font-semibold">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      </>
                    ) : (
                      <span className="font-semibold">
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
        </section>
      </div>
    </Layout>
  );
}
