import {
  B3SepoliaLeaderBoardFactoryContractAddress,
  MainnetLeaderBoardFactoryContractAddress,
  LeaderboardABI,
} from "@b3dotfun/leaderboards";
import { backendWallet, engine } from "@/thirdweb/engine";
import { b3, b3Sepolia } from "viem/chains";
import { LeaderboardFunction } from "../lib/fuction";

interface UpdateLeaderboardProps {
  deployment: "dev" | "prod";
  label: string;
  maxLimit: number;
  startTime: number;
  endTime: number;
}
export async function updateLeaderboard({
  deployment,
  label,
  maxLimit,
  startTime,
  endTime,
}: UpdateLeaderboardProps) {
  const chain = deployment === "dev" ? b3Sepolia : b3;
  const contractAddress =
    deployment === "dev"
      ? B3SepoliaLeaderBoardFactoryContractAddress
      : MainnetLeaderBoardFactoryContractAddress;

  console.log("backendWallet === ", backendWallet);

  const response = await engine.contract.write(
    chain?.id.toString(),
    contractAddress,
    backendWallet!,
    {
      functionName: LeaderboardFunction.updateLeaderboard,
      args: [label, maxLimit, startTime, endTime],
      abi: LeaderboardABI as any,
    },
    false
  );

  console.log("Update leaderboard response:", response);
  const queueId = response.result.queueId;

  let status;
  do {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    status = await engine.transaction.status(queueId);
  } while (
    status.result.status === "queued" ||
    status.result.status === "sent"
  );

  if (status.result.status === "mined") {
    console.log("Leaderboard Update Transaction Successfully completed");
  }
}
