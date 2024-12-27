"use client";

import Leaderboard from "@/components/LeaderboardTable";

export default async function LeaderboardPage({ params }: { params: any }) {
  return <Leaderboard params={params.title} />;
}
