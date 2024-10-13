import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [/*base,*/ baseSepolia],
    connectors: [
      injected(),
      coinbaseWallet({
        appName: "Create Wagmi",
        preference: "smartWalletOnly",
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      // [base.id]: http(),
      [baseSepolia.id]: http(),
    },
  });
}

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});

declare module "wagmi" {
  export interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
