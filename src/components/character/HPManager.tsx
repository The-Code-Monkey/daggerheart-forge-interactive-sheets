import { useState, useEffect, useRef, JSX, ChangeEvent, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { debounce } from "lodash";
import {
  Character,
  CharacterAdditional,
  CharacterWithRelations,
  ItemArmor,
  ItemOther,
  ItemType,
  Traits,
} from "@/lib/types";
import { ItemInventoryEntry } from "./types";
import { getItemsByIds } from "@/integrations/supabase/helpers";
import { Button } from "../ui/button";

interface HPManagerProps {
  character: CharacterWithRelations;
  onUpdate: (updates: Partial<Character>) => void;
}

const HPManager = ({ character, onUpdate }: HPManagerProps): JSX.Element => {
  const [currentHp, setCurrentHp] = useState(0);
  const [maxHp, setMaxHp] = useState(0);
  const [evasion, setEvasion] = useState<number | undefined>(undefined);
  const [hope, setHope] = useState<number>(character.additional?.hope ?? 0);
  const [itemsWithQuantity, setItemsWithQuantity] = useState<
    (ItemOther | ItemArmor)[]
  >([]);

  const debouncedUpdate = useRef(
    debounce(
      (data: {
        current_hp?: number;
        max_hp?: number;
        additional?: Partial<CharacterAdditional>;
      }) => {
        onUpdate(data);
      },
      500
    )
  ).current;

  const handleHopeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const newHope = target.checked ? hope + 1 : hope - 1;
    setHope(newHope);
    debouncedUpdate({ additional: { hope: newHope } });
  };

  useEffect(() => {
    setCurrentHp(character.current_hp ?? 0);
    setMaxHp(character.max_hp ?? character.class?.base_hp ?? 0);
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

  const fetchItemsInventory = async () => {
    const itemsInventoryData = (character.items_inventory ??
      []) as unknown as ItemInventoryEntry[];
    const itemIds = itemsInventoryData.map((entry) => entry.itemId);
    const items = await getItemsByIds(itemIds);

    const itemsWithQuantity = items.filter((item) => {
      const inventoryEntry = itemsInventoryData.find(
        (entry) => entry.itemId === item.id
      );

      if (!inventoryEntry?.equipped && !item.type) return false;

      const nonCustomItem = item as ItemOther | ItemArmor;

      return nonCustomItem.type !== ItemType.ARMOR
        ? nonCustomItem.features?.some(
            (feature) => Object.keys(feature.modifiers ?? {}).length > 0
          )
        : nonCustomItem.features?.features?.some(
            (feature) => Object.keys(feature.modifiers ?? {}).length > 0
          );
    });

    let newEvasion = Number(character.class?.base_evasion ?? 0);

    (
      itemsWithQuantity.filter((item) => !!item.type) as (
        | ItemOther
        | ItemArmor
      )[]
    ).forEach((item) => {
      (item.type !== ItemType.ARMOR
        ? (item.features ?? [])
        : (item.features?.features ?? [])
      ).forEach((feature) => {
        Object.keys(feature.modifiers ?? {}).forEach((key: string) => {
          if (key.toLowerCase() === Traits.EVASION.toLowerCase()) {
            newEvasion = newEvasion + Number(feature.modifiers![key]);
          }
        });
      });
    });

    setEvasion(newEvasion);
    setItemsWithQuantity(
      (
        itemsWithQuantity.filter((item) => !!item.type) as (
          | ItemOther
          | ItemArmor
        )[]
      ).map((item) => {
        const inventoryEntry = itemsInventoryData.find(
          (entry) => entry.itemId === item.id
        );

        return {
          ...item,
          equipped: inventoryEntry?.equipped ?? false,
        };
      })
    );
  };

  useEffect(() => {
    void fetchItemsInventory();
  }, [character]);

  const calculateDamageThresholds = () => {
    const thresholds = {
      major: 1,
      severe: 2,
    };

    const isWearingArmor: ItemArmor | undefined = itemsWithQuantity.find(
      (item) => item.type === ItemType.ARMOR && item.equipped
    ) as ItemArmor | undefined;

    if (isWearingArmor) {
      thresholds.major = Number(
        isWearingArmor.features?.thresholds.major ?? thresholds.major
      );
      thresholds.severe = Number(
        isWearingArmor.features?.thresholds.severe ?? thresholds.severe
      );
    }

    if (character.subclass?.features) {
      const foundation = character.subclass.features.foundation;
      const mastery = character.additional?.subclass?.mastery
        ? character.subclass.features.mastery
        : [];
      const specialization = character.additional?.subclass?.specialization
        ? character.subclass.features.specialization
        : [];

      const features = [...foundation, ...mastery, ...specialization];

      features.forEach((feature) => {
        if (!feature.modifiers) return;
        Object.keys(feature.modifiers).forEach(
          (modifier: "major" | "severe") => {
            const value = Number(feature.modifiers?.[modifier]);
            thresholds[modifier] = thresholds[modifier] + value;
          }
        );
      });
    }

    return thresholds;
  };

  const handleDamageTaken = (type: "minor" | "major" | "severe") => {
    const damage = type === "minor" ? 1 : type === "major" ? 2 : 3;
    handleHpChange("current", Math.min(currentHp + damage, maxHp));
  };

  const thresholds = useMemo(
    () => calculateDamageThresholds(),
    [character, itemsWithQuantity]
  );

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
          <div className="col-span-2 text-white border-b pb-6">
            <div className="text-center mb-2">Damage Thresholds</div>
            <div className="flex flex-row gap-2 items-center justify-evenly mt-6">
              <Button
                className=""
                onClick={() => {
                  handleDamageTaken("minor");
                }}
              >
                Minor
              </Button>
              <div>{thresholds.major}</div>
              <Button
                className=""
                onClick={() => {
                  handleDamageTaken("major");
                }}
              >
                Major
              </Button>
              <div>{thresholds.severe}</div>
              <Button
                className=""
                onClick={() => {
                  handleDamageTaken("severe");
                }}
              >
                Severe
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-purple-300">Evasion</div>
            <div className="text-2xl font-bold text-white">{evasion}</div>
          </div>
          <div className="text-center"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-green-300">Hope</div>
            <div className="text-2xl font-bold text-white">
              {character.hope}/6
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <Input
                    type="checkbox"
                    className="w-5 hover:cursor-pointer rounded-md"
                    onChange={handleHopeChange}
                    key={index}
                    checked={hope >= index + 1}
                    disabled={index >= (character.hope ?? 0)}
                  />
                ))}
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
