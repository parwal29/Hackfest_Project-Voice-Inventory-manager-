import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ShoppingBag,
  Radio,
  BarChart3,
  Users,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Inventory", url: "/inventory", icon: Package },
  { title: "Sales", url: "/sales", icon: ShoppingCart },
  { title: "Purchase", url: "/purchase", icon: ShoppingBag },
  { title: "Channels", url: "/channels", icon: Radio },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Collaborators", url: "/collaborators", icon: Users },
  { title: "Documents", url: "/documents", icon: FileText },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-card/30 backdrop-blur-xl border-r border-border/30 flex flex-col relative z-20">
      <div className="p-6 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-blue-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-sm">I</span>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">INVENTURE</h1>
            <p className="text-xs text-muted-foreground">
              Powered By <span className="text-cyan-400 rainbow-text">agora</span>
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.url;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative group",
                "bg-card/30 backdrop-blur-sm border border-transparent",
                "hover:scale-105 hover:shadow-lg",
                isActive
                  ? "bg-primary/20 text-primary border-primary/30 shadow-lg scale-105"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:border-border/50"
              )}
            >
              {/* Radio button indicator */}
              <div className="relative flex-shrink-0">
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all",
                  isActive
                    ? "border-primary bg-primary shadow-lg shadow-primary/50"
                    : "border-muted-foreground/50 group-hover:border-foreground/50"
                )}>
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
              </div>
              <Icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className={cn(
                "font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
