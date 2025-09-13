import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: unknown }>;
  signIn: (email: string, password: string) => Promise<{ error: unknown }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: unknown }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            phone: phone
          }
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Signup Failed",
          description: error.message
        });
        return { error };
      }

      // Create/update profile
      if (!error) {
        const { data: session } = await supabase.auth.getSession();
        if (session.session?.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: session.session.user.id,
              full_name: fullName,
              phone: phone
            });

          if (profileError) {
            console.warn('Profile creation failed:', profileError);
          }
        }

        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account."
        });
      }

      return { error };
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: err?.message || String(error)
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message
        });
        return { error };
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in."
      });

      return { error };
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: err?.message || String(error)
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          variant: "destructive",
          title: "Logout Failed",
          description: error.message
        });
      } else {
        toast({
          title: "Logged out",
          description: "You have been successfully logged out."
        });
      }
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: err?.message || String(error)
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Password Reset Failed",
          description: error.message
        });
        return { error };
      }

      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for password reset instructions."
      });

      return { error };
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        variant: "destructive",
        title: "Password Reset Failed",
        description: err?.message || String(error)
      });
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};