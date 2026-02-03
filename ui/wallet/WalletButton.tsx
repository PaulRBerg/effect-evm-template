"use client";

import { useAppKit } from "@reown/appkit/react";
import { Wallet } from "lucide-react";
import { useAccount, useDisconnect } from "wagmi";

import { Button } from "@/ui/Button";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm">{truncateAddress(address)}</span>
        <Button onClick={() => disconnect()} size="sm" variant="ghost">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => open()} size="md" variant="primary">
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
