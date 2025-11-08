import { Search, Pencil, RotateCcw, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { BackgroundSelector } from "@/components/BackgroundSelector";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
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

export function AppHeader() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();

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
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 rounded-full bg-card/50 backdrop-blur-sm border-primary/30 hover:bg-card/70"
          onClick={handleUpdate}
        >
          <RotateCcw className="w-4 h-4 text-primary" />
          <span className="text-foreground">Update</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 rounded-full bg-card/50 backdrop-blur-sm border-primary/30 hover:bg-card/70"
          onClick={handleCreate}
        >
          <Pencil className="w-4 h-4 text-primary" />
          <span className="text-foreground">Create</span>
        </Button>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60 z-10" />
          <Input
            placeholder="Search"
            className={cn(
              "pl-12 pr-12 h-10 rounded-full",
              "bg-secondary/50 backdrop-blur-sm",
              "border-primary/30 focus:border-primary/60",
              "text-foreground placeholder:text-primary/50",
              "focus:ring-2 focus:ring-primary/20"
            )}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
            onClick={handleSearchSubmit}
          >
            <Search className="w-4 h-4 text-white" />
          </Button>
        </div>

        <LanguageSelector />

        <VoiceAssistant />
      </div>

      <div className="flex items-center gap-3">
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
