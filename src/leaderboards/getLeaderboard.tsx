import { CreateLeaderboardProps } from "@/types";

export async function getLeaderboard({
  deployment,
  label,
  title,
}: CreateLeaderboardProps) {
  try {
    const response = await fetch("/api/getLeaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deployment,
        label,
        title,
      }),
    });

    console.log("response === ", response);

    if (!response.ok) {
      console.error("Failed to fetch leaderboard");
    } else {
      const data = await response.json();
      console.log("Fetch response: ", data);

      return data;
    }
  } catch (error) {
    console.log("fetch error === ", error);
  }
}
