import { NextRequest, NextResponse } from "next/server";
import {
  LeaderboardABI,
  B3SepoliaLeaderBoardFactoryContractAddress,
  MainnetLeaderBoardFactoryContractAddress,
} from "@b3dotfun/leaderboards";
import { b3, b3Sepolia } from "viem/chains";
import { backendWallet, engine } from "@/thirdweb/engine";
import { LeaderboardFunction } from "@/lib/fuction";

export async function POST(req: NextRequest) {
  const { deployment, label, newAdmin } = await req.json();

  const chain = deployment === "dev" ? b3Sepolia : b3;
  const factoryContractAddress =
    deployment === "dev"
      ? B3SepoliaLeaderBoardFactoryContractAddress
      : MainnetLeaderBoardFactoryContractAddress;

  try {
    // Get the leaderboard address from factory contract
    const leaderboardAddress = await engine.contract.read(
      LeaderboardFunction.getLeaderBoardAddress,
      chain?.id.toString(),
      factoryContractAddress,
      label
    );

    console.log("address === ", leaderboardAddress);

    if (leaderboardAddress?.result) {
      // Call the createLeaderboard function
      const response = await engine.contract.write(
        chain?.id.toString(),
        leaderboardAddress.result,
        backendWallet!,
        {
          functionName: LeaderboardFunction.addAdmin,
          args: [newAdmin],
          abi: LeaderboardABI as any,
        },
        false
      );

      console.log("response === ", response);

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

      console.log("statsu !!!!!!!!!! ", status);

      if (status.result.status === "mined") {
        console.log("Leaderboard Create Transaction Successfully Mined");
        return NextResponse.json({
          message: "Create successful",
          status: status.result.status,
        });
      } else {
        console.error("Create failed with status:", status.result.status);
        return NextResponse.json({
          error: "Create failed",
          status: status.result.status,
        });
      }
    } else {
      console.error("Leaderboard address not found");
      return NextResponse.json({ error: "Leaderboard address not found" });
    }
  } catch (error) {
    console.error("Error creating leaderboard:", error);
    return NextResponse.json({ error: "Error creating leaderboard" });
  }
}
