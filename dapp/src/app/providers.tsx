"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import { NextUIProvider } from "@nextui-org/react";
import { getConfig } from "@/wagmi";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "viem/chains";
import AgrobaseProvider from "@/context";

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <NextUIProvider>
      <WagmiProvider config={config} initialState={props.initialState}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={base}
          >
            <AgrobaseProvider>{props.children}</AgrobaseProvider>
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextUIProvider>
  );
}
