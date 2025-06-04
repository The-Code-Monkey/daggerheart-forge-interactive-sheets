import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dice6, RotateCcw } from "lucide-react";
import DiceButton from "@/components/molecules/DiceButton";
import Text from "@/components/atoms/Text";
import GradientBox from "@/components/atoms/GradientBox";

const DicePanel = (): React.JSX.Element => {
  const [lastRoll, setLastRoll] = useState<{
    dice: string;
    result: number;
  } | null>(null);
  const [rollHistory, setRollHistory] = useState<
    { dice: string; result: number; timestamp: Date }[]
  >([]);

  const rollDice = (sides: number, count = 1, diceType: string) => {
    let total = 0;
    for (let i = 0; i < count; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }

    const roll = { dice: diceType, result: total, timestamp: new Date() };
    setLastRoll({ dice: diceType, result: total });
    setRollHistory((prev) => [roll, ...prev.slice(0, 4)]);
  };

  const clearHistory = () => {
    setRollHistory([]);
    setLastRoll(null);
  };

  return (
    <Card className="bg-linear-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-xs">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Dice6 className="w-5 h-5" />
          Dice Roller
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Last Roll Display */}
        {lastRoll && (
          <GradientBox
            variant="secondary"
            className="rounded-lg p-4 text-center"
          >
            <Text variant="h3" color="accent">
              {lastRoll.result}
            </Text>
            <Text variant="caption" color="secondary">
              {lastRoll.dice}
            </Text>
          </GradientBox>
        )}

        {/* Dice Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <DiceButton
            label="2d12 Hope"
            variant="hope"
            onClick={() => {
              rollDice(12, 2, "2d12 (Hope)");
            }}
          />
          <DiceButton
            label="2d12 Fear"
            variant="fear"
            onClick={() => {
              rollDice(12, 2, "2d12 (Fear)");
            }}
          />
          <DiceButton
            label="d20"
            onClick={() => {
              rollDice(20, 1, "1d20");
            }}
          />
          <DiceButton
            label="d12"
            onClick={() => {
              rollDice(12, 1, "1d12");
            }}
          />
          <DiceButton
            label="d10"
            onClick={() => {
              rollDice(10, 1, "1d10");
            }}
          />
          <DiceButton
            label="d8"
            onClick={() => {
              rollDice(8, 1, "1d8");
            }}
          />
          <DiceButton
            label="d6"
            onClick={() => {
              rollDice(6, 1, "1d6");
            }}
          />
          <DiceButton
            label="d4"
            onClick={() => {
              rollDice(4, 1, "1d4");
            }}
          />
        </div>

        {/* Roll History */}
        {rollHistory.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="caption" color="secondary">
                Recent Rolls
              </Text>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-purple-300 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {rollHistory.map((roll, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <Text variant="caption" color="secondary">
                    {roll.dice}
                  </Text>
                  <Badge
                    variant="secondary"
                    className="bg-slate-700 text-white"
                  >
                    {roll.result}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DicePanel;
