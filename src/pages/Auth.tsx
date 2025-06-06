
import { JSX, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const Auth = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);

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
          {isLogin ? (
            <LoginForm onToggleMode={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleMode={() => setIsLogin(true)} />
          )}
          <Separator className="bg-brand-500/30" />
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
