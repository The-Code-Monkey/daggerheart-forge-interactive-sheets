import { JSX, useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DomainBasicInfo from "@/components/homebrew/Domain/DomainBasicInfo";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  createNewHomebrewDomain,
  DomainFormData,
} from "@/integrations/supabase/helpers/domains";
import { useAuth } from "@/contexts/AuthContext";

const HomebrewDomainForm = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<DomainFormData>({
    defaultValues: {
      user_id: user?.id ?? "",
    },
  });

  const steps = [{ title: "Basic Info", component: DomainBasicInfo }];

  const onSubmit = async (formData: DomainFormData) => {
    setSubmitting(true);
    const data = await createNewHomebrewDomain({
      ...formData,
      user_id: String(user?.id),
    });

    console.log(data);

    if (data) {
      void navigate(`/homebrewed/domain`);
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
            Homebrew Domain Builder
          </h1>
          <p className="text-xl text-purple-200">
            Create your custom Daggerheart domain
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
                      Save Domain
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

export default HomebrewDomainForm;
