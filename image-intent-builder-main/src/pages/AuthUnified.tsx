import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Sparkles, ArrowRight, Mail, Lock, User, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const businessTypes = [
  { value: 'retail', label: 'Retail' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'other', label: 'Other' },
];

export function AuthUnified() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [showBusinessTypeDialog, setShowBusinessTypeDialog] = useState(false);
  const [googleUserData, setGoogleUserData] = useState<{ email: string; name: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let success = false;
      if (isLogin) {
        if (!email || !password) {
          alert('Please enter both email and password');
          setLoading(false);
          return;
        }
        success = await login(email, password);
      } else {
        if (!name || !email || !password) {
          alert('Please fill in all required fields');
          setLoading(false);
          return;
        }
        if (!businessType) {
          alert('Please select a business type');
          setLoading(false);
          return;
        }
        success = await signup(name, email, password, businessType);
      }

      if (success) {
        navigate('/');
      } else {
        alert('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // Decode JWT token to get user info
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const userData = JSON.parse(jsonPayload);
      
      setGoogleUserData({
        email: userData.email,
        name: userData.name || userData.given_name || 'User',
      });
      setShowBusinessTypeDialog(true);
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const handleBusinessTypeSubmit = async () => {
    if (!googleUserData || !businessType) return;
    
    setLoading(true);
    try {
      const success = await loginWithGoogle(googleUserData.email, googleUserData.name, businessType);
      if (success) {
        setShowBusinessTypeDialog(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Google auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
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
            {t('poweredBy')} <span className="text-cyan-400 rainbow-text">{t('agora')}</span>
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
              {isLogin ? t('welcome') : t('signup')}
            </h2>
          </div>

          {/* Google OAuth */}
          {import.meta.env.VITE_GOOGLE_CLIENT_ID && import.meta.env.VITE_GOOGLE_CLIENT_ID !== '' ? (
            <div className="mb-6 animate-in fade-in delay-700">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
              />
            </div>
          ) : (
            <div className="mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 animate-in fade-in delay-700">
              <p className="text-sm text-yellow-500 text-center">
                Google OAuth not configured. Use email/password to sign in, or configure VITE_GOOGLE_CLIENT_ID in .env file.
              </p>
            </div>
          )}

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card/30 px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2 animate-in slide-in-from-left delay-700">
                <Label htmlFor="name" className="text-foreground">{t('name')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-secondary/50 backdrop-blur-sm border-primary/30"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 animate-in slide-in-from-left delay-700">
              <Label htmlFor="email" className="text-foreground">{t('email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-secondary/50 backdrop-blur-sm border-primary/30"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 animate-in slide-in-from-left delay-700">
              <Label htmlFor="password" className="text-foreground">{t('password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t('password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-secondary/50 backdrop-blur-sm border-primary/30"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2 animate-in slide-in-from-left delay-700">
                <Label htmlFor="businessType" className="text-foreground">{t('businessType')}</Label>
                <Select value={businessType} onValueChange={setBusinessType} required={!isLogin}>
                  <SelectTrigger className="bg-secondary/50 backdrop-blur-sm border-primary/30">
                    <SelectValue placeholder={t('selectBusinessType')} />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {t(type.value)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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
                  {isLogin ? t('login') : t('signup')}
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
              {isLogin ? `Don't have an account? ${t('signup')}` : `Already have an account? ${t('login')}`}
            </button>
          </div>

          {/* Voice Assistant Link */}
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => navigate('/voice-call')}
              className={cn(
                "gap-2 backdrop-blur-sm bg-card/30 border-yellow-500/50 text-yellow-500",
                "hover:bg-yellow-500/10 transition-all duration-300 hover:scale-105"
              )}
            >
              <Mic className="w-4 h-4" />
              <span className="rainbow-text">Try Voice Assistant</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Business Type Dialog for Google OAuth */}
      <Dialog open={showBusinessTypeDialog} onOpenChange={setShowBusinessTypeDialog}>
        <DialogContent className="backdrop-blur-xl bg-card/30 border-border/30">
          <DialogHeader>
            <DialogTitle>{t('selectBusinessType')}</DialogTitle>
            <DialogDescription>
              {t('selectBusinessType')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={businessType} onValueChange={setBusinessType}>
              <SelectTrigger className="bg-secondary/50 backdrop-blur-sm border-primary/30">
                <SelectValue placeholder={t('selectBusinessType')} />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {t(type.value)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleBusinessTypeSubmit}
              disabled={!businessType || loading}
              className="w-full"
            >
              {loading ? 'Processing...' : 'Continue'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

