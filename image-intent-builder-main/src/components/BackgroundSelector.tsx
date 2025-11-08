import { useBackground, BackgroundType } from '@/contexts/BackgroundContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

const backgrounds: { type: BackgroundType; label: string; preview: string }[] = [
  { type: 'fantasy-landscape', label: 'Fantasy Landscape', preview: '🌲' },
  { type: 'abstract-purple', label: 'Abstract Purple', preview: '💜' },
  { type: 'gradient-dark', label: 'Dark Gradient', preview: '⚫' },
  { type: 'gradient-blue', label: 'Blue Gradient', preview: '💙' },
  { type: 'gradient-purple', label: 'Purple Gradient', preview: '💜' },
  { type: 'default', label: 'Default', preview: '🔲' },
];

export function BackgroundSelector() {
  const { background, setBackground } = useBackground();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="w-4 h-4" />
          <span>Background</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 bg-card/95 backdrop-blur-xl border-border/50">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground mb-3">Choose Background</p>
          {backgrounds.map((bg) => (
            <button
              key={bg.type}
              onClick={() => setBackground(bg.type)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                background === bg.type
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'hover:bg-secondary text-foreground'
              }`}
            >
              <span className="text-xl">{bg.preview}</span>
              <span className="text-sm">{bg.label}</span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
