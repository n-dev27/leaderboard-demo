"use client";

import { notFound } from "next/navigation";
import Leaderboard from "@/components/LeaderboardTable";

export default async function LeaderboardPage({ params }: { params: any }) {
  console.log("params === ", params);

  return <Leaderboard params={params.title} />;
}
