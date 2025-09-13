import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, Wrench, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await resetPassword(email);
    
    if (!error) {
      setSent(true);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <Link to="/login" className="inline-flex items-center text-white hover:text-white/80 mb-8 transition-smooth">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Link>

        {/* Reset Password Card */}
        <Card className="bg-background/95 backdrop-blur-md shadow-card-hover border-border">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Wrench className="h-8 w-8 text-primary mr-2" />
              <span className="text-2xl font-bold text-foreground">RepairUp</span>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {sent ? "Check Your Email" : "Reset Password"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {sent 
                ? "We've sent a password reset link to your email address."
                : "Enter your email address and we'll send you a link to reset your password."
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="default" size="lg" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">
                  If an account with that email exists, you'll receive a password reset link shortly.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login">Back to Login</Link>
                </Button>
              </div>
            )}

            {/* Sign Up Link */}
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:text-primary-hover font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-8 text-center text-white/80 text-sm">
          <p>🔒 Your data is secure and encrypted</p>
          <p className="mt-2">Need help? Contact our support team</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;