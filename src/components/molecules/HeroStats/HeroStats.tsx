import Text from "@/components/atoms/Text";
import { supabase } from "@/integrations/supabase/client";
import { JSX } from "react";

const HeroStats = async (): Promise<JSX.Element> => {
  const characterCount = (await supabase.rpc("getCharactersCount")).data;

  const digits = String(characterCount).split("");
  return (
    <div className="mt-16 flex justify-center items-center space-x-8 text-purple-300">
      <div className="text-center">
        <div
          className="counter mx-auto items-center justify-center text-white"
          aria-label={`Number ${String(characterCount)}`}
        >
          {digits.map((digit, index) => {
            const target = parseInt(digit, 10);
            return (
              <div className="digit" key={index}>
                <div
                  className="roller"
                  style={{
                    animation: `rollTo${String(target)} ${String(target * 0.1 * index * 0.1 + 1)}s ease-out forwards`,
                    animationDelay: `${String(index * 0.15)}s`,
                  }}
                >
                  {[...Array(10).keys()].map((n) => (
                    <div key={n} className="digit-slot">
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <Text variant="caption" color="secondary">
          Characters Created
        </Text>
      </div>
      {/* <div className="w-px h-12 bg-purple-600"></div>
      <div className="text-center">
        <Text variant="h4" color="primary">
          500+
        </Text>
        <Text variant="caption" color="secondary">
          Active Campaigns
        </Text>
      </div> */}
    </div>
  );
};

export default HeroStats;
