import React from "react";
import { useState, useRef, useEffect } from "react";

import {
  Factory_Abi,
  Router_Abi,
  Factory_Address,
  RouterV2_Address,
  Weth_Mumbai_Address,
} from "constants/constants";
import { useIsMounted } from "hooks/useIsMounted";

import { Contract, ethers, Signer, utils } from "ethers";
import { parseEther, formatEther } from "ethers/lib/utils";
import { getProvider } from "@wagmi/core";
import { getAccount } from "@wagmi/core";

import {
  Box,
  Button,
  Input,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useSigner } from "wagmi";

export default function Swap() {
  const mounted = useIsMounted();
  const provider = getProvider();
  const account = getAccount();
  const signer = useSigner();
  const [selectedItemIn, setSelectedItemIn] = useState("WFil");
  const [selectedItemOut, setSelectedItemOut] = useState("WFil");

  //   const swapTokens = async(
  //   address1 : any,
  //   address2 : any,
  //   amount: number,
  //   routerContract : any,
  //   accountAddress: any,
  //   signer: any
  // ) {
  //   const tokens = [address1, address2];
  //   const time = Math.floor(Date.now() / 1000) + 200000;
  //   const deadline = ethers.BigNumber.from(time);

  //   const token1 = new Contract(address1, ERC20.abi, signer);

  //   const amountIn = ethers.utils.parseUnits(amount, tokenDecimals);
  //   const amountOut = await routerContract.callStatic.getAmountsOut(
  //     amountIn,
  //     tokens
  //   );

  //   await token1.approve(routerContract.address, amountIn);
  //   const wethAddress = await routerContract.WETH();

  //   if (address1 === wethAddress) {
  //     // Eth -> Token
  //     await routerContract.swapExactETHForTokens(
  //       amountOut[1],
  //       tokens,
  //       accountAddress,
  //       deadline,
  //       { value: amountIn }
  //     );
  //   } else if (address2 === wethAddress) {
  //     // Token -> Eth
  //     await routerContract.swapExactTokensForETH(
  //       amountIn,
  //       amountOut[1],
  //       tokens,
  //       accountAddress,
  //       deadline
  //     );
  //   } else {
  //     await routerContract.swapExactTokensForTokens(
  //       amountIn,
  //       amountOut[1],
  //       tokens,
  //       accountAddress,
  //       deadline
  //     );
  //   }
  // }

  // swapTokens(
  //               "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F",
  //               "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
  //               10,
  //               RouterV2_Address,
  //               "0x2d82A697eF3a5226D300DB81c82a998CBa49049A",
  //               signer

  //         )

  return (
    <>
      {mounted && (
        <>
          <h1> Wallet Status : {account.status}</h1>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Text p="1rem">Swap</Text>
            <Box
              display="flex"
              border="2px"
              borderRadius="10px"
              justifyContent="center"
              borderColor="black"
              width="30vw"
            >
              <Input placeholder="0" border="0px" />

              <Menu>
                <MenuButton as={Button} onClick={() => setSelectedItemIn(selectedItemIn)}>
                  {selectedItemIn}
                </MenuButton>

                <MenuList>
                  <MenuItem onClick={() => setSelectedItemIn("wFIL")}>wFIL</MenuItem>
                  <MenuItem onClick={() => setSelectedItemIn("DAI")}>DAI</MenuItem>
                  <MenuItem onClick={() => setSelectedItemIn("wETH")}>wETH</MenuItem>
                  <MenuItem onClick={() => setSelectedItemIn("DAI")}>DAI</MenuItem>
                  <MenuItem onClick={() => setSelectedItemIn("BUSD")}>BUSD</MenuItem>
                </MenuList>
              </Menu>
            </Box>
            ↓
            <Box
              display="flex"
              border="2px"
              borderRadius="10px"
              justifyContent="center"
              borderColor="black"
              width="30vw"
            >
              <Input placeholder="0" border="0px" />

              <Menu>
                <MenuButton as={Button} onClick={() => setSelectedItemOut(selectedItemOut)}>
                  {selectedItemOut}
                </MenuButton>

                <MenuList>
                  <MenuItem onClick={() => setSelectedItemOut("wFIL")}>wFIL</MenuItem>
                  <MenuItem onClick={() => setSelectedItemOut("DAI")}>DAI</MenuItem>
                  <MenuItem onClick={() => setSelectedItemOut("wETH")}>wETH</MenuItem>
                  <MenuItem onClick={() => setSelectedItemOut("DAI")}>DAI</MenuItem>
                  <MenuItem onClick={() => setSelectedItemOut("BUSD")}>BUSD</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
