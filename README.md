# Effect EVM Template [![NextJS][next-badge]][next] [![TypeScript Version][typescript-badge]][typescript-url] [![License: MIT][license-badge]][license-url]

[next]: https://nextjs.org/
[next-badge]: https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white
[typescript-badge]: https://img.shields.io/badge/typescript-5.9-blue
[typescript-url]: https://www.typescriptlang.org/
[license-badge]: https://img.shields.io/badge/License-MIT-orange.svg
[license-url]: https://opensource.org/licenses/MIT

An opinionated Next.js template for Ethereum apps built with Effect, Reown AppKit, Wagmi, and Viem.

## What's Inside

- **[Effect v3](https://effect.website)** — typed functional effects
- **[Effect-Next](https://github.com/PaulRBerg/effect-next)** — Effect handlers for Next.js
- **[Effect-EVM](https://github.com/PaulRBerg/effect-evm)** — Effect layer for Wagmi
- **[Reown AppKit](https://reown.com/appkit)** — wallet connection UI
- **[Wagmi v2](https://wagmi.sh)** and **[Viem v2](https://viem.sh)** — Ethereum hooks + client
- **[TanStack Query](https://tanstack.com/query/latest)** — server state
- **[Next.js v16](https://nextjs.org)** — App Router with React v19
- **[Tailwind CSS v4](https://tailwindcss.com)** — styling
- **[Bun](https://bun.sh)**, **[ni](https://github.com/antfu-collective/ni)**, **[Just](https://just.systems)** — tooling
- **[BiomeJS](https://biomejs.dev)** and **[Prettier](https://prettier.io)** — linting/formatting
- **[Husky](https://typicode.github.io/husky)** — git hooks
- **[Vercel](https://vercel.com)** — deploy workflow
- **[`AGENTS.md`](./AGENTS.md)** — AI agent instructions

## Getting Started

Click [`Use this template`](https://github.com/PaulRBerg/effect-evm-template/generate) to create a new repository.

Or clone manually:

```bash
git clone git@github.com:PaulRBerg/effect-evm-template.git my-app
cd my-app
```

Install dependencies and list tasks:

```bash
ni
na husky
just --list
```

## Environment Variables

Create `.env.local` from `.env.example` and set:

- `NEXT_PUBLIC_REOWN_PROJECT_ID` — required for wallet connect
- `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `VERCEL_TOKEN` — required for `just deploy` and CI

## Usage

Start the dev server:

```bash
just dev
```

Connect a wallet to view balances and make token transfers.

## Commands

This template uses [Just](https://just.systems/) for task automation.

### App

| Command       | Description              |
| ------------- | ------------------------ |
| `just dev`    | Start development server |
| `just build`  | Build for production     |
| `just start`  | Start production server  |
| `just clean`  | Clean build artifacts    |
| `just deploy` | Deploy to Vercel         |

### Code Quality

| Command             | Description            |
| ------------------- | ---------------------- |
| `just biome-check`  | Check code with Biome  |
| `just biome-lint`   | Lint code with Biome   |
| `just biome-write`  | Fix Biome issues       |
| `just full-check`   | Run all quality checks |
| `just full-write`   | Fix all quality issues |

Run `just` to see all available commands.

## Deployment

Use `just deploy` for Vercel or run the GitHub Actions workflow in `.github/workflows/deploy.yml`.

## License

This project is licensed under MIT.
