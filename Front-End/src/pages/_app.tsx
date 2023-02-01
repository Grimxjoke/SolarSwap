import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      {/* <WagmiConfig client={wagmiClient}> */}
      {/* <RainbowKitProvider chains={chains}> */}
      <Component {...pageProps} />
      {/* </RainbowKitProvider> */}
      {/* </WagmiConfig> */}
    </ChakraProvider>
  );
}
