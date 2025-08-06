import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { createCampaign } from "@/integrations/supabase/helpers/campaigns";
import { Select } from "@radix-ui/react-select";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface CampaignFormValues {
  name: string;
  setting?: string;
  startingLevel?: number;
  tone?: string;
  themes?: string;
  linesAndVeils?: string;
  safetyTools?: string;
  frequency?: string;
  timeZone?: string;
  timeslot?: string;
  minPlayers?: number;
  maxPlayers?: number;
}

const defaultValues: CampaignFormValues = {
  name: "",
  setting: "",
  startingLevel: 1,
  tone: "",
  themes: "",
  linesAndVeils: "",
  safetyTools: "",
};

const CampaignCreatePage = (): JSX.Element => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<CampaignFormValues>({ defaultValues });
  const [formData, setFormData] = useState<CampaignFormValues>(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNext = async () => {
    const valid = await form.trigger();
    if (valid) {
      setFormData({ ...form.getValues() });
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmitCampaign = async (values: CampaignFormValues) => {
    if (!user) {
      console.error("User not found");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Add your Supabase / API call here
      const { data, error } = await createCampaign({
        ...values,
        user_id: user.id,
      });

      if (!data) {
        console.error("Failed to create campaign");
        throw new Error(error?.message ?? "Unknown error");
      }

      void navigate(`/campaigns/${String(data.id)}`);
    } catch (error) {
      console.error("Error saving Campaign:", error.message);
      toast({
        title: "Error",
        description: `Failed to save Campaign. ${String(error.message)}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderCampaignStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6" key="step1">
            <h3 className="text-xl font-semibold text-white mb-4">
              Campaign Basics
            </h3>
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Campaign name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Campaign Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter campaign name"
                      className="bg-slate-800/50 border-purple-500/50 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="setting"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Setting</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the setting"
                      className="bg-slate-800/50 border-purple-500/50 text-white"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startingLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Starting Level</FormLabel>
                  <Select
                    onValueChange={(val) => {
                      field.onChange(parseInt(val));
                    }}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 10 }).map((_, lvl) => (
                        <SelectItem key={lvl} value={(lvl + 1).toString()}>
                          Level {lvl + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6" key="step2">
            <h3 className="text-xl font-semibold text-white mb-4">
              Themes & Tone
            </h3>
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Tone</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Lighthearted",
                          "Epic",
                          "Grimdark",
                          "Mystery",
                          "Surreal",
                          "Other",
                        ].map((tone) => (
                          <SelectItem key={tone} value={tone}>
                            {tone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="themes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Themes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. exploration, survival, revenge"
                      className="bg-slate-800/50 border-purple-500/50 text-white"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6" key="step3">
            <h3 className="text-xl font-semibold text-white mb-4">
              Safety Tools
            </h3>
            <FormField
              control={form.control}
              name="linesAndVeils"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Lines & Veils</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Topics to avoid or fade to black"
                      className="bg-slate-800/50 border-purple-500/50 text-white"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="safetyTools"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Tools in Use</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. X-Card, Lines & Veils, Stars & Wishes"
                      className="bg-slate-800/50 border-purple-500/50 text-white"
                      rows={2}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6" key="step5">
            <h3 className="text-xl font-semibold text-white mb-4">
              Session Logistics
            </h3>

            {/* Min Players */}
            <FormField
              control={form.control}
              name="minPlayers"
              rules={{ required: "Minimum players is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Minimum Players <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="e.g. 3"
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Max Players */}
            <FormField
              control={form.control}
              name="maxPlayers"
              rules={{ required: "Maximum players is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Maximum Players <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="e.g. 5"
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Zone */}
            <FormField
              control={form.control}
              name="timeZone"
              rules={{ required: "Time zone is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Time Zone <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "UTC−12:00",
                        "UTC−08:00 (PST)",
                        "UTC−05:00 (EST)",
                        "UTC+00:00 (GMT)",
                        "UTC+01:00 (CET)",
                        "UTC+05:30 (IST)",
                        "UTC+08:00 (CST)",
                        "UTC+10:00 (AEST)",
                      ].map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Timeslot */}
            <FormField
              control={form.control}
              name="timeslot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Preferred Timeslot
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g. Fridays at 7PM local time"
                      className="bg-slate-800/50 border-purple-500/50 text-white mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Frequency */}
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Session Frequency
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-800/50 border-purple-500/50 text-white mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["One-Shot", "Weekly", "Biweekly", "Monthly"].map(
                        (option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6" key="step4">
            <h3 className="text-xl font-semibold text-white mb-4">Review</h3>
            <Card className="p-4 bg-slate-800 text-white space-y-2">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Setting:</strong> {formData.setting}
              </p>
              <p>
                <strong>Starting Level:</strong> {formData.startingLevel}
              </p>
              <p>
                <strong>Tone:</strong> {formData.tone}
              </p>
              <p>
                <strong>Themes:</strong> {formData.themes}
              </p>
              <p>
                <strong>Lines & Veils:</strong> {formData.linesAndVeils}
              </p>
              <p>
                <strong>Safety Tools:</strong> {formData.safetyTools}
              </p>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-nebula py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Campaign Builder
          </h1>
          <p className="text-xl text-purple-200">
            Create your Daggerheart Campaign
          </p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? "bg-yellow-400" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Campaign Form */}
        <Card className="bg-linear-to-br from-purple-800/40 to-slate-800/40 border-purple-500/30 backdrop-blur-xs">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              Step {currentStep} of 5
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={(...args) => {
                  void form.handleSubmit(onSubmitCampaign)(...args);
                }}
                className="space-y-8"
              >
                {renderCampaignStep()}

                <div className="flex justify-between pt-6">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}
                  {currentStep < 5 && (
                    <Button
                      type="button"
                      onClick={() => {
                        void handleNext();
                      }}
                      disabled={isLoading}
                    >
                      Next
                    </Button>
                  )}
                  {currentStep === 5 && (
                    <Button type="submit" disabled={isLoading}>
                      Submit Campaign
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignCreatePage;
