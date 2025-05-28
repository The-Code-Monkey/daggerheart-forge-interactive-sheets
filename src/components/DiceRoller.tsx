import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dice6, Plus, RotateCcw } from "lucide-react";

const DiceRoller = () => {
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
    <Card className="bg-gradient-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Dice6 className="w-5 h-5" />
          Dice Roller
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Last Roll Display */}
        {lastRoll && (
          <div className="bg-slate-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {lastRoll.result}
            </div>
            <div className="text-sm text-purple-200">{lastRoll.dice}</div>
          </div>
        )}

        {/* Dice Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={() => {
              rollDice(12, 2, "2d12 (Hope)");
            }}
            className="border-green-500 text-green-400 hover:bg-green-500/20"
          >
            2d12 Hope
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              rollDice(12, 2, "2d12 (Fear)");
            }}
            className="border-red-500 text-red-400 hover:bg-red-500/20"
          >
            2d12 Fear
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              rollDice(20, 1, "1d20");
            }}
            className="border-purple-400 text-purple-300 hover:bg-purple-500/20"
          >
            d20
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              rollDice(12, 1, "1d12");
            }}
            className="border-purple-400 text-purple-300 hover:bg-purple-500/20"
          >
            d12
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              rollDice(10, 1, "1d10");
            }}
            className="border-purple-400 text-purple-300 hover:bg-purple-500/20"
          >
            d10
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              rollDice(8, 1, "1d8");
            }}
            className="border-purple-400 text-purple-300 hover:bg-purple-500/20"
          >
            d8
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              rollDice(6, 1, "1d6");
            }}
            className="border-purple-400 text-purple-300 hover:bg-purple-500/20"
          >
            d6
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              rollDice(4, 1, "1d4");
            }}
            className="border-purple-400 text-purple-300 hover:bg-purple-500/20"
          >
            d4
          </Button>
        </div>

        {/* Roll History */}
        {rollHistory.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-200">Recent Rolls</span>
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
                  <span className="text-purple-200">{roll.dice}</span>
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

export default DiceRoller;
