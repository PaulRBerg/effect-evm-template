import type { AppKitNetwork } from "@reown/appkit/networks";

import { mainnet, sepolia } from "viem/chains";

export { mainnet, sepolia } from "viem/chains";

export function getAppKitChains(): [AppKitNetwork, ...AppKitNetwork[]] {
  return [mainnet, sepolia];
}

export type SupportedChainId = typeof mainnet.id | typeof sepolia.id;
