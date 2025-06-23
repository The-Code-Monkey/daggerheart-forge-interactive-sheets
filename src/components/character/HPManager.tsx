import {
  useState,
  useEffect,
  useRef,
  JSX,
  ChangeEvent,
  useMemo,
  useCallback,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Minus, Plus } from "lucide-react";
import { debounce } from "lodash";
import {
  Card as CardType,
  Character,
  CharacterAdditional,
  CharacterWithRelations,
  Feature,
  Item,
  ItemArmor,
  ItemType,
  Traits,
} from "@/lib/types";
import { ItemInventoryEntry } from "./types";
import { getItemsByIds } from "@/integrations/supabase/helpers";
import { Button } from "../ui/button";
import { getDomainEffectsById } from "@/integrations/supabase/helpers/domains";
import { getCharacterTier } from "@/integrations/supabase/helpers/characters";

interface HPManagerProps {
  character: CharacterWithRelations;
  onUpdate: (updates: Partial<Character>) => void;
}

const HPManager = ({ character, onUpdate }: HPManagerProps): JSX.Element => {
  const [currentHp, setCurrentHp] = useState(0);
  const [maxHp, setMaxHp] = useState(0);
  const [evasion, setEvasion] = useState<number | undefined>(undefined);
  const [armor, setArmor] = useState<number | undefined>(undefined);
  const [hope, setHope] = useState<number>(character.additional?.hope ?? 0);
  const [armorSlots, setArmorSlots] = useState<number>(
    character.additional?.armor ?? 0
  );
  const [stress, setStress] = useState<number>(
    character.additional?.stress ?? 0
  );
  const [domainCards, setDomainCards] = useState<CardType[]>([]);
  const [thresholds, setThresholds] = useState<
    { major: number; severe: number } | undefined
  >(undefined);

  const debouncedUpdate = useRef(
    debounce(
      (data: {
        current_hp?: number;
        max_hp?: number;
        hope?: number;
        additional?: Partial<CharacterAdditional>;
      }) => {
        onUpdate(data);
      },
      500
    )
  ).current;

  const handleArmorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const newArmor = target.checked ? armorSlots + 1 : armorSlots - 1;
    setArmorSlots(newArmor);
    debouncedUpdate({
      additional: { ...(character.additional ?? {}), armor: newArmor },
    });
  };

  const handleHopeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const newHope = target.checked ? hope + 1 : hope - 1;
    setHope(newHope);
    debouncedUpdate({
      additional: { ...(character.additional ?? {}), hope: newHope },
    });
  };

  const handleStressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const newStress = target.checked ? stress + 1 : stress - 1;
    setStress(newStress);
    debouncedUpdate({
      additional: { ...(character.additional ?? {}), stress: newStress },
    });
  };

  const handleGetDomainCards = async (char: CharacterWithRelations) => {
    // console.log(char.additional?.domain_features);
    const cards = await getDomainEffectsById(
      char.additional?.domain_features ?? []
    );
    setDomainCards(cards);
  };

  useEffect(() => {
    setCurrentHp(character.current_hp ?? 0);
    setMaxHp(character.max_hp ?? character.class?.base_hp ?? 0);
    void handleGetDomainCards(character);
  }, [character]);

  const handleHopeMaxChange = (value: number) => {
    debouncedUpdate({ hope: value });
  };

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

  const getAllInventoryItems = useCallback(async (): Promise<
    (Item & { equipped: boolean; quantity: number })[]
  > => {
    const itemsInventoryData = (character.items_inventory ??
      []) as unknown as ItemInventoryEntry[];
    const itemIds = itemsInventoryData.map((entry) => entry.itemId);
    const items = await getItemsByIds(itemIds);

    const inventoryItems = items.map((item) => {
      const inventoryEntry = itemsInventoryData.find(
        (entry) => entry.itemId === item.id
      );

      return {
        ...item,
        quantity: inventoryEntry?.quantity ?? 0,
        equipped: inventoryEntry?.equipped ?? false,
      } as Item & { equipped: boolean; quantity: number };
    });

    return inventoryItems;
  }, [character.items_inventory]);

  const allEquippedArmorItems = useMemo(async (): Promise<
    (ItemArmor & {
      equipped: boolean;
      quantity: number;
    })[]
  > => {
    const inventoryItems = await getAllInventoryItems();
    const equippedArmorItems = inventoryItems.filter(
      (item) => item.equipped && item.type === ItemType.ARMOR
    );
    return equippedArmorItems as (ItemArmor & {
      equipped: boolean;
      quantity: number;
    })[];
  }, [getAllInventoryItems]);

  const domainCardCounts = useMemo((): Record<string, number> => {
    return domainCards.reduce<Record<string, number>>((acc, curr) => {
      acc[String(curr.domain_id)] = (acc[String(curr.domain_id)] || 0) + 1;
      return acc;
    }, {});
  }, [domainCards]);

  const fetchItemsInventory = async () => {
    let newEvasion = Number(character.class?.base_evasion ?? 0);
    let newArmor = 0;

    const equippedArmorItems = await allEquippedArmorItems;

    if (equippedArmorItems.length > 0) {
      equippedArmorItems.forEach((armorItem) => {
        if (armorItem.features) {
          newArmor = newArmor + Number(armorItem.features.base);

          if (armorItem.features.features) {
            armorItem.features.features.forEach((feature: Partial<Feature>) => {
              (
                Object.keys(
                  (feature.modifiers ?? {}) as Record<Traits, number>
                ) as Traits[]
              ).forEach((key: Traits) => {
                if (key.toLowerCase() === Traits.EVASION.toLowerCase()) {
                  newEvasion = newEvasion + Number(feature.modifiers![key]);
                }
              });
            });
          }
        }
      });
    }

    domainCards.forEach((domainCard) => {
      if (
        domainCard.additional?.if?.armor?.[0] === false &&
        equippedArmorItems.length === 0
      ) {
        if (domainCard.additional.if.armor[1].base) {
          newArmor = newArmor + Number(domainCard.additional.if.armor[1].base);
        }
      } else if (
        domainCard.additional?.if?.armor?.[0] === true &&
        equippedArmorItems.length > 0
      ) {
        if (domainCard.additional.if.armor[1].base) {
          newArmor = newArmor + Number(domainCard.additional.if.armor[1].base);
        }
      } else if (
        domainCard.additional?.if?.domainCardCount &&
        domainCardCounts[String(domainCard.domain_id)] &&
        domainCardCounts[String(domainCard.domain_id)] >=
          domainCard.additional.if.domainCardCount[0]
      ) {
        if (domainCard.additional.if.domainCardCount[1].armor) {
          newArmor =
            newArmor +
            Number(domainCard.additional.if.domainCardCount[1].armor);
        }
      }
    });

    setEvasion(newEvasion);
    setArmor(newArmor);
  };

  useEffect(() => {
    void fetchItemsInventory();
  }, [character, domainCards]);

  const calculateDamageThresholds = async () => {
    const thresholds = {
      major: 0,
      severe: 0,
    };
    const tier = getCharacterTier(Number(character.level ?? 0));

    const equippedArmorItems = await allEquippedArmorItems;

    if (equippedArmorItems.length > 0) {
      const armor = equippedArmorItems[0];
      thresholds.major = Number(
        armor.features?.thresholds.major ?? thresholds.major
      );
      thresholds.severe = Number(
        armor.features?.thresholds.severe ?? thresholds.severe
      );
    } else if (domainCards.length > 0) {
      domainCards.forEach((card) => {
        if (card.additional?.if?.armor?.[0] === false) {
          thresholds.major =
            card.additional.tiers?.[tier].thresholds?.major ?? thresholds.major;
          thresholds.severe =
            card.additional.tiers?.[tier].thresholds?.severe ??
            thresholds.severe;
        }
      });
    }

    if (character.subclass?.features) {
      const foundation = character.subclass.features.foundation;
      const mastery = character.additional?.subclass?.mastery
        ? character.subclass.features.mastery
        : [];
      const specialization = character.additional?.subclass?.specialization
        ? character.subclass.features.specialization
        : [];

      const features = [
        ...(foundation ?? []),
        ...(mastery ?? []),
        ...(specialization ?? []),
      ];

      features.forEach((feature) => {
        if (!feature.modifiers) return;
        (Object.keys(feature.modifiers) as ["major" | "severe"]).forEach(
          (modifier) => {
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

  const updateHope = (value: number) => {
    handleHopeMaxChange(Math.min(value, 6));
  };

  useEffect(() => {
    void calculateDamageThresholds().then((thresholds) => {
      setThresholds(thresholds);
    });
  }, [character, domainCards]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-center gap-2 text-center">
          <Heart className="w-5 h-5 text-red-400" />
          Health &amp; Combat
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
              <div>{(thresholds?.major ?? 0) + (character.level ?? 1)}</div>
              <Button
                className=""
                onClick={() => {
                  handleDamageTaken("major");
                }}
              >
                Major
              </Button>
              <div>
                {(thresholds?.severe ?? 0) + (character.level ?? 1) * 2}
              </div>
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
          <div className="text-center">
            <div className="text-sm text-purple-300">Armor</div>
            <div className="text-2xl font-bold text-white">{armor}</div>
            <div className="flex flex-row gap-2 items-center justify-center">
              {Array(armor)
                .fill(null)
                .map((_, index) => (
                  <Input
                    type="checkbox"
                    className="w-5 hover:cursor-pointer rounded-md"
                    onChange={handleArmorChange}
                    key={index}
                    checked={armorSlots >= index + 1}
                    disabled={index >= (armor ?? 0)}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-sm text-green-300">Hope</div>
            <div className="text-2xl font-bold text-white flex flex-row gap-2 items-center justify-center">
              <Button
                onClick={() => {
                  updateHope(Number(character.hope) - 1);
                }}
              >
                <Minus className="w-5 h-5" />
              </Button>
              {hope}/{character.hope}
              <Button
                onClick={() => {
                  updateHope(Number(character.hope) + 1);
                }}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              {Array(character.hope)
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
              {stress}/{character.stress}
            </div>
            <div className="flex flex-row gap-2 items-center justify-center">
              {Array(character.stress ?? 0)
                .fill(null)
                .map((_, index) => (
                  <Input
                    type="checkbox"
                    className="w-5 hover:cursor-pointer rounded-md"
                    onChange={handleStressChange}
                    key={index}
                    checked={stress >= index + 1}
                    disabled={index >= (character.stress ?? 0)}
                  />
                ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HPManager;
