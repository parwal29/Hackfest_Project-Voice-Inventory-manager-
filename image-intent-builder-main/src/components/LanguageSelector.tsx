import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Language = 'en' | 'hi' | 'ja' | 'es' | 'fr' | 'de';

const languages: { code: Language; name: string; native: string; flag: string }[] = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
];

export function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('ja');

  const currentLang = languages.find(lang => lang.code === selectedLanguage) || languages[2];

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    // Store in localStorage
    localStorage.setItem('preferred-language', lang);
    // You can add i18n logic here
    console.log('Language changed to:', lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 rounded-full bg-card/50 backdrop-blur-sm border-orange-500/50 text-orange-500",
            "hover:bg-orange-500/10 transition-all duration-300 hover:scale-105"
          )}
        >
          <Languages className="w-4 h-4" />
          <span className="font-medium">{currentLang.code.toUpperCase()}</span>
          <span className="text-xs">{currentLang.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-card/95 backdrop-blur-xl border-border/50 min-w-[200px]"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={cn(
              "flex items-center gap-3 cursor-pointer transition-all",
              selectedLanguage === lang.code && "bg-primary/20 text-primary"
            )}
          >
            <span className="text-xl">{lang.flag}</span>
            <div className="flex-1">
              <div className="font-medium">{lang.name}</div>
              <div className="text-xs text-muted-foreground">{lang.native}</div>
            </div>
            {selectedLanguage === lang.code && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
