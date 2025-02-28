import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, "MMM do, yyyy");
  } catch (error) {
    return dateString;
  }
};

export const formatPrice = (price: number | null | undefined) => {
  if (price == null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
