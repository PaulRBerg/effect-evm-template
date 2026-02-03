import "client-only";

import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { Context, Effect, Layer, Schema } from "effect";
import type { Config } from "wagmi";
import { cookieStorage, createStorage } from "wagmi";

import { getAppKitChains } from "./chains";

export class AppKitConfigError extends Schema.TaggedError<AppKitConfigError>()(
  "AppKitConfigError",
  {
    message: Schema.String,
  }
) {}

export type AppKitServiceShape = {
  wagmiConfig: Config;
  modal: ReturnType<typeof createAppKit>;
};

export class AppKitService extends Context.Tag("AppKitService")<
  AppKitService,
  AppKitServiceShape
>() {}

export function createAppKitLayer() {
  return Layer.effect(
    AppKitService,
    Effect.gen(function* () {
      const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID;
      if (!projectId) {
        return yield* new AppKitConfigError({
          message: "NEXT_PUBLIC_REOWN_PROJECT_ID is not set",
        });
      }

      const chains = getAppKitChains();

      const wagmiAdapter = new WagmiAdapter({
        networks: chains,
        projectId,
        ssr: true,
        storage: createStorage({ storage: cookieStorage }),
      });

      const modal = createAppKit({
        adapters: [wagmiAdapter],
        features: {
          analytics: false,
        },
        metadata: {
          description: "Effect-EVM Template",
          icons: ["/favicon.ico"],
          name: "Effect-EVM Template",
          url: globalThis.location?.origin ?? "",
        },
        networks: chains,
        projectId,
      });

      return {
        modal,
        wagmiConfig: wagmiAdapter.wagmiConfig,
      };
    })
  );
}
