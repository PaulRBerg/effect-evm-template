"use client";

import { BalanceService } from "@prb/effect-evm";
import { useStreamEffect } from "@prb/effect-evm/react-hooks";
import { Effect, Schedule, Stream } from "effect";
import { formatUnits } from "viem";
import { useAccount, useChainId } from "wagmi";

import type { SupportedChainId } from "@/lib/web3";
import { DEMO_TOKENS } from "@/lib/web3";

export function TokenBalance() {
  const { address } = useAccount();
  const chainId = useChainId() as SupportedChainId;
  const token = DEMO_TOKENS[chainId];

  const { status, value: balance } = useStreamEffect(() => {
    if (!address || !token) {
      return Effect.succeed(Stream.empty);
    }
    return Effect.map(BalanceService, (balanceService) =>
      Stream.repeatEffect(
        balanceService.getTokenBalance({
          address,
          chainId,
          tokenAddress: token.address,
        })
      ).pipe(Stream.schedule(Schedule.spaced("10 seconds")))
    );
  }, [address, chainId, token]);

  if (!address) {
    return <div className="text-gray-500">Connect wallet to view balance</div>;
  }

  if (!token) {
    return <div className="text-gray-500">Switch to a supported network</div>;
  }

  if (status === "starting") {
    return <div className="animate-pulse text-gray-500">Loading balance...</div>;
  }

  if (status === "error") {
    return <div className="text-red-500">Failed to load balance</div>;
  }

  const formattedBalance = balance ? formatUnits(balance, token.decimals) : "0";

  return (
    <div className="flex flex-col gap-1">
      <div className="text-gray-500 text-sm">Your {token.symbol} Balance</div>
      <div className="font-mono font-semibold text-2xl">
        {formattedBalance} {token.symbol}
      </div>
    </div>
  );
}
