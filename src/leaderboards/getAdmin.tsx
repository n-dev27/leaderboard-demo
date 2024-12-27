import { GetAdminProps } from "@/types";

export async function getAdmin({ deployment, label }: GetAdminProps) {
  try {
    const response = await fetch("/api/getAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deployment,
        label,
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
