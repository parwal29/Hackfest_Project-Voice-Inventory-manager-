import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useInventory } from "@/contexts/InventoryContext";
import { DashboardCard } from "@/components/DashboardCard";
import { AISummaryCard } from "@/components/AISummaryCard";
import { Button } from "@/components/ui/button";
import { ChevronDown, Lock, MessageCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { cn } from "@/lib/utils";

const COLORS = ["#8b5cf6", "#10b981", "#f59e0b", "#3b82f6", "#f97316", "#ec4899"];

export default function Dashboard() {
  const { t } = useTranslation();
  const { getStats, items } = useInventory();
  const stats = getStats();
  
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    // Update pie chart data from actual inventory
    const categoryData = Object.entries(stats.categories).map(([name, value]) => ({
      name,
      value: value as number,
    }));
    setPieData(categoryData.length > 0 ? categoryData : [
      { name: "No Categories", value: 1 }
    ]);
  }, [stats.categories]);

  // Calculate sales data from inventory (simulated)
  const totalSales = items.reduce((sum, item) => sum + (item.quantity * item.price * 0.3), 0);
  const itemsSold = Math.floor(items.reduce((sum, item) => sum + (item.quantity * 0.2), 0));
  const revenue = totalSales * 0.7;
  return (
    <div className="p-6 space-y-6 relative z-10 animate-in fade-in duration-500">
      <AISummaryCard 
        totalSales={totalSales}
        itemsSold={itemsSold}
        revenue={revenue}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard 
          title="Inventory Categories" 
          className={cn(
            "backdrop-blur-xl bg-card/30 border-border/30",
            "hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
          )}
        >
          {pieData.length > 0 && pieData[0].name !== "No Categories" ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1000}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No categories yet. Add items to see category distribution.
            </div>
          )}
        </DashboardCard>

        <div className="grid grid-cols-2 gap-4">
          <DashboardCard className={cn(
            "backdrop-blur-xl border-border/30",
            "bg-gradient-to-br from-green-400/20 to-green-600/20",
            "border-green-500/30",
            "hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer interactive",
            "animate-in fade-in slide-in-from-bottom"
          )}
          style={{ animationDelay: '200ms' }}
          >
            <div className="aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform">
                  <div className="flex gap-1">
                    <div className="w-8 h-12 bg-gradient-to-b from-gray-300 to-gray-400 rounded-md shadow-lg animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-8 h-12 bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-md shadow-lg -ml-2 animate-pulse" style={{ animationDelay: '150ms' }}></div>
                  </div>
                </div>
                <p className="text-sm font-medium text-green-400">Top Selling Product</p>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard className={cn(
            "backdrop-blur-xl border-border/30",
            "bg-gradient-to-br from-purple-500/20 to-blue-500/20",
            "border-purple-500/30",
            "hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer interactive",
            "animate-in fade-in slide-in-from-bottom"
          )}
          style={{ animationDelay: '300ms' }}
          >
            <div className="aspect-square flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <span className="text-foreground font-medium">Overview</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground animate-bounce" />
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Button 
          variant="outline" 
          className={cn(
            "gap-2 backdrop-blur-sm bg-card/30 border-border/30",
            "hover:bg-card/50 hover:scale-105 transition-all duration-300",
            "hover:shadow-lg interactive"
          )}
        >
          <span>UPI (BHIM)</span>
          <ChevronDown className="w-4 h-4" />
        </Button>

        <Button 
          variant="outline" 
          className={cn(
            "gap-2 backdrop-blur-sm bg-card/30 border-border/30",
            "hover:bg-card/50 hover:scale-105 transition-all duration-300",
            "hover:shadow-lg interactive"
          )}
        >
          <Lock className="w-4 h-4 text-primary" />
          <span>Access & Controls</span>
        </Button>

        <Button 
          variant="outline" 
          className={cn(
            "gap-2 backdrop-blur-sm bg-card/30 border-border/30",
            "hover:bg-card/50 hover:scale-105 transition-all duration-300",
            "hover:shadow-lg interactive"
          )}
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
          <span>WhatsApp Business</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-center text-xs text-muted-foreground pt-4">
        Version 0000 | All Right Reserved
      </div>
    </div>
  );
}
