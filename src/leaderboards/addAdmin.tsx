import {
  B3SepoliaLeaderBoardFactoryContractAddress,
  MainnetLeaderBoardFactoryContractAddress,
  LeaderboardABI,
} from "@b3dotfun/leaderboards";
import { backendWallet, engine } from "@/thirdweb/engine";
import { b3, b3Sepolia } from "viem/chains";
import { LeaderboardFunction } from "../lib/fuction";

interface AddAdminProps {
  deployment: "dev" | "prod";
  newAdmin: string;
}
export async function addAdmin({ deployment, newAdmin }: AddAdminProps) {
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
      args: [newAdmin],
      abi: LeaderboardABI as any,
    },
    false
  );

  console.log("Add admin response:", response);
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
    console.log("Add admin Transaction Success");
  }
}
