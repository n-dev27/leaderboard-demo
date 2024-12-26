"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { createLeaderboard } from "@/leaderboards/createLeaderboard";

export default function CreateLeaderboard() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleCreate = async () => {
    if (!label || !title) {
      setError("Field is required.");
      return;
    }
    setError("");
    setIsLoading(true);

    const response = await createLeaderboard({
      deployment: "dev",
      label: label,
      title: title,
    });

    if (response.status === "mined") {
      toast({
        title: "Leaderboard created successfully",
        description: "Your leaderboard has been created successfully",
      });
    } else {
      toast({
        title: "Leaderboard create failed",
        description: "Please try again",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Create Leaderboard</h2>
      {error && <p className="text-red-500">{error}</p>}{" "}
      <div className="space-y-2">
        <Label htmlFor="create-input">Label</Label>
        <Input
          id="create-input"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="create-input">Leaderboard Title</Label>
        <Input
          id="create-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <Button
        onClick={() => handleCreate()}
        size="sm"
        className="px-4 py-2 min-w-[180px]"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner show={isLoading} size="small" className="text-white" />
        ) : (
          "Create Leaderboard"
        )}
      </Button>
    </div>
  );
}
