import { DashboardCard } from "@/components/DashboardCard";
import { Radio, Globe, Store, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Channels() {
  const channels = [
    { name: "Online Store", icon: Globe, status: "Active", color: "text-accent" },
    { name: "Mobile App", icon: Smartphone, status: "Active", color: "text-primary" },
    { name: "Physical Store", icon: Store, status: "Inactive", color: "text-muted-foreground" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Sales Channels</h1>
        <p className="text-muted-foreground mt-1">Manage your distribution channels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <DashboardCard key={channel.name}>
              <div className="text-center">
                <Icon className={`w-12 h-12 mx-auto mb-3 ${channel.color}`} />
                <h3 className="text-lg font-semibold text-foreground mb-1">{channel.name}</h3>
                <p className={`text-sm ${channel.status === 'Active' ? 'text-accent' : 'text-muted-foreground'}`}>
                  {channel.status}
                </p>
              </div>
            </DashboardCard>
          );
        })}
      </div>

      <DashboardCard>
        <div className="text-center py-8">
          <Radio className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Connect More Channels</h3>
          <p className="text-muted-foreground mb-4">Expand your reach by adding new sales channels</p>
          <Button>Add Channel</Button>
        </div>
      </DashboardCard>
    </div>
  );
}
