import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Agora AI Voice Assistant Integration
// Navigates to voice call interface
export function VoiceAssistant() {
  const navigate = useNavigate();

  const handleVoiceCall = () => {
    navigate('/voice-call');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 rounded-full bg-card/50 backdrop-blur-sm border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 hover:scale-105"
      onClick={handleVoiceCall}
    >
      <span className="rainbow-text">XyroAi</span>
      <Mic className="w-4 h-4 text-yellow-500" />
    </Button>
  );
}
