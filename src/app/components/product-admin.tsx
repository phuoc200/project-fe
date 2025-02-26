import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

interface ProductAdminProps {
  product: Product;
  viewType: "grid" | "list";
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export function ProductAdmin({
  product,
  viewType,
  onEdit,
  onDelete,
}: ProductAdminProps) {
  return (
    <div
      className={
        viewType === "list"
          ? "flex gap-6 border rounded-lg p-4 relative overflow-hidden"
          : "relative w-full max-w-[291px] mx-auto flex flex-col overflow-hidden"
      }
    >
      {product.discount && (
        <div className="absolute top-2 left-2 bg-[#BA0C2F] text-white text-xs font-bold px-2 py-1 rounded z-10">
          Up to {product.discount}% off!
        </div>
      )}
      <div className={viewType === "list" ? "w-48 relative" : "block relative"}>
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
        <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
        <h3 className="font-medium mb-2 line-clamp-2 h-12">{product.name}</h3>
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
        <div className="flex gap-2 mt-auto">
          <Button variant="outline" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(product.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
