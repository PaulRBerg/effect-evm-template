"use client";

import { EffectEvmProvider as BaseEffectEvmProvider } from "@prb/effect-evm/react-hooks";
import type { Config } from "wagmi";

import { makeEffectEvmLayer } from "@/lib/web3";

type Props = {
  children: React.ReactNode;
  config: Config;
};

export function EffectEvmProvider({ children, config }: Props): React.ReactNode {
  const layer = makeEffectEvmLayer(config);
  return <BaseEffectEvmProvider layer={layer}>{children}</BaseEffectEvmProvider>;
}
