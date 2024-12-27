"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LeaderboardTable from "@/components/LeaderboardTable/LeaderboardTable";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import AddAdminModal from "./AddAdminModal";
import AddPlayersModal from "./AddPlayersModal";

export default function Leaderboard({ params }: { params: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const [isAdminLoading, setIsAdminLoading] = useState<boolean>(false);
  const [isPlayersLoading, setIsPlayersLoading] = useState<boolean>(false);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [isAddPlayersModalOpen, setIsAddPlayersModalOpen] = useState(false);

  const handleAddAdmin = () => {
    setIsAddAdminModalOpen(true);
  };

  const handleAddPlayers = () => {
    setIsAddPlayersModalOpen(true);
  };

  console.log("params === ", params);

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
        <h1 className="text-3xl font-bold mb-8">Leaderboard: {params}</h1>
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
      <LeaderboardTable />
      <AddAdminModal
        isOpen={isAddAdminModalOpen}
        onClose={() => setIsAddAdminModalOpen(false)}
      />
      <AddPlayersModal
        isOpen={isAddPlayersModalOpen}
        onClose={() => setIsAddPlayersModalOpen(false)}
        title={params}
      />
    </div>
  );
}
