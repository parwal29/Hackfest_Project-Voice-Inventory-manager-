import { ReactNode } from 'react';
import { useBackground } from '@/contexts/BackgroundContext';
import { cn } from '@/lib/utils';

interface BackgroundWrapperProps {
  children: ReactNode;
}

export function BackgroundWrapper({ children }: BackgroundWrapperProps) {
  const { background } = useBackground();

  const backgroundClasses = {
    'default': 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    'fantasy-landscape': 'bg-fantasy-landscape',
    'abstract-purple': 'bg-abstract-purple',
    'gradient-dark': 'bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950',
    'gradient-blue': 'bg-gradient-to-br from-blue-950 via-purple-900 to-indigo-950',
    'gradient-purple': 'bg-gradient-to-br from-purple-950 via-pink-900 to-purple-950',
  };

  return (
    <div className={cn(
      'fixed inset-0 transition-all duration-500',
      backgroundClasses[background]
    )}>
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 h-full w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
