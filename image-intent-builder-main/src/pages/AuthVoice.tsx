import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Mic, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export function AuthVoice() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleVoiceRegister = async () => {
    // Create a guest session or login as guest
    await login('guest@inventure.com', 'guest');
    // Navigate to voice call interface
    navigate('/voice-call');
  };

  const handleRegisterNow = () => {
    // Navigate to classic auth page
    navigate('/auth-classic');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-orange-950">
        <div className="absolute inset-0 bg-fantasy-landscape opacity-30" />
        <div className="absolute inset-0 backdrop-blur-sm bg-black/10" />
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => {
        const size = Math.floor(Math.random() * 4) + 2;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 animate-float"
            style={{
              width: `${size * 8}px`,
              height: `${size * 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        );
      })}

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 via-blue-500 to-yellow-500 flex items-center justify-center shadow-lg">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-white font-bold text-sm">I</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">INVENTURE</h1>
            <p className="text-xs text-gray-300">
              Powered By <span className="text-cyan-400 rainbow-text">agora</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="bg-card/30 backdrop-blur-sm border-border/30 text-white hover:bg-card/50"
            onClick={() => setIsGuest(!isGuest)}
          >
            Guest User
          </Button>
          <div className="w-10 h-10 rounded-full bg-black border-2 border-yellow-400 flex items-center justify-center">
            <User className="w-5 h-5 text-yellow-400" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Card - Intro Video */}
          <div
            className={cn(
              "backdrop-blur-xl bg-card/20 border border-white/20 rounded-2xl p-8",
              "min-h-[400px] flex flex-col justify-center items-center",
              "animate-in fade-in slide-in-from-left duration-700"
            )}
          >
            <h2 className="text-2xl font-bold text-black mb-4">INTRO VIDEO</h2>
            <p className="text-black text-center mb-4">LIKE HARRY POTTER NEWS</p>
            <p className="text-black text-center">PAPER</p>
            <div className="mt-8 w-full">
              <Button
                onClick={handleVoiceRegister}
                className={cn(
                  "w-full py-6 bg-black border-2 border-yellow-400 text-white",
                  "hover:bg-gray-900 hover:border-yellow-300",
                  "text-lg font-semibold transition-all duration-300",
                  "hover:scale-105 shadow-2xl"
                )}
              >
                Click To Register With <span className="text-blue-400 ml-1">VOICE</span>
              </Button>
            </div>
          </div>

          {/* Right Card - Features */}
          <div
            className={cn(
              "backdrop-blur-xl bg-card/20 border border-white/20 rounded-2xl p-8",
              "min-h-[400px] flex flex-col justify-center items-center",
              "animate-in fade-in slide-in-from-right duration-700"
            )}
          >
            <h2 className="text-2xl font-bold text-black mb-8">FEATURES</h2>
            <div className="w-full flex justify-end">
              <Button
                onClick={handleRegisterNow}
                className={cn(
                  "bg-gray-800 hover:bg-gray-700 text-white px-8 py-6",
                  "transition-all duration-300 hover:scale-105"
                )}
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>

        {/* Center Microphone Icon */}
        <div className="flex flex-col items-center justify-center mt-12 space-y-4">
          <div className="relative w-24 h-24">
            {/* Rainbow gradient border using box-shadow */}
            <div
              className={cn(
                "absolute inset-0 rounded-full",
                "animate-in zoom-in duration-1000 delay-500"
              )}
              style={{
                background: 'conic-gradient(from 0deg, #ef4444 0%, #f59e0b 20%, #10b981 40%, #3b82f6 60%, #8b5cf6 80%, #ef4444 100%)',
                padding: '3px',
              }}
            >
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                  <Mic className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-white italic text-sm">Powered By</p>
            <span className="text-cyan-400 text-2xl font-bold rainbow-text">agora</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-auto py-6">
        <div className="backdrop-blur-xl bg-card/20 border-t border-white/20">
          <div className="container mx-auto px-6 text-center">
            <p className="text-white text-sm">
              National Forensic Sciences University (Delhi Campus)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
