import { useState, useEffect, useRef, JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { debounce } from "lodash";
import { Character, CharacterWithRelations } from "@/lib/types";

interface HPManagerProps {
  character: CharacterWithRelations;
  onUpdate: (updates: Partial<Character>) => void;
}

const HPManager = ({ character, onUpdate }: HPManagerProps): JSX.Element => {
  const [currentHp, setCurrentHp] = useState(0);
  const [maxHp, setMaxHp] = useState(0);

  const debouncedUpdate = useRef(
    debounce((data: { current_hp?: number; max_hp?: number }) => {
      onUpdate(data);
    }, 500)
  ).current;

  useEffect(() => {
    setCurrentHp(character.current_hp ?? 0);
    setMaxHp(character.max_hp ?? 0);
  }, [character]);

  const handleHpChange = (type: "current" | "max", value: number) => {
    if (type === "current") {
      const newCurrentHp = Math.max(0, Math.min(value, maxHp));
      setCurrentHp(newCurrentHp);
      debouncedUpdate({ current_hp: newCurrentHp });
    } else {
      const newMaxHp = Math.max(1, value);
      setMaxHp(newMaxHp);
      setCurrentHp(Math.min(currentHp, newMaxHp));
      debouncedUpdate({
        max_hp: newMaxHp,
        current_hp: Math.min(currentHp, newMaxHp),
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-400" />
          Health & Combat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="current-hp" className="text-white">
              Current HP
            </Label>
            <Input
              id="current-hp"
              type="number"
              min="0"
              max={maxHp}
              value={currentHp}
              onChange={(e) => {
                handleHpChange("current", parseInt(e.target.value) || 0);
              }}
              className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
            />
          </div>
          <div>
            <Label htmlFor="max-hp" className="text-white">
              Max HP
            </Label>
            <Input
              id="max-hp"
              type="number"
              min="1"
              value={maxHp}
              onChange={(e) => {
                handleHpChange("max", parseInt(e.target.value) || 1);
              }}
              className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-green-300">Hope</div>
            <div className="text-2xl font-bold text-white">
              {character.hope}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-red-300">Stress</div>
            <div className="text-2xl font-bold text-white">
              {character.stress}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HPManager;
