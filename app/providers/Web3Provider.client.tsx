"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Cause, Effect, Exit } from "effect";
import { useEffect, useState } from "react";
import type { Config } from "wagmi";
import { WagmiProvider } from "wagmi";

import { AppKitService, createAppKitLayer } from "@/lib/web3";
import { ReownSetupGuide } from "@/ui/setup";
import { EffectEvmProvider } from "./EffectEvmProvider.client";

type Props = {
  children: React.ReactNode;
};

export function Web3Provider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const layer = createAppKitLayer();
    const program = Effect.map(AppKitService, (appKit) => appKit.wagmiConfig);
    const runnable = Effect.provide(program, layer);

    void Effect.runPromiseExit(runnable).then((exit) => {
      if (Exit.isSuccess(exit)) {
        setWagmiConfig(exit.value);
      } else {
        const squashed = Cause.squash(exit.cause);
        console.error("Web3 init failed:", Cause.pretty(exit.cause));
        const message = squashed instanceof Error ? squashed.message : String(squashed);
        setError(`Failed to initialize Web3: ${message}`);
      }
    });
  }, []);

  if (error) {
    if (error.includes("NEXT_PUBLIC_REOWN_PROJECT_ID")) {
      return <ReownSetupGuide />;
    }
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!wagmiConfig) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading Web3...</div>
      </div>
    );
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <EffectEvmProvider config={wagmiConfig}>{children}</EffectEvmProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
