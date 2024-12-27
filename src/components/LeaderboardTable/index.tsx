"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LeaderboardTable from "@/components/LeaderboardTable/LeaderboardTable";
import AdminTable from "./AdminTable";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AddAdminModal from "./AddAdminModal";
import AddPlayersModal from "./AddPlayersModal";
import { Card } from "../ui/card";

export default function Leaderboard({ params }: { params: string }) {
  const router = useRouter();

  const [isAdminLoading, setIsAdminLoading] = useState<boolean>(false);
  const [isPlayersLoading, setIsPlayersLoading] = useState<boolean>(false);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [isAddPlayersModalOpen, setIsAddPlayersModalOpen] = useState(false);
  const [isRefetchAdmin, setIsRefetchAdmin] = useState<boolean>(true);
  const [isRefetchPlayers, setIsRefetchPlayers] = useState<boolean>(true);

  const handleAddAdmin = () => {
    setIsAddAdminModalOpen(true);
  };

  const handleAddPlayers = () => {
    setIsAddPlayersModalOpen(true);
  };

  return (
    <div className="w-full h-screen container mx-auto py-10">
      <div className="w-full flex justify-between gap-4">
        <Button
          onClick={() => router.push("/")}
          size="sm"
          className="px-4 py-2 min-w-[120px]"
        >
          Back to Dashboard
        </Button>
        <div className="flex gap-4">
          <Button
            onClick={() => handleAddAdmin()}
            size="sm"
            className="px-4 py-2 min-w-[120px]"
            disabled={isAdminLoading}
          >
            {isAdminLoading ? (
              <Spinner
                show={isAdminLoading}
                size="small"
                className="text-white"
              />
            ) : (
              "Add Admin"
            )}
          </Button>
          <Button
            onClick={() => handleAddPlayers()}
            size="sm"
            className="px-4 py-2 min-w-[120px]"
            disabled={isPlayersLoading}
          >
            {isPlayersLoading ? (
              <Spinner
                show={isPlayersLoading}
                size="small"
                className="text-white"
              />
            ) : (
              "Add Players"
            )}
          </Button>
        </div>
      </div>
      <div className="w-full flex gap-10 mt-10">
        <Card className="w-full flex flex-col gap-4 p-4">
          <h3 className="text-xl font-bold">Leaderboard Table: {params}</h3>
          <LeaderboardTable
            title={params}
            isRefetchPlayers={isRefetchPlayers}
          />
        </Card>
        <Card className="w-full flex flex-col gap-4 p-4">
          <h3 className="text-xl font-bold">Admin Table: {params}</h3>
          <AdminTable isRefetchAdmin={isRefetchAdmin} />
        </Card>
      </div>
      <AddAdminModal
        isOpen={isAddAdminModalOpen}
        onClose={() => setIsAddAdminModalOpen(false)}
        isRefetchAdmin={isRefetchAdmin}
        setIsRefetchAdmin={setIsRefetchAdmin}
      />
      <AddPlayersModal
        isOpen={isAddPlayersModalOpen}
        onClose={() => setIsAddPlayersModalOpen(false)}
        title={params}
        isRefetchPlayers={isRefetchPlayers}
        setIsRefetchPlayers={setIsRefetchPlayers}
      />
    </div>
  );
}
