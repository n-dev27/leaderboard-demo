import { notFound } from "next/navigation";
import LeaderboardTable from "@/components/Dashboard/LeaderboardTable";

// This would be replaced with a real data fetching function
async function getLeaderboardData(id: string) {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data
  const data = [
    { rank: 1, name: "Alice", score: 1000 },
    { rank: 2, name: "Bob", score: 950 },
    { rank: 3, name: "Charlie", score: 900 },
    { rank: 4, name: "David", score: 850 },
    { rank: 5, name: "Eve", score: 800 },
  ];

  return { id, data };
}

export default async function LeaderboardPage({
  params,
}: {
  params: { leaderboardId: string };
}) {
  const leaderboardData = await getLeaderboardData(params.leaderboardId);

  if (!leaderboardData) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">
        Leaderboard: {leaderboardData.id}
      </h1>
      <LeaderboardTable data={leaderboardData.data} />
    </div>
  );
}
