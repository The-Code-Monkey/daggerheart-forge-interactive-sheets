import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  addSessionToCampaign,
  getSingleCampaignByIdBasic,
} from "@/integrations/supabase/helpers/campaigns";
import { Campaign } from "@/lib/types";
import { FormEvent, JSX, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { isFuture, format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CampaignViewPage = (): JSX.Element => {
  const params = useParams<{ id: string }>();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const sessionDialogRef = useRef<HTMLDialogElement>(null);
  const sessionViewDialogRef = useRef<HTMLDialogElement>(null);
  const { toast } = useToast();
  const [session, setSession] = useState<number | null>(null);

  const campaignId = params.id;

  useEffect(() => {
    const fetchCampaign = async () => {
      if (campaignId) {
        const response = await getSingleCampaignByIdBasic(Number(campaignId));

        setCampaign(response);
      }
    };

    void fetchCampaign();
  }, [campaignId]);

  const toggleSession = (index: number) => {
    setSession(index);
    sessionViewDialogRef.current?.showModal();
  };

  const handleSessionSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    // get values from form
    const formData = new FormData(e.target as HTMLFormElement);
    const object = Object.fromEntries(formData.entries());
    const result = await addSessionToCampaign(Number(campaignId), object);
    if (result) {
      toast({
        title: "Session added",
        description: "Your session has been successfully added.",
      });
      sessionDialogRef.current?.close();
    } else {
      toast({
        title: "Session failed",
        description: "There was an error adding your session.",
        variant: "destructive",
      });
    }
  };

  if (!campaign) {
    return <div>Loading...</div>;
  }

  const isDM = campaign.user_id === user?.id;

  console.log(isDM);

  return (
    <div className="min-h-screen bg-nebula py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {campaign.name}
            </h1>
            <p className="text-white mb-2">GM: {campaign.gm?.username}</p>
            <p className="text-sm text-white mb-6">
              Created on {new Date(campaign.created_at).toLocaleDateString()} •{" "}
              {campaign.sessions?.length} Sessions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Character Stats */}
          <div className="col-span-5 space-y-6 ">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl text-white font-semibold mb-2">
                  Campaign Description
                </h2>
                <p className="text-white">{campaign.description}</p>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-5 space-y-6">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Players
                </h2>
                <ul className="space-y-2">
                  {campaign.players?.map((player, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-white"
                    >
                      <span>{player.character.name}</span>
                      <Badge className="text-white text-sm">
                        {player.character.class?.name}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-5 space-y-6">
            <Card className="mb-6">
              <CardContent className="p-6 relative">
                <Button
                  type="button"
                  className="absolute right-6"
                  onClick={() => {
                    (
                      document.getElementById(
                        "sessionPopover"
                      ) as HTMLDialogElement
                    ).showModal();
                  }}
                >
                  Add Session
                </Button>
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Sessions
                </h2>
                <ul className="space-y-2 divide-y-2 divide-border mt-6">
                  {campaign.sessions?.map((session, index) => (
                    <li key={session.id} className="text-white pb-2 ">
                      <div className="flex justify-between">
                        <h3
                          className="hover:cursor-pointer"
                          onClick={() => {
                            toggleSession(index);
                          }}
                        >
                          Session {index}: {session.name}
                        </h3>
                        <span>
                          {isFuture(String(session.play_date))
                            ? "Upcoming:"
                            : "Played:"}{" "}
                          {format(String(session.play_date), "PPp")}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          {/*<div className="col-span-5 space-y-6">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {campaign.tags.map((tag, index) => (
                    <Badge key={index}>{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>*/}
        </div>
      </div>
      <dialog id="sessionPopover" popover="auto" ref={sessionDialogRef}>
        <div className="p-6 w-full h-full">
          <form
            className="flex-1 flex flex-col h-full items-stretch w-full gap-6"
            onSubmit={(e) => {
              void handleSessionSubmit(e);
            }}
          >
            <h2 className="text-xl font-semibold mb-4 text-white">
              Add Session
            </h2>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Session Name *
              </label>
              <input
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Session Name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Play Date *
              </label>
              <input
                type="datetime-local"
                name="play_date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Play Date"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Public Notes
              </label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Notes"
                name="notes"
              />
            </div>
            <div className="flex flex-row mt-auto justify-between">
              <button
                type="button"
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  sessionDialogRef.current?.close();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Session
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <dialog id="sessionPopover" popover="auto" ref={sessionViewDialogRef}>
        {session !== null && (
          <div className="p-6 w-full h-full">
            <div className="flex-1 flex flex-col h-full items-stretch w-full gap-6">
              <h1 className="text-white text-xl font-bold border-b w-full border-border">
                Session {session}: {campaign.sessions?.[session]?.name} --{" "}
                {format(campaign.sessions?.[session]?.play_date, "PPPp")}
              </h1>
              <div className="text-white">
                {campaign.sessions?.[session]?.notes}
              </div>
              <div className="flex flex-row mt-auto justify-between">
                <button
                  type="button"
                  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    sessionViewDialogRef.current?.close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default CampaignViewPage;
