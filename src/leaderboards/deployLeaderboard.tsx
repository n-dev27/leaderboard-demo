import { DeployLeaderboardProps } from "@/types";

export async function deployLeaderboard({
  deployment,
  admin,
  label,
}: DeployLeaderboardProps) {
  try {
    const response = await fetch("/api/deployLeaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deployment,
        admin,
        label,
      }),
    });

    console.log("response === ", response);

    if (!response.ok) {
      console.error("Failed to deploy leaderboard");
    } else {
      const data = await response.json();
      console.log("Deployment response: ", data);

      return data;
    }
  } catch (error) {
    console.log("deploy error === ", error);
  }
}
