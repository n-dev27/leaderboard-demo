import {
  B3SepoliaLeaderBoardFactoryContractAddress,
  MainnetLeaderBoardFactoryContractAddress,
  LeaderboardABI,
} from "@b3dotfun/leaderboards";
import { backendWallet, engine } from "@/thirdweb/engine";
import { b3, b3Sepolia } from "viem/chains";
import { LeaderboardFunction } from "../lib/fuction";

interface SetScoreProps {
  deployment: "dev" | "prod";
  label: string;
  players: string[];
  scores: number[];
}
export async function setScore({
  deployment,
  label,
  players,
  scores,
}: SetScoreProps) {
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
      functionName: LeaderboardFunction.setScores,
      args: [label, players, scores],
      abi: LeaderboardABI as any,
    },
    false
  );

  console.log("Set scores response:", response);
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
    console.log("Set scores Transaction Successfully completed");
  }
}
