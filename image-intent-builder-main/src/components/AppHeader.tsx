import { Search, Pencil, RotateCcw, User, LogOut, Bell, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { BackgroundSelector } from "@/components/BackgroundSelector";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import { useInventory } from "@/contexts/InventoryContext";
import { handleUpdate, handleCreate } from "@/lib/actions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AppHeader() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const { alerts, markAlertAsRead, deleteAlert } = useInventory();
  const unreadAlerts = alerts.filter(alert => !alert.read);

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      // Navigate to search results or perform search
      toast({
        title: "Search",
        description: `Searching for: ${searchTerm}`,
      });
      // You can add actual search functionality here
      console.log('Searching for:', searchTerm);
    }
  };

  return (
    <header className="h-20 border-b border-border/30 bg-card/30 backdrop-blur-xl px-6 flex items-center justify-between relative z-20">
      <div className="flex items-center gap-4 flex-1">
        <LanguageSelector />

        <VoiceAssistant />
      </div>

      <div className="flex items-center gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "relative rounded-full bg-card/50 backdrop-blur-sm border-primary/30",
                "hover:bg-card/70 transition-all duration-300 hover:scale-110",
                unreadAlerts.length > 0 && "animate-pulse"
              )}
            >
              <Bell className="w-4 h-4 text-primary" />
              {unreadAlerts.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-bounce"
                >
                  {unreadAlerts.length > 9 ? '9+' : unreadAlerts.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-card/95 backdrop-blur-xl border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-foreground">Alerts</h4>
              {unreadAlerts.length > 0 && (
                <Badge variant="destructive">{unreadAlerts.length} new</Badge>
              )}
            </div>
            <ScrollArea className="h-[300px]">
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No alerts
                </div>
              ) : (
                <div className="space-y-2">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={cn(
                        "p-3 rounded-lg border transition-all hover:scale-[1.02] cursor-pointer",
                        !alert.read && "bg-orange-500/10 border-orange-500/30",
                        alert.read && "bg-secondary/50 border-border/30 opacity-60"
                      )}
                      onClick={() => markAlertAsRead(alert.id)}
                    >
                      <div className="flex items-start gap-2">
                        <AlertTriangle
                          className={cn(
                            "w-4 h-4 mt-0.5 flex-shrink-0",
                            alert.severity === 'high' && "text-red-500",
                            alert.severity === 'medium' && "text-orange-500",
                            alert.severity === 'low' && "text-yellow-500"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {alert.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(alert.createdAt).toLocaleString()}
                          </p>
                        </div>
                        {!alert.read && (
                          <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-1.5 animate-pulse" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </PopoverContent>
        </Popover>
        <BackgroundSelector />
        <ThemeSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="text-sm font-medium text-foreground">
                {user?.name || 'User'}
              </span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center ring-2 ring-cyan-400/30 shadow-lg hover:scale-110 transition-transform cursor-pointer">
                <User className="w-5 h-5 text-white" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-xl border-border/50">
            <DropdownMenuItem className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer text-destructive"
              onClick={() => {
                logout();
                navigate('/auth');
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
