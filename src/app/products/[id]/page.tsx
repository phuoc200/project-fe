"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Layout from "../../components/layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Minus, Plus, Share2, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "../page";
import { useCart } from "@/app/contexts/cart-context";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<(typeof products)[0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === Number(params.id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [params.id]);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p>Product not found</p>
        </div>
      </Layout>
    );
  }

  const relatedProducts = products.filter((p) => p.id !== product.id);

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
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white"
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
              Buy now with ShopPay
            </Button>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm text-gray-600">Share:</span>
              <button className="p-2 hover:bg-white rounded-full">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-white rounded-full">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-white rounded-full">
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
          <h2 className="text-2xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="relative h-[500px] flex flex-col"
              >
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-[#BA0C2F] text-white text-xs font-bold px-2 py-1 rounded">
                    Up to {product.discount}% off!
                  </div>
                )}
                <Link href={`/products/${product.id}`} className="block flex-1">
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-white p-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={291}
                      height={291}
                      className="w-full h-full object-contain transition-transform hover:scale-105"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
                  <h3 className="font-medium mb-2 hover:text-blue-600 line-clamp-2">
                    {product.name}
                  </h3>
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
                </Link>
                <Button
                  onClick={() => addItem({ ...product, quantity: 1 })}
                  className="w-full bg-black hover:bg-gray-800"
                >
                  Add to cart
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
