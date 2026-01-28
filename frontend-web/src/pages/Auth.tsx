import React, { useState } from "react";
import { motion } from "framer-motion";
import { Beaker, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

interface AuthProps {
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
}

const Auth: React.FC<AuthProps> = ({ signIn, signUp }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setLoading(true);

    try {
      const response = isLogin
        ? await signIn(email, password)
        : await signUp(email, password);

      if (response?.error) {
        setError(response.error.message || "Authentication failed");
      }
    } catch {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Changed: Removed p-8 to prevent overflow, added overflow-hidden to main div
    <div className="h-screen w-full gradient-primary flex items-center justify-center overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl" // Slightly narrowed for better vertical fit
      >
        {/* Changed: Reduced vertical padding from p-12 to py-8 px-12 to save space */}
        <div className="bg-white rounded-[2.5rem] py-8 px-12 shadow-card-hover border-none">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
              <Beaker className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-black mb-1 text-primary tracking-tight">
              Chemical Equipment
            </h1>
            <h2 className="text-3xl font-bold mb-2 text-secondary">
              Visualizer
            </h2>
            <p className="text-neutral-medium text-lg font-medium italic tracking-wide">
              Analyze • Visualize • Optimize
            </p>
          </div>

          {/* Mode Label */}
          <div className="text-center mb-6">
            <p className="text-neutral-dark text-xl font-bold">
              {isLogin
                ? "Sign in to your dashboard"
                : "Create your engineer account"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-lg font-bold text-neutral-dark ml-1">Email</Label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-medium" />
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // Changed: Added text-2xl and placeholder:text-xl for clarity
                  className="pl-14 h-16 !text-xl bg-neutral-lightest border-2 border-neutral-light rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-xl placeholder:text-neutral-light"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg font-bold text-neutral-dark ml-1">Password</Label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-medium" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // Changed: Added text-2xl
                  className="pl-14 h-16 !text-xl bg-neutral-lightest border-2 border-neutral-light rounded-2xl focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-xl placeholder:text-neutral-light"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-xl flex gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm font-semibold">{error}</p>
              </motion.div>
            )}

            <Button 
              type="submit" 
              className="w-full h-16 text-2xl font-black tracking-widest gradient-button-primary hover:shadow-glow-primary transition-all rounded-2xl border-none mt-4"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : isLogin ? (
                "SIGN IN"
              ) : (
                "CREATE ACCOUNT"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-light" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-neutral-medium font-bold">Or continue with</span>
            </div>
          </div>

          {/* Toggle */}
          <div className="text-center">
            <p className="text-lg text-neutral-medium font-medium">
              {isLogin ? "New to the platform?" : "Joined us before?"}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}
                className="ml-2 text-secondary text-lg font-bold hover:text-secondary-dark underline decoration-2 underline-offset-4 transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;