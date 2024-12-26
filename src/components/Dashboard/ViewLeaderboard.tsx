"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";

export default function ViewLeaderboard() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [leaderboardId, setLeaderboardId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleView = () => {
    if (!leaderboardId) {
      setError("Field is required.");
      return;
    }
    setError("");
    setIsLoading(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">View Leaderboard</h2>
      {error && <p className="text-red-500">{error}</p>}{" "}
      <div className="space-y-2">
        <Label htmlFor="view-input">Leaderboard Name</Label>
        <Input
          id="view-input"
          value={leaderboardId}
          onChange={(e) => setLeaderboardId(e.target.value)}
        />
      </div>
      <Button
        onClick={() => handleView()}
        size="sm"
        className="px-4 py-2 min-w-[180px]"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner show={isLoading} size="small" className="text-white" />
        ) : (
          "View Leaderboard"
        )}
      </Button>
    </div>
  );
}
