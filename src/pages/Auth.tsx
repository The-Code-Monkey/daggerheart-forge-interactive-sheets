import { JSX, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Turnstile } from "@marsidev/react-turnstile";

const Auth = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Honeypot field (should remain empty)
  const [honeypot, setHoneypot] = useState("");

  // Simple math captcha
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaQuestion] = useState(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return {
      question: `${String(num1)} + ${String(num2)}`,
      answer: num1 + num2,
    };
  });

  // Cloudflare Turnstile
  const [turnstileToken, setTurnstileToken] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check honeypot - if filled, it's likely a bot
    if (honeypot) {
      toast({
        title: "Error",
        description: "Suspicious activity detected. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Check captcha for registration only
    if (!isLogin && parseInt(captchaAnswer) !== captchaQuestion.answer) {
      toast({
        title: "Error",
        description: "Please solve the math problem correctly.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Check Turnstile token for registration
    if (!isLogin && !turnstileToken) {
      toast({
        title: "Error",
        description: "Please complete the security verification.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        void navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username,
            },
          },
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: String(error.message),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nebula flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">
              Daggerheart Tools
            </span>
          </div>
          <CardTitle className="text-white text-2xl">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-brand-200">
            {isLogin
              ? "Sign in to access your characters and campaigns"
              : "Join the adventure and create your first character"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={(e) => void handleAuth(e)} className="space-y-4">
            {/* Honeypot field - hidden from users but visible to bots */}
            <div style={{ display: "none" }}>
              <Label htmlFor="website">Website (leave blank)</Label>
              <Input
                id="website"
                type="text"
                value={honeypot}
                onChange={(e) => {
                  setHoneypot(e.target.value);
                }}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  className="bg-slate-800/50 border-brand-500/50 text-white"
                  placeholder="Choose a username"
                  required={!isLogin}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-slate-800/50 border-brand-500/50 text-white"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-slate-800/50 border-brand-500/50 text-white"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Simple math captcha for registration only */}
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="captcha" className="text-white">
                  Security Check: What is {captchaQuestion.question}?
                </Label>
                <Input
                  id="captcha"
                  type="number"
                  value={captchaAnswer}
                  onChange={(e) => {
                    setCaptchaAnswer(e.target.value);
                  }}
                  className="bg-slate-800/50 border-brand-500/50 text-white"
                  placeholder="Enter the answer"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Cloudflare Turnstile for registration only */}
            {!isLogin && (
              <div className="space-y-2">
                <Label className="text-white">Security Verification</Label>
                <div className="flex justify-center">
                  <Turnstile
                    siteKey="0x4AAAAAABgBiF6BQetCUEj0" // You'll need to replace this with your actual site key
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                    }}
                    onError={() => {
                      setTurnstileToken("");
                    }}
                    onExpire={() => {
                      setTurnstileToken("");
                    }}
                    options={{
                      theme: "dark",
                      size: "normal",
                    }}
                  />
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <Separator className="bg-brand-500/30" />

          <div className="text-center space-y-4">
            <p className="text-brand-200 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              variant="outline"
              className="w-full border-brand-400 text-brand-100"
              onClick={() => {
                setIsLogin(!isLogin);
                setCaptchaAnswer(""); // Reset captcha when switching modes
                setTurnstileToken(""); // Reset Turnstile when switching modes
              }}
            >
              {isLogin ? "Create Account" : "Sign In"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
