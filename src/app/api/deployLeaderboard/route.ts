import { NextRequest, NextResponse } from "next/server";
import {
  LeaderboardFactoryABI,
  B3SepoliaLeaderBoardFactoryContractAddress,
  MainnetLeaderBoardFactoryContractAddress,
} from "@b3dotfun/leaderboards";
import { b3, b3Sepolia } from "viem/chains";
import { backendWallet, engine } from "@/thirdweb/engine";
import { LeaderboardFunction } from "@/lib/fuction";

export async function POST(req: NextRequest) {
  const { deployment, admin, label } = await req.json();

  const chain = deployment === "dev" ? b3Sepolia : b3;
  const factoryContractAddress =
    deployment === "dev"
      ? B3SepoliaLeaderBoardFactoryContractAddress
      : MainnetLeaderBoardFactoryContractAddress;

  try {
    // Call the deployLeaderboard function
    const response = await engine.contract.write(
      chain?.id.toString(),
      factoryContractAddress,
      backendWallet,
      {
        functionName: LeaderboardFunction.deployLeaderboard,
        args: [admin, label],
        abi: LeaderboardFactoryABI as any,
      },
      false
    );

    // Check the response
    if (!response.result || !response.result.queueId) {
      throw new Error("Invalid response from contract write.");
    }

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
      console.log("Leaderboard Deployment Transaction Successfully Mined");
      return NextResponse.json({
        message: "Deployment successful",
        status: status.result.status,
      });
    } else {
      console.error("Deployment failed with status:", status.result.status);
      return NextResponse.json({
        error: "Deployment failed",
        status: status.result.status,
      });
    }
  } catch (error) {
    console.error("Error deploying leaderboard:", error);
    return NextResponse.json({ error: "Error deploying leaderboard" });
  }
}
