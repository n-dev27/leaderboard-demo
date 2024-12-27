"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { getLeaderboard } from "@/leaderboards/getLeaderboard";

export default function ViewLeaderboard() {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleView = async () => {
    if (!label || !title) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    setIsLoading(true);

    const response = await getLeaderboard({
      deployment: "dev",
      label: label,
      title: title,
    });

    console.log("response === ", response);

    if (response.status) {
      toast({
        title: "Leaderboard fetched successfully",
        description: "Your leaderboard has been fetched successfully",
      });
      localStorage.setItem("label", label);
      localStorage.setItem("status", JSON.stringify(response.status));
      router.push(`/${title}`);
    } else {
      toast({
        title: "Leaderboard fetch failed",
        description: "Please try again",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">View Leaderboard</h2>
      {error && <p className="text-red-500">{error}</p>}{" "}
      <div className="space-y-2">
        <Label htmlFor="view-input">Label</Label>
        <Input
          id="view-input"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="view-input">Leaderboard Title</Label>
        <Input
          id="view-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
