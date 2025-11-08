import { DashboardCard } from "@/components/DashboardCard";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Purchase() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Purchase Orders</h1>
        <p className="text-muted-foreground mt-1">Manage your purchase orders and suppliers</p>
      </div>

      <DashboardCard>
        <div className="text-center py-12">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No purchase orders</h3>
          <p className="text-muted-foreground mb-4">Create your first purchase order</p>
          <Button>Create Purchase Order</Button>
        </div>
      </DashboardCard>
    </div>
  );
}
