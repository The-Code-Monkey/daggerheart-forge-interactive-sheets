import { JSX, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onToggleMode: () => void;
}

const LoginForm = ({ onToggleMode }: LoginFormProps): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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
    <form onSubmit={(e) => void handleLogin(e)} className="space-y-4">
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
      <Button
        type="submit"
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign In"}
      </Button>
      <div className="text-center">
        <p className="text-brand-200 text-sm mb-2">Don't have an account?</p>
        <Button
          variant="outline"
          className="w-full border-brand-400 text-brand-100"
          onClick={onToggleMode}
          type="button"
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
