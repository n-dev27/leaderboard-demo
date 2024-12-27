import { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdmin } from "@/leaderboards/getAdmin";
import IndexLoading from "@/app/loading";
import { LayoutContext } from "@/app/layout";
import { LayoutContextType } from "@/types";

export default function AdminTable({
  isRefetchAdmin,
}: {
  isRefetchAdmin: boolean;
}) {
  const { label } = useContext<LayoutContextType>(
    LayoutContext as React.Context<LayoutContextType>
  );

  const [addresses, setAddresses] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await getAdmin({
      deployment: "dev",
      label: label!,
    });

    if (response.status) {
      setAddresses(response.status);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [isRefetchAdmin]);

  if (loading) {
    return <IndexLoading />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {addresses.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{item}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
