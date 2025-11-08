import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, Sparkles, ArrowRight, Mail, Lock, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let success = false;
      if (isLogin) {
        success = await login(email, password);
      } else {
        success = await signup(name, email, password);
      }

      if (success) {
        navigate('/');
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-blue-950 to-pink-950">
        <div className="absolute inset-0 bg-fantasy-landscape opacity-50" />
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => {
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

      <div className={cn(
        "relative z-10 w-full max-w-md",
        "animate-in fade-in zoom-in-95 duration-1000"
      )}>
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-in slide-in-from-top duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500 via-blue-500 to-yellow-500 mb-4 shadow-2xl animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Package className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2 animate-in fade-in slide-in-from-bottom delay-300">
            INVENTURE
          </h1>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Powered By <span className="text-cyan-400 rainbow-text">agora</span>
          </p>
        </div>

        {/* Auth Card */}
        <div className={cn(
          "backdrop-blur-xl bg-card/30 border border-border/30 rounded-2xl p-8 shadow-2xl",
          "animate-in fade-in slide-in-from-bottom delay-500",
          "hover:shadow-primary/20 transition-all duration-300"
        )}>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <h2 className="text-2xl font-bold text-foreground">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2 animate-in slide-in-from-left delay-700">
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-secondary/50 backdrop-blur-sm border-primary/30"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 animate-in slide-in-from-left delay-700">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-secondary/50 backdrop-blur-sm border-primary/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 animate-in slide-in-from-left delay-700">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-secondary/50 backdrop-blur-sm border-primary/30"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className={cn(
                "w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500",
                "hover:from-purple-600 hover:to-pink-600",
                "text-white shadow-lg hover:shadow-xl",
                "transition-all duration-300 hover:scale-105",
                "animate-in fade-in slide-in-from-bottom delay-1000"
              )}
              disabled={loading}
            >
              {loading ? (
                'Processing...'
              ) : (
                <>
                  {isLogin ? 'Login' : 'Sign Up'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center animate-in fade-in delay-1000">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
