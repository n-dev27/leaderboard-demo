"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DeployLeaderboard from "@/components/Dashboard/DeployLeaderboard";
import CreateLeaderboard from "@/components/Dashboard/CreateLeaderboard";
import ViewLeaderboard from "@/components/Dashboard/ViewLeaderboard";

const steps = [
  { id: 1, title: "Deploy Leaderboard" },
  { id: 2, title: "Create Leaderboard" },
  { id: 3, title: "View Leaderboard" },
];

export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <DeployLeaderboard />;
      case 2:
        return <CreateLeaderboard />;
      case 3:
        return <ViewLeaderboard />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between mb-8">
        {steps.map((step) => (
          <Button
            key={step.id}
            variant="outline"
            className={cn(
              "flex-1 text-center py-2 border-b-2",
              currentStep === step.id
                ? "border-primary text-primary"
                : "border-gray-200 text-gray-500"
            )}
            onClick={() => setCurrentStep(step.id)}
          >
            {step.title}
          </Button>
        ))}
      </div>
      <div className="mt-8">{renderStepContent()}</div>
    </div>
  );
}
