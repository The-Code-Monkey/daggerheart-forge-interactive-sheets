import { JSX, useState, Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Lazy load the Turnstile component to reduce initial bundle size
import TurnstileCaptcha from "./TurnstileCaptcha";

interface RegisterFormProps {
  onToggleMode: () => void;
}

const RegisterForm = ({ onToggleMode }: RegisterFormProps): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const navigate = useNavigate();

  const [captchaQuestion] = useState(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return {
      question: `${String(num1)} + ${String(num2)}`,
      answer: num1 + num2,
    };
  });

  const { toast } = useToast();

  const onTestAccount = async () => {
    const { error } = await supabase.auth.signInAnonymously();

    if (!error) {
      toast({
        title: "Welcome!",
        description: "You have successfully signed in as a guest.",
      });
      void navigate("/dashboard");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
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

    // Check captcha
    if (parseInt(captchaAnswer) !== captchaQuestion.answer) {
      toast({
        title: "Error",
        description: "Please solve the math problem correctly.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Check Turnstile token
    if (!turnstileToken) {
      toast({
        title: "Error",
        description: "Please complete the security verification.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
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
    } catch (error: any) {
      toast({
        title: "Error",
        description: `${String(error.message)} here`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => void handleRegister(e)} className="space-y-4">
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
          required
        />
      </div>
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
          required
        />
      </div>

      <Suspense
        fallback={
          <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
        }
      >
        <TurnstileCaptcha onTokenChange={setTurnstileToken} />
      </Suspense>

      <Button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign Up"}
      </Button>

      <div className="text-center">
        <p className="text-brand-200 text-sm mb-2">Already have an account?</p>
        <Button
          variant="outline"
          className="w-full border-brand-400 text-brand-100"
          onClick={onToggleMode}
          type="button"
        >
          Sign In
        </Button>
        <Button
          variant="outline"
          className="w-full border-brand-400 text-brand-100"
          onClick={() => {
            void onTestAccount();
          }}
          type="button"
        >
          Create Test Account
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
