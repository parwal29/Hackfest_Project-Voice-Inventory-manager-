import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardCard } from '@/components/DashboardCard';
import { Sparkles, TrendingUp, Package, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AISummaryCardProps {
  totalSales?: number;
  itemsSold?: number;
  revenue?: number;
}

export function AISummaryCard({ totalSales = 0, itemsSold = 0, revenue = 0 }: AISummaryCardProps) {
  const { t } = useTranslation();
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  const summaryData = [
    { icon: TrendingUp, label: t('totalSales'), value: totalSales, change: '+12.5%', positive: true },
    { icon: Package, label: t('itemsSold'), value: itemsSold, change: '+8.2%', positive: true },
    { icon: DollarSign, label: t('revenue'), value: revenue, change: '+15.3%', positive: true },
  ];

  useEffect(() => {
    setIsVisible(true);
    // Animate numbers
    const intervals = summaryData.map((_, index) => {
      const target = summaryData[index].value;
      let current = 0;
      const increment = target / 50;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = Math.floor(current);
          return newValues;
        });
      }, 30);
      return interval;
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, [totalSales, itemsSold, revenue]);

  const formatValue = (index: number) => {
    if (index === 0) return `$${animatedValues[0].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (index === 1) return animatedValues[1].toLocaleString();
    return `$${animatedValues[2].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <DashboardCard 
      title={
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span>AI Based Summary</span>
        </div>
      } 
      className={cn(
        "backdrop-blur-xl bg-card/30 border-border/30",
        "hover:shadow-2xl transition-all duration-500",
        isVisible && "animate-in fade-in slide-in-from-bottom-4"
      )}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summaryData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                  className={cn(
                    "p-4 rounded-lg backdrop-blur-sm bg-gradient-to-br from-primary/10 to-accent/10",
                    "border border-primary/20 hover:border-primary/40",
                    "transition-all duration-300 hover:scale-105 hover:shadow-lg interactive",
                    isVisible && "animate-in fade-in"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    item.positive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  )}>
                    {item.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {formatValue(index)}
                </div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            );
          })}
        </div>
        
        <div           className={cn(
            "mt-4 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10",
            "border border-purple-500/20 backdrop-blur-sm",
            "transition-all duration-300 hover:scale-[1.02] interactive",
            isVisible && "animate-in fade-in"
          )}
          style={{ animationDelay: '300ms' }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">AI Insights</h4>
              <p className="text-sm text-muted-foreground">
                Your inventory performance is excellent this month. Top-selling categories show 
                consistent growth. Consider restocking popular items to maintain momentum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
