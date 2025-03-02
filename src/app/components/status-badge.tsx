import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types";

export const getStatusBadge = (status: string) => {
  switch (status.toLowerCase() as OrderStatus) {
    case "delivered":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">• Delivered</Badge>
      );
    case "pending":
      return (
        <Badge className="bg-orange-500 hover:bg-orange-600">• Pending</Badge>
      );
    case "canceled":
      return <Badge className="bg-red-500 hover:bg-red-600">• Canceled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
