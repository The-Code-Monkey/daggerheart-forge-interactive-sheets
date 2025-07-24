import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JSX, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = (): JSX.Element => {
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    const { error } = await supabase.auth.updateUser({ password });

    if (!error) {
      toast({
        title: "Welcome!",
        description: "You have successfully signed in as a guest.",
      });
      void navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-nebula flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-linear-to-br from-brand-800/40 to-slate-800/40 border-brand-500/30 backdrop-blur-xs">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-2xl">Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
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
                placeholder="New Password"
                required
              />
            </div>
            <Button
              type="button"
              onClick={() => {
                void handleUpdatePassword();
              }}
            >
              Reset Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
