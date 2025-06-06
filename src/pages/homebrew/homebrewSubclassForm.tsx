import { JSX, useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BasicInfo from "@/components/homebrew/Subclass/BasicInfo";
import FoundationFeatures from "@/components/homebrew/Subclass/FoundationFeatures";
import {
  createNewHomebrewSubclass,
  NewSubclassFormData,
} from "@/integrations/supabase/helpers/classes";

const HomebrewSubclassForm = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      isHomebrew: true,
    },
  });

  const steps = [
    { title: "Basic Info", component: BasicInfo },
    { title: "Foundation Features", component: FoundationFeatures },
  ];

  const onSubmit = async (formData: NewSubclassFormData) => {
    setSubmitting(true);
    const data = await createNewHomebrewSubclass({
      ...formData,
// Validate that the user is authenticated before sending the form
if (!user?.id) {
  console.error('User not authenticated');
  setSubmitting(false);
  return;
}

const data = await createNewHomebrewSubclass({
  ...formData,
  user_id: String(user.id),
});
    });

    if (data) {
      void navigate(`/rules/subclass/${String(data.id)}`);
    }
  };

  const nextStep = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-nebula py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/homebrew"
            className="inline-flex items-center text-purple-200 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homebrew
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">
            Homebrew Subclass Builder
          </h1>
          <p className="text-xl text-purple-200">
            Create your custom Daggerheart subclass
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? "bg-brand-500 text-white"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 text-sm ${
                    index <= currentStep ? "text-white" : "text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-4 ${
                      index < currentStep ? "bg-brand-500" : "bg-slate-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="bg-slate-800/50 border-brand-500/30 backdrop-blur-xs">
          <CardHeader>
            <CardTitle className="text-white text-2xl">
              {steps[currentStep].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={(...args) => {
                  void form.handleSubmit(onSubmit)(...args);
                }}
                className="space-y-6"
              >
                <CurrentStepComponent form={form} />

                <Separator className="bg-brand-500/20" />

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    variant="outline"
                    className="text-brand-400 border-brand-400 hover:bg-brand-400 hover:text-white disabled:opacity-50"
                  >
                    Previous
                  </Button>

                  {currentStep === steps.length - 1 && (
                    <Button
                      type="submit"
                      className="bg-brand-500 hover:bg-brand-600 text-white"
                      disabled={submitting}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Subclass
                    </Button>
                  )}
                  {currentStep < steps.length - 1 && (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-brand-500 hover:bg-brand-600 text-white"
                    >
                      Next
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

export default HomebrewSubclassForm;
