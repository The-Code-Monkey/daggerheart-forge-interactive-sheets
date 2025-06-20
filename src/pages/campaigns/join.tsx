import { JSX, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck, XCircle } from "lucide-react";
import {
  getSingleCampaignByIdBasic,
  addCharacterToCampaign,
} from "@/integrations/supabase/helpers/campaigns";
import { getCharacters } from "@/integrations/supabase/helpers";
import GenericMultiSelect, {
  Option,
} from "@/components/molecules/GenericMultiSelect";
import { CharacterWithRelations } from "@/lib/types";

const JoinCampaignPage = (): JSX.Element => {
  const { invite: inviteToken } = useParams();

  const [campaignName, setCampaignName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Option | null>(
    null
  );

  useEffect(() => {
    console.log(inviteToken);

    if (!inviteToken) {
      setError("Invalid invite link.");
      setLoading(false);
      return;
    }

    void fetchInvite(inviteToken);
  }, [inviteToken]);

  const fetchInvite = async (token: string): Promise<void> => {
    // TODO: Fetch campaign info based on invite token
    const data = await getSingleCampaignByIdBasic(parseInt(token, 10));

    if (data) {
      setCampaignName(data.name);
    } else {
      setCampaignName("Unknown Campaign");
    }
    setLoading(false);
  };

  const fetchCharacters = async (): Promise<Option[] | null> => {
    const data = await getCharacters();

    if (data) {
      return data
        .filter((character) => character.complete)
        .map((option: CharacterWithRelations) => ({
          label: `${option.name} - (${String(option.class?.name)})`,
          value: option.id,
        }));
    }

    return null;
  };

  const handleJoin = async (): Promise<void> => {
    setJoining(true);
    console.log("Joining campaign...", selectedCharacter);
    // TODO: Add character to campaign
    if (selectedCharacter && inviteToken) {
      const result = await addCharacterToCampaign(
        selectedCharacter,
        parseInt(inviteToken, 10)
      );
      setJoined(result);
    } else {
      setJoined(false);
    }
    setJoining(false);
  };

  return (
    <div className="min-h-screen bg-nebula py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Card className="bg-slate-800/80 border-brand-500/30 backdrop-blur-xs">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Join Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center text-brand-200">
                <Loader2 className="animate-spin mr-2" />
                Verifying invite...
              </div>
            ) : error ? (
              <div className="text-red-400 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                {error}
              </div>
            ) : joined ? (
              <div className="text-green-400 flex items-center gap-2 font-semibold">
                <ShieldCheck className="w-5 h-5" />
                Successfully joined <span className="ml-1">{campaignName}</span>
                !
              </div>
            ) : (
              <>
                <p className="text-brand-200 mb-4">
                  You’ve been invited to join <strong>{campaignName}</strong>.
                  Would you like to join this campaign?
                </p>
                {/* You can conditionally show a character select here */}
                <GenericMultiSelect
                  name="character"
                  label="Select Your Character"
                  defaultFn={fetchCharacters}
                  searchFn={() => fetchCharacters()}
                  value={selectedCharacter}
                  onChange={(option) => {
                    setSelectedCharacter(option as Option);
                  }}
                  disableHookForm
                />

                <Button
                  onClick={() => {
                    void handleJoin();
                  }}
                  disabled={joining}
                  className="w-full bg-linear-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold"
                >
                  {joining ? (
                    <>
                      <Loader2 className="animate-spin mr-2" />
                      Joining...
                    </>
                  ) : (
                    "Join Campaign"
                  )}
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JoinCampaignPage;
