import type { Product } from "@/types";
import { useCart } from "@/app/contexts/cart-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
  viewType: "grid" | "list";
}

export function ProductGrid({ products, viewType }: ProductGridProps) {
  const { addItem } = useCart();

  return (
    <div
      className={
        viewType === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          : "space-y-6"
      }
    >
      {products.map((product) => (
        <div
          key={product.id}
          className={
            viewType === "list"
              ? "flex gap-6 border rounded-lg p-4 relative"
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
  );
}

function formatPrice(price: number | null | undefined) {
  if (price == null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
