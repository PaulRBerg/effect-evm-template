"use client";

import type { LucideIcon } from "lucide-react";
import {
  Code,
  Coins,
  Component,
  Github,
  Layers,
  Package,
  Palette,
  Shield,
  Terminal,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useAccount } from "wagmi";

import { SmartLink } from "@/ui/SmartLink";
import { Timestamp } from "@/ui/Timestamp";
import { TokenBalance, TransferForm } from "@/ui/token";
import { WalletButton } from "@/ui/wallet";

type TechItem = {
  name: string;
  description: string;
  icon: LucideIcon;
  url: string;
  version: string;
};

const TECH_STACK: TechItem[] = [
  {
    description: "React framework",
    icon: Zap,
    name: "Next.js",
    url: "https://nextjs.org",
    version: "v16",
  },
  {
    description: "UI library",
    icon: Component,
    name: "React",
    url: "https://react.dev",
    version: "v19",
  },
  {
    description: "Typed functional effects",
    icon: Layers,
    name: "Effect-ts",
    url: "https://effect.website",
    version: "v3",
  },
  {
    description: "Ethereum library",
    icon: Coins,
    name: "Viem",
    url: "https://viem.sh",
    version: "v2",
  },
  {
    description: "React hooks",
    icon: Layers,
    name: "Wagmi",
    url: "https://wagmi.sh",
    version: "v2",
  },
  {
    description: "Type safety",
    icon: Code,
    name: "TypeScript",
    url: "https://typescriptlang.org",
    version: "v5",
  },
  {
    description: "Utility-first CSS",
    icon: Palette,
    name: "Tailwind CSS",
    url: "https://tailwindcss.com",
    version: "v4",
  },
  {
    description: "Fast runtime",
    icon: Package,
    name: "Bun",
    url: "https://bun.sh",
    version: "",
  },
  {
    description: "Linting & formatting",
    icon: Shield,
    name: "BiomeJS",
    url: "https://biomejs.dev",
    version: "",
  },
  {
    description: "Task runner",
    icon: Terminal,
    name: "Just",
    url: "https://just.systems",
    version: "",
  },
];

function BackgroundDecoration() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
    >
      {/* Top-left: Effect purple orb */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-violet-600/10 to-blue-500/5 blur-3xl" />
      {/* Bottom-right: Blue orb */}
      <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-gradient-to-tl from-blue-500/10 to-violet-600/5 blur-3xl" />
      {/* Center-right: Ethereum accent (lg only) */}
      <div className="absolute top-1/3 right-10 hidden h-64 w-64 rotate-45 bg-gradient-to-br from-[#627eea]/8 to-[#8c8dfc]/5 blur-2xl lg:block" />
    </div>
  );
}

function TechCard({ tech }: { tech: TechItem }) {
  return (
    <SmartLink
      className="rounded-lg border border-black/8 bg-white/50 p-3 transition-colors hover:bg-black/5 dark:border-white/[.145] dark:bg-black/20 dark:hover:bg-white/5"
      href={tech.url}
    >
      <tech.icon className="mb-1 h-5 w-5 text-black dark:text-white" />
      <div className="font-semibold text-sm tracking-tight">
        {tech.name}
        {Boolean(tech.version) && (
          <span className="ml-1 text-gray-600 dark:text-gray-400">{tech.version}</span>
        )}
      </div>
      <div className="mt-0.5 text-gray-600 text-xs dark:text-gray-400">{tech.description}</div>
    </SmartLink>
  );
}

function TechStackSection() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-center font-semibold text-base">Built with Modern Tools</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        {TECH_STACK.map((tech) => (
          <TechCard key={tech.name} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="flex w-full items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          alt="Next.js logo"
          className="h-auto w-32 dark:invert"
          height={0}
          priority
          src="/next.svg"
          width={0}
        />
        <span className="font-semibold text-xl">+ Effect-EVM</span>
      </div>
      <WalletButton />
    </header>
  );
}

function WalletSection() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-3">
          <Layers className="h-10 w-10 text-blue-500" />
          <h1 className="font-bold text-4xl tracking-tight sm:text-5xl">Effect-EVM Template</h1>
        </div>
        <p className="max-w-md text-gray-600 text-lg dark:text-gray-400">
          Connect your wallet to Ethereum view token balances and make transfers.
        </p>
        <SmartLink
          className="flex items-center gap-2 text-gray-500 text-sm transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          href="https://github.com/PaulRBerg/prb-effect"
        >
          <Github className="h-4 w-4" />
          View Source
        </SmartLink>
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">Token Balance</h2>
        <TokenBalance />
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">Transfer Token</h2>
        <TransferForm />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-12 p-8 font-sans">
      <BackgroundDecoration />
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-8">
        <WalletSection />
      </main>
      <footer className="w-full max-w-4xl">
        <TechStackSection />
        <div className="mt-4 flex justify-center">
          <Timestamp label="Template last updated" />
        </div>
      </footer>
    </div>
  );
}
