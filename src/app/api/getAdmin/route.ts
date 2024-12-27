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
  const { deployment, label } = await req.json();

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

    if (leaderboardAddress?.result) {
      // Call the createLeaderboard function
      const response = await engine.contract.read(
        LeaderboardFunction.getAdmin,
        chain?.id.toString(),
        leaderboardAddress.result
      );

      console.log("response === ", response);

      // Check the response
      if (!response.result) {
        throw new Error("Invalid response from contract write.");
      }

      return NextResponse.json({
        message: "Fetch successful",
        status: response.result,
      });
    } else {
      return NextResponse.json({
        message: "Leaderboard address not found",
      });
    }
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json({ error: "Error fetching leaderboard" });
  }
}
