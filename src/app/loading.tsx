import { DataTableLoading } from "@/components/LeaderboardTable/data-table-skeleton";
import { Shell } from "@/components/shells/shell";

export default function IndexLoading() {
  return (
    <Shell>
      <DataTableLoading columnCount={3} />
    </Shell>
  );
}
