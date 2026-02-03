"use client";

import dynamic from "next/dynamic";

const Web3ProviderClient = dynamic(
  () => import("./Web3Provider.client").then((mod) => mod.Web3Provider),
  {
    ssr: false,
  }
);

type Props = {
  children: React.ReactNode;
};

export function Web3Provider({ children }: Props) {
  return <Web3ProviderClient>{children}</Web3ProviderClient>;
}
