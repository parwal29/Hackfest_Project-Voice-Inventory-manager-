import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  businessType?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, businessType?: string) => Promise<boolean>;
  loginWithGoogle: (email: string, name: string, businessType: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check Supabase session first
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Try to get user profile from database
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile || session.user) {
            const userData: User = {
              id: session.user.id,
              name: profile?.name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              avatar: profile?.avatar || session.user.user_metadata?.avatar_url,
              businessType: profile?.business_type,
            };
            setUser(userData);
            setIsAuthenticated(true);
          }
        } else {
          // Fallback to localStorage for demo mode
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.warn('Supabase not configured, using fallback mode:', error);
        // Fallback to localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        const userData: User = {
          id: session.user.id,
          name: profile?.name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatar: profile?.avatar || session.user.user_metadata?.avatar_url,
          businessType: profile?.business_type,
        };
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Try Supabase auth first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If Supabase fails, use fallback for demo
        console.warn('Supabase login failed, using fallback:', error);
        const userData: User = {
          id: '1',
          name: email.split('@')[0] || 'User',
          email: email,
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const userData: User = {
          id: data.user.id,
          name: profile?.name || data.user.user_metadata?.name || email.split('@')[0] || 'User',
          email: data.user.email || email,
          avatar: profile?.avatar || data.user.user_metadata?.avatar_url,
          businessType: profile?.business_type,
        };
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      // Fallback for demo
      const userData: User = {
        id: '1',
        name: email.split('@')[0] || 'User',
        email: email,
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
  };

  const signup = async (name: string, email: string, password: string, businessType?: string): Promise<boolean> => {
    try {
      // Try Supabase signup first
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            business_type: businessType,
          },
        },
      });

      if (error) {
        console.warn('Supabase signup failed, using fallback:', error);
        // Fallback for demo
        const userData: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
          businessType: businessType,
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }

      if (data.user) {
        // Create profile in database
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name,
            email,
            business_type: businessType,
          });

        if (profileError) {
          console.warn('Profile creation failed:', profileError);
        }

        const userData: User = {
          id: data.user.id,
          name: name,
          email: email,
          businessType: businessType,
        };
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      // Fallback for demo
      const userData: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        businessType: businessType,
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
  };

  const loginWithGoogle = async (email: string, name: string, businessType: string): Promise<boolean> => {
    try {
      // Try Supabase Google OAuth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        console.warn('Supabase Google OAuth failed, using fallback:', error);
        // Fallback for demo
        const userData: User = {
          id: Date.now().toString(),
          name: name,
          email: email,
          businessType: businessType,
        };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }

      // For direct Google login (when user data is already available)
      const userData: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        businessType: businessType,
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      // Fallback for demo
      const userData: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        businessType: businessType,
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.warn('Supabase logout failed:', error);
    }
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
