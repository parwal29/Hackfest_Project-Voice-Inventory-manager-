import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function DashboardCard({ title, children, className }: DashboardCardProps) {
  return (
    <div className={cn(
      "border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all",
      "backdrop-blur-xl bg-card/40 border-border/30",
      className
    )}>
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
