import type React from "react";
import { useProductForm } from "@/hooks/use-product-form";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
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

interface ProductFormProps {
  product: Product | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const {
    price,
    setPrice,
    originalPrice,
    setOriginalPrice,
    discount,
    setDiscount,
  } = useProductForm(product);

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
          defaultValue={product?.description ?? ""}
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
