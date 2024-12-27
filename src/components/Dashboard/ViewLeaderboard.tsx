"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LayoutContext } from "@/app/layout";
import { LayoutContextType } from "@/types";

export default function ViewLeaderboard() {
  const router = useRouter();

  const { label, setLabel } = useContext<LayoutContextType>(
    LayoutContext as React.Context<LayoutContextType>
  );

  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleView = async () => {
    if (!label || !title) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    localStorage.setItem("label", label);
    router.push(`/${title}`);
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
      >
        View Leaderboard
      </Button>
    </div>
  );
}
