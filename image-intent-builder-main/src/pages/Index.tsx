import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Package, Mic, TrendingUp, Shield, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Index() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      icon: Package,
      title: 'Smart Inventory',
      description: 'Manage your inventory with AI-powered insights and real-time tracking',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Control your inventory using voice commands powered by Agora AI',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      title: 'Analytics',
      description: 'Get detailed analytics and reports on your inventory performance',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Your data is protected with enterprise-grade security',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-blue-950 to-pink-950">
        <div className="absolute inset-0 bg-fantasy-landscape opacity-50" />
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
      </div>

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => {
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

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 via-blue-500 to-yellow-500 flex items-center justify-center shadow-lg">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">INVENTURE</h1>
              <p className="text-xs text-gray-300">
                {t('poweredBy')} <span className="text-cyan-400 rainbow-text">{t('agora')}</span>
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Get Started
          </Button>
        </header>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-1000">
            <h2 className="text-5xl font-bold text-white leading-tight">
              AI-Powered Inventory Management
            </h2>
            <p className="text-xl text-gray-300">
              Manage your inventory with voice commands and AI insights. Powered by Agora AI for seamless voice interaction.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/voice-call')}
                className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 text-lg px-8"
              >
                <Mic className="w-5 h-5 mr-2" />
                Try Voice Assistant
              </Button>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right duration-1000 delay-300">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden backdrop-blur-xl bg-card/20 border border-white/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl animate-pulse">
                    <Package className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-white font-semibold">Inventory Management</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  "backdrop-blur-xl bg-card/30 border border-border/30 rounded-2xl p-6",
                  "hover:shadow-2xl transition-all duration-500 hover:scale-105",
                  "animate-in fade-in slide-in-from-bottom"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn(
                  "w-16 h-16 rounded-xl bg-gradient-to-br",
                  feature.color,
                  "flex items-center justify-center mb-4 shadow-lg"
                )}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={cn(
          "backdrop-blur-xl bg-card/30 border border-border/30 rounded-2xl p-12 text-center",
          "animate-in fade-in slide-in-from-bottom duration-1000"
        )}>
          <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-400 animate-pulse" />
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Inventory Management?
          </h3>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of businesses using INVENTURE to manage their inventory efficiently
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-12"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
