import {
  B3SepoliaLeaderBoardFactoryContractAddress,
  MainnetLeaderBoardFactoryContractAddress,
  LeaderboardABI,
} from "@b3dotfun/leaderboards";
import { backendWallet, engine } from "@/thirdweb/engine";
import { b3, b3Sepolia } from "viem/chains";
import { LeaderboardFunction } from "../lib/fuction";

interface RemoveAdminProps {
  deployment: "dev" | "prod";
  admin: string;
}
export async function addAdmin({ deployment, admin }: RemoveAdminProps) {
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
      functionName: LeaderboardFunction.addAdmin,
      args: [admin],
      abi: LeaderboardABI as any,
    },
    false
  );

  console.log("Remove admin response:", response);
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
    console.log("Remove admin Transaction Success!");
  }
}
