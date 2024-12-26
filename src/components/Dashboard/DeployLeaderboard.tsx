"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { deployLeaderboard } from "@/leaderboards/deployLeaderboard";

export default function DeployLeaderboard() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const [admin, setAdmin] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleDeploy = async () => {
    if (!label || !admin) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    setIsLoading(true);
    const response = await deployLeaderboard({
      deployment: "dev",
      admin: admin,
      label: label,
    });

    if (response.status === "mined") {
      toast({
        title: "Leaderboard deployed successfully",
        description: "Your leaderboard has been deployed successfully",
      });
    } else {
      toast({
        title: "Leaderboard deployment failed",
        description: "Please try again",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Deploy Leaderboard</h2>
      {error && <p className="text-red-500">{error}</p>}{" "}
      <div className="space-y-2">
        <Label htmlFor="deploy-input">Label</Label>
        <Input
          id="deploy-input"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="deploy-number">Admin Wallet Address</Label>
        <Input
          id="deploy-number"
          value={admin}
          onChange={(e) => setAdmin(e.target.value)}
        />
      </div>
      <Button
        onClick={() => handleDeploy()}
        size="sm"
        className="px-4 py-2 min-w-[180px]"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner show={isLoading} size="small" className="text-white" />
        ) : (
          "Deploy Leaderboard"
        )}
      </Button>
    </div>
  );
}
