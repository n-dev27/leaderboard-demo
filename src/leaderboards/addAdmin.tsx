import { AddAdminProps } from "@/types";

export async function addAdmin({ deployment, label, newAdmin }: AddAdminProps) {
  try {
    const response = await fetch("/api/addAdmin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deployment,
        label,
        newAdmin,
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
