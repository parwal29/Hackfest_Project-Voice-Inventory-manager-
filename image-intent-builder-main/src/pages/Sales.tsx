import { DashboardCard } from "@/components/DashboardCard";
import { ShoppingCart, TrendingUp, DollarSign, Package } from "lucide-react";

export default function Sales() {
  const stats = [
    { label: "Total Sales", value: "$45,231", icon: DollarSign, color: "text-accent" },
    { label: "Orders", value: "1,234", icon: ShoppingCart, color: "text-primary" },
    { label: "Growth", value: "+12.5%", icon: TrendingUp, color: "text-success" },
    { label: "Products Sold", value: "3,456", icon: Package, color: "text-warning" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
        <p className="text-muted-foreground mt-1">Track your sales performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <DashboardCard key={stat.label}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <Icon className={`w-10 h-10 ${stat.color}`} />
              </div>
            </DashboardCard>
          );
        })}
      </div>

      <DashboardCard title="Recent Sales">
        <div className="text-center py-8 text-muted-foreground">
          Sales data will appear here
        </div>
      </DashboardCard>
    </div>
  );
}
