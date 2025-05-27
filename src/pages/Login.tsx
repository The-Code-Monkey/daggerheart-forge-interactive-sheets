
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">Daggerheart Tools</span>
          </div>
          <CardTitle className="text-white text-2xl">Welcome Back</CardTitle>
          <CardDescription className="text-purple-200">
            Sign in to access your characters and campaigns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800/50 border-purple-500/50 text-white"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800/50 border-purple-500/50 text-white"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Sign In
            </Button>
          </form>

          <div className="text-center">
            <Link to="/forgot-password" className="text-purple-300 hover:text-yellow-400 text-sm">
              Forgot your password?
            </Link>
          </div>

          <Separator className="bg-purple-500/30" />

          <div className="text-center space-y-4">
            <p className="text-purple-200 text-sm">Don't have an account?</p>
            <Button variant="outline" className="w-full border-purple-400 text-purple-100 hover:bg-purple-700/30">
              Create Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
