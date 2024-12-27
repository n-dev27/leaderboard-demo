import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LeaderboardTable() {
  const rawData = localStorage.getItem("status");
  const data = JSON.parse(rawData || "[]");

  const addresses = data[0] || [];
  const scores = data[1] || [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Address</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {addresses.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item}</TableCell>
            <TableCell className="text-right">{scores[index] || "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
