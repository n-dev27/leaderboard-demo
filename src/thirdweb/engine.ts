import { Engine } from "@thirdweb-dev/engine";

export const engine = new Engine({
  url: process.env.NEXT_THIRDWEB_ENGINE_URL!,
  accessToken: process.env.NEXT_THIRDWEB_ENGINE_TOKEN!,
});

export const backendWallet = process.env.NEXT_THIRDWEB_ENGINE_BACKEND_WALLET!;
