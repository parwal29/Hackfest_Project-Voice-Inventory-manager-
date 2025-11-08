import { useState, useEffect } from "react";
import { Moon, Sun, Palette, Droplets } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Theme = "dark" | "light" | "blue" | "green" | "glass";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme || "dark";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.removeAttribute("data-theme");
    root.classList.remove("dark");
    
    // Apply new theme
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else if (newTheme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.add("dark");
      root.setAttribute("data-theme", newTheme);
    }
  };

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  const themes = [
    { value: "dark" as Theme, label: "Dark Purple", icon: Moon },
    { value: "light" as Theme, label: "Light", icon: Sun },
    { value: "blue" as Theme, label: "Dark Blue", icon: Palette },
    { value: "green" as Theme, label: "Dark Green", icon: Palette },
    { value: "glass" as Theme, label: "Glassmorphism", icon: Droplets },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Palette className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Choose Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((t) => {
          const Icon = t.icon;
          return (
            <DropdownMenuItem
              key={t.value}
              onClick={() => changeTheme(t.value)}
              className={theme === t.value ? "bg-accent" : ""}
            >
              <Icon className="w-4 h-4 mr-2" />
              {t.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
