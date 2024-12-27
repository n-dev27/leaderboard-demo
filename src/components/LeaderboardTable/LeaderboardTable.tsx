import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLeaderboard } from "@/leaderboards/getLeaderboard";
import IndexLoading from "@/app/loading";
import { LayoutContext } from "@/app/layout";
import { LayoutContextType } from "@/types";

export default function LeaderboardTable({
  title,
  isRefetchPlayers,
}: {
  title: string;
  isRefetchPlayers: boolean;
}) {
  const { label } = useContext<LayoutContextType>(
    LayoutContext as React.Context<LayoutContextType>
  );

  const [addresses, setAddresses] = useState<[]>([]);
  const [scores, setScores] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const response = await getLeaderboard({
        deployment: "dev",
        label: label,
        title: title,
      });

      if (response.status) {
        setAddresses(response.status[0]);
        setScores(response.status[1]);
      }
      setLoading(false);
    };
    fetch();
  }, [isRefetchPlayers]);

  if (loading) {
    return <IndexLoading />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
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
