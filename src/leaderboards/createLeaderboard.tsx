import { CreateLeaderboardProps } from "@/types";

export async function createLeaderboard({
  deployment,
  label,
  title,
}: CreateLeaderboardProps) {
  try {
    const response = await fetch("/api/createLeaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deployment,
        label,
        title,
        maxLimit: Number.MAX_SAFE_INTEGER,
        startTime: 0,
        endTime: Number.MAX_SAFE_INTEGER,
      }),
    });

    console.log("response === ", response);

    if (!response.ok) {
      console.error("Failed to create leaderboard");
    } else {
      const data = await response.json();
      console.log("Create response: ", data);

      return data;
    }
  } catch (error) {
    console.log("create error === ", error);
  }
}
