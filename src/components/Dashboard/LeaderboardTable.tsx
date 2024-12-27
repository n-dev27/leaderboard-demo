import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
}

export default function LeaderboardTable({
  data,
}: {
  data: LeaderboardEntry[];
}) {
  return (
    <Table>
      <TableCaption>Leaderboard Rankings</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((entry) => (
          <TableRow key={entry.rank}>
            <TableCell className="font-medium">{entry.rank}</TableCell>
            <TableCell>{entry.name}</TableCell>
            <TableCell className="text-right">{entry.score}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
