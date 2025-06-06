
import { JSX, useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Label } from "@/components/ui/label";

interface TurnstileCaptchaProps {
  onTokenChange: (token: string) => void;
}

const TurnstileCaptcha = ({ onTokenChange }: TurnstileCaptchaProps): JSX.Element => {
  return (
    <div className="space-y-2">
      <Label className="text-white">Security Verification</Label>
      <div className="flex justify-center">
        <Turnstile
          siteKey="0x4AAAAAABgBiF6BQetCUEj0"
          onSuccess={onTokenChange}
          onError={() => onTokenChange("")}
          onExpire={() => onTokenChange("")}
          options={{
            theme: "dark",
            size: "normal",
          }}
        />
      </div>
    </div>
  );
};

export default TurnstileCaptcha;
