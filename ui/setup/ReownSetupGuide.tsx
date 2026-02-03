"use client";

import { ExternalLink, Key, Settings } from "lucide-react";

import { SmartLink } from "@/ui/SmartLink";

const steps = [
  {
    description: (
      <>
        Visit{" "}
        <SmartLink
          className="inline-flex items-center gap-1 font-medium text-amber-700 hover:underline dark:text-amber-300 dark:hover:text-amber-200"
          href="https://cloud.reown.com"
        >
          cloud.reown.com
          <ExternalLink className="size-3.5" />
        </SmartLink>{" "}
        and sign in or create a free account.
      </>
    ),
    title: "Go to Reown Cloud",
  },
  {
    description: 'Click "Create Project" and give it a name (e.g., "My DApp").',
    title: "Create a new project",
  },
  {
    description: "Find your Project ID in the project dashboard and copy it.",
    title: "Copy the Project ID",
  },
  {
    description: (
      <>
        Create a{" "}
        <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-sm dark:bg-amber-400/10 dark:text-amber-200">
          .env.local
        </code>{" "}
        file in your project root with:
        <pre className="mt-2 overflow-x-auto rounded-lg bg-amber-100 p-3 font-mono text-sm dark:bg-neutral-950 dark:text-neutral-200">
          NEXT_PUBLIC_REOWN_PROJECT_ID=your_project_id_here
        </pre>
      </>
    ),
    title: "Add to environment",
  },
  {
    description: (
      <>
        Stop the server (
        <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-sm dark:bg-amber-400/10 dark:text-amber-200">
          Ctrl+C
        </code>
        ) and run{" "}
        <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-sm dark:bg-amber-400/10 dark:text-amber-200">
          just dev
        </code>{" "}
        again.
      </>
    ),
    title: "Restart the dev server",
  },
];

export function ReownSetupGuide() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 p-4 dark:bg-neutral-950">
      <div className="w-full max-w-lg rounded-xl border border-amber-300 bg-white p-6 shadow-lg dark:border-amber-900/60 dark:bg-neutral-900/70 dark:shadow-[0_0_0_1px_rgba(251,191,36,0.08)]">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-amber-100 ring-1 ring-amber-300 dark:bg-amber-900/60 dark:ring-amber-500/20">
            <Key className="size-5 text-amber-600 dark:text-amber-200" />
          </div>
          <div>
            <h1 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              Reown Project ID Required
            </h1>
            <p className="text-neutral-600 text-sm dark:text-neutral-400">
              Complete the setup to connect wallets
            </p>
          </div>
        </div>

        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li className="flex gap-3" key={step.title}>
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-500 font-medium text-sm text-white dark:bg-amber-400/20 dark:text-amber-200 dark:ring-1 dark:ring-amber-400/40">
                {index + 1}
              </span>
              <div className="pt-0.5">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">{step.title}</p>
                <div className="mt-1 text-neutral-600 text-sm leading-relaxed dark:text-neutral-300">
                  {step.description}
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-neutral-700 text-sm dark:border-amber-900/50 dark:bg-neutral-800/70 dark:text-neutral-300">
          <Settings className="size-4 shrink-0" />
          <span>
            Need help? Check the{" "}
            <SmartLink
              className="font-medium text-amber-700 hover:underline dark:text-amber-300 dark:hover:text-amber-200"
              href="https://docs.reown.com/appkit/next/core/installation"
            >
              Reown AppKit docs
            </SmartLink>
            .
          </span>
        </div>
      </div>
    </div>
  );
}
