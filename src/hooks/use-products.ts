"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import type { Product, PaginatedProducts, SortOption } from "@/types";
export function useProduct() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("best-selling");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("lte");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/products?pageNumber=${page}&pageSize=6&category=${activeTab}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: PaginatedProducts = await response.json();
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setCurrentPage(data.pageNumber);
      } catch (err) {
        setError("Error fetching products. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [activeTab]
  );

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) => product.category === activeTab);

    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand || "")
      );
    }

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
  }, [products, selectedBrands, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedBrands([]);
    setSortBy("best-selling");
    fetchProducts(1);
  };

  const handleDelete = async (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete product");
        }

        fetchProducts(currentPage);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return {
    products,
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
    selectedBrands,
    toggleBrand,
    handleTabChange,
    handleDelete,
    filteredAndSortedProducts,
  };
}
