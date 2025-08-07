import {
  Card as CardType,
  Character,
  CharacterWithRelations,
} from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { JSX, useEffect, useState } from "react";
import { getDomainEffects } from "@/integrations/supabase/helpers/domains";
import { Button } from "../ui/button";

interface EffectsFeaturesManagerProps {
  character: CharacterWithRelations;
  onUpdate: (character: Partial<Character>) => void;
}

const EffectsFeaturesManager = ({
  character,
  onUpdate,
}: EffectsFeaturesManagerProps): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const [domainEffects, setDomainEffects] = useState<CardType[]>([]);
  const [myEffects, setMyEffects] = useState<CardType[]>([]);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const fetchDomainEffects = async () => {
    const data = await getDomainEffects(
      character.domains.map((domain) => domain.id),
      character.level ?? 1
    );
    setDomainEffects(data);
    setMyEffects(
      data.filter((effect) =>
        character.additional?.domain_features?.includes(effect.id)
      )
    );
  };

  const handleSelectCard = (effectId: number) => {
    const isSelected =
      character.additional?.domain_features?.includes(effectId);

    if (isSelected) {
      onUpdate({
        additional: {
          ...(character.additional ?? {}),
          domain_features: [
            ...(character.additional?.domain_features ?? []).filter(
              (id) => id !== effectId
            ),
          ],
        },
      });
    } else {
      onUpdate({
        additional: {
          ...(character.additional ?? {}),
          domain_features: [
            ...(character.additional?.domain_features ?? []),
            effectId,
          ],
        },
      });
    }
  };

  useEffect(() => {
    void fetchDomainEffects();
  }, [
    character.domains,
    character.level,
    character.additional?.domain_features,
  ]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-white">Effects &amp; Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-white divide-x divide-white">
          <div className="pr-4">
            <button
              onClick={toggleEditing}
              className="text-left w-full p-0 bg-transparent border-none text-white hover:text-purple-200 cursor-pointer"
            >
              Domain Effects (click to select)
            </button>
            {editing && (
              <div className="grid grid-cols-1 gap-4 mt-4 w-full">
                {domainEffects.map((effect) => {
                  const isSelected =
                    character.additional?.domain_features?.includes(effect.id);

                  return (
                    <Card key={effect.id}>
                      <CardHeader className="flex flex-row space-y-0">
                        <CardTitle className="text-white text-center mx-auto">
                          {effect.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-white">
                        <CardDescription className="text-white">
                          {effect.description}
                        </CardDescription>
                        <ul className="mt-8">
                          {Object.keys(effect.additional?.tiers ?? {}).map(
                            (tier) => (
                              <li key={tier}>
                                <span className="font-bold">Tier {tier}: </span>
                                {String(
                                  effect.additional?.tiers?.[tier].thresholds
                                    ?.major
                                )}{" "}
                                /{" "}
                                {String(
                                  effect.additional?.tiers?.[tier].thresholds
                                    ?.severe
                                )}
                              </li>
                            )
                          )}
                        </ul>
                        <Button
                          className="mt-4 w-full"
                          onClick={() => {
                            handleSelectCard(effect.id);
                          }}
                        >
                          {isSelected ? "Remove" : "Select"} Card
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
            {!editing && (
              <div className="grid grid-cols-1 gap-4 mt-4 w-full">
                {myEffects.map((effect) => (
                  <Card key={effect.id}>
                    <CardHeader className="flex flex-row space-y-0">
                      <CardTitle className="text-white text-center mx-auto">
                        {effect.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-white">
                      <CardDescription className="text-white">
                        {effect.description}
                      </CardDescription>
                      <ul className="mt-8">
                        {Object.keys(effect.additional?.tiers ?? {}).map(
                          (tier) => (
                            <li key={tier}>
                              <span className="font-bold">Tier {tier}: </span>
                              {String(
                                effect.additional?.tiers?.[tier].thresholds
                                  ?.major
                              )}{" "}
                              /{" "}
                              {String(
                                effect.additional?.tiers?.[tier].thresholds
                                  ?.severe
                              )}
                            </li>
                          )
                        )}
                      </ul>
                      {/* <Button
                      className="mt-4 w-full"
                      onClick={() => {
                        handleSelectCard(Number(effect.id));
                      }}
                    >
                      {isSelected ? "Remove" : "Select"} Card
                    </Button> */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div>&nbsp;</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EffectsFeaturesManager;
