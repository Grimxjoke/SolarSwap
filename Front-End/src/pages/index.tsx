//NEXT IMPORT
import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

//COMPONENTS IMPORT
// import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";

// WAGMI/RAINDOW-KIT IMPORT
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

// CHAKRA IMPORT
import { Box, Button, Text } from "@chakra-ui/react";

export default function Home() {
  const walletConection = () => {};

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav />
        <ConnectButton />
      </main>
      <Footer />
    </>
  );
}
