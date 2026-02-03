"use client";

import type { TxState } from "@prb/effect-evm";
import { ContractPipeline } from "@prb/effect-evm";
import { useEffectMemo, useStream } from "@prb/effect-evm/react-hooks";
import { Effect, Scope, Stream } from "effect";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Address } from "viem";
import { erc20Abi, isAddress, parseUnits, zeroAddress } from "viem";
import { useAccount, useChainId } from "wagmi";

import { DEMO_TOKENS, getBlockExplorerTxUrl, isSupportedChainId } from "@/lib/web3";
import { Button } from "@/ui/Button";
import { SmartLink } from "@/ui/SmartLink";

const initialTxState: TxState = { status: "idle" };

function parseSafeUnits(value: string, decimals: number): bigint {
  if (!value) {
    return 0n;
  }
  try {
    return parseUnits(value, decimals);
  } catch {
    return 0n;
  }
}

export function TransferForm() {
  const { address } = useAccount();
  const rawChainId = useChainId();
  const chainId = isSupportedChainId(rawChainId) ? rawChainId : null;
  const token = chainId ? DEMO_TOKENS[chainId] : null;

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [submitTrigger, setSubmitTrigger] = useState(0);

  const isValidRecipient = recipient && isAddress(recipient) && recipient !== zeroAddress;

  const parsedAmount = parseSafeUnits(amount, token?.decimals ?? 0);

  const { data: trackData, status: effectStatus } = useEffectMemo(
    () =>
      Effect.gen(function* () {
        if (!address || !chainId || !token || !recipient || !parsedAmount || submitTrigger === 0) {
          return null;
        }

        const scope = yield* Scope.make();
        const pipeline = yield* ContractPipeline;

        const { stateRef, result } = yield* pipeline
          .writeAndTrack({
            abi: erc20Abi,
            account: address,
            address: token.address,
            args: [recipient as Address, parsedAmount],
            chainId,
            functionName: "transfer",
          })
          .pipe(Scope.extend(scope));

        // Run the result effect in the background (forks and waits for completion)
        yield* Effect.forkScoped(result);

        return { stateRef };
      }),
    [address, chainId, parsedAmount, recipient, submitTrigger, token]
  );

  const stateStream = trackData?.stateRef?.changes ?? Stream.empty;

  const { value: txState = initialTxState } = useStream(stateStream, {
    initial: initialTxState,
  });

  const { status } = txState;
  const isSubmitting = status === "signing" || status === "submitted" || status === "pending";
  const isConfirmed = status === "mined";
  const isFailed = status === "failed" || effectStatus === "error";
  const txHash = "hash" in txState ? txState.hash : null;

  useEffect(() => {
    if (isConfirmed) {
      setRecipient("");
      setAmount("");
      setSubmitTrigger(0);
    }
  }, [isConfirmed]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address || !token || !isValidRecipient || !amount || parsedAmount <= 0n) {
      return;
    }
    setSubmitTrigger((prev) => prev + 1);
  }

  if (!address) {
    return null;
  }

  if (!token) {
    return <div className="text-gray-500">Switch to a supported network to transfer</div>;
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm" htmlFor="recipient">
          Recipient Address
        </label>
        <input
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          disabled={isSubmitting}
          id="recipient"
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="0x..."
          type="text"
          value={recipient}
        />
        {recipient && !isValidRecipient && (
          <span className="text-red-500 text-sm">Please enter a valid Ethereum address</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium text-sm" htmlFor="amount">
          Amount ({token.symbol})
        </label>
        <input
          className="rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900"
          disabled={isSubmitting}
          id="amount"
          min="0"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          step="any"
          type="number"
          value={amount}
        />
      </div>

      <Button
        disabled={isSubmitting || !isValidRecipient || !amount || parsedAmount <= 0n}
        type="submit"
        variant="primary"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {status === "signing" ? "Signing..." : "Confirming..."}
          </>
        ) : (
          <>
            <ArrowRight className="h-4 w-4" />
            Transfer {token.symbol}
          </>
        )}
      </Button>

      {isConfirmed && txHash && chainId && (
        <div className="rounded-lg bg-green-50 p-3 text-green-800 text-sm dark:bg-green-900/20 dark:text-green-400">
          Transaction confirmed!{" "}
          <SmartLink className="underline" href={getBlockExplorerTxUrl(chainId, txHash)}>
            View on Etherscan
          </SmartLink>
        </div>
      )}

      {isFailed && (
        <div className="rounded-lg bg-red-50 p-3 text-red-800 text-sm dark:bg-red-900/20 dark:text-red-400">
          Transaction failed. Please try again.
        </div>
      )}
    </form>
  );
}
