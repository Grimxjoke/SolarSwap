//Chakra Import
import { ChakraProvider } from "@chakra-ui/react";

//Rainbow-Kit Import
import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, goerli, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

// Next Import
import type { AppProps } from "next/app";

const { chains, provider } = configureChains([goerli], [publicProvider()]);
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
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
