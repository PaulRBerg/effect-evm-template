import type { Address } from "viem";

import type { SupportedChainId } from "./appkit";
import { mainnet, sepolia } from "./appkit";

type TokenInfo = {
  address: Address;
  decimals: number;
  symbol: string;
};

export function getBlockExplorerTxUrl(chainId: SupportedChainId, txHash: string): string {
  const subdomain = chainId === mainnet.id ? "" : "sepolia.";
  return `https://${subdomain}etherscan.io/tx/${txHash}`;
}

export function isSupportedChainId(chainId: number): chainId is SupportedChainId {
  return chainId === mainnet.id || chainId === sepolia.id;
}

export const DEMO_TOKENS = {
  [mainnet.id]: {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
    symbol: "USDC",
  },
  [sepolia.id]: {
    address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    decimals: 6,
    symbol: "USDC",
  },
} as const satisfies Record<SupportedChainId, TokenInfo>;
