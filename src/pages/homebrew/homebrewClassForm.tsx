import { JSX, useState, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ClassBasicInfo from "@/components/homebrew/ClassBasicInfo";
import ClassStats from "@/components/homebrew/ClassStats";
import ClassFeatures from "@/components/homebrew/ClassFeatures";
import ClassDomains from "@/components/homebrew/ClassDomains";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { Feature } from "@/lib/types";
import { createNewHomebrewClass } from "@/integrations/supabase/helpers/classes";

interface ClassFormData {
  name: string;
  description: string;
  base_hp: number;
  base_evasion: number;
  class_items: string;
  features: Partial<Feature>[];
  domains: number[];
  isHomebrew: true;
}

const HomebrewClassForm = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ClassFormData>({
    defaultValues: {
      isHomebrew: true,
    },
  });

  const steps = [
    { title: "Basic Info", component: ClassBasicInfo },
    { title: "Stats & Items", component: ClassStats },
    { title: "Features", component: ClassFeatures },
    { title: "Domains", component: ClassDomains },
  ];

  const onSubmit = async (formData: ClassFormData) => {
    setSubmitting(true);
    const data = await createNewHomebrewClass(formData);

    console.log(data);
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
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-slate-900 py-8 px-4">
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
            Homebrew Class Builder
          </h1>
          <p className="text-xl text-purple-200">
            Create your custom Daggerheart class
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
        <Card className="bg-slate-800/50 border-brand-500/30 backdrop-blur-sm">
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
                      Save Class
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

export default HomebrewClassForm;
