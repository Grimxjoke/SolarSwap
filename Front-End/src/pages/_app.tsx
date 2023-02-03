//Chakra Import
import { ChakraProvider } from "@chakra-ui/react";

//Rainbow-Kit Import
import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
  Chain,
} from "@rainbow-me/rainbowkit";
import { polygonMumbai } from "@wagmi/core/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";

// Next Import
import type { AppProps } from "next/app";

const { chains, provider } = configureChains(
  [polygonMumbai],
  // [publicProvider()]
  [alchemyProvider({ apiKey: "FFBIXMx3stKjH3DRq5KoGRnoT4Y9_Mg2" })]
);
const { connectors } = getDefaultWallets({
  appName: "SolarSwap",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
