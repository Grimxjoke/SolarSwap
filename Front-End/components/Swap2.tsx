import * as React from 'react'
import { useState, useRef, useEffect } from "react";
import {
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
    useAccount,
    useSigner,
} from 'wagmi'
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
import { useIsMounted } from "hooks/useIsMounted";
import { getProvider } from "@wagmi/core";
import { getAccount } from "@wagmi/core";
import useDebounce from '../hooks/useDebounce'
import {
    Factory_Abi,
    Router_Abi,
    Factory_Address,
    RouterV2_Address,
    Weth_Mumbai_Address,
    DAI_Mumbai_Adress,
    BUSD_Mumbai_Adress,
} from "constants/constants";
import { ethers } from 'ethers';

export function SwapForm() {
    const { address, isConnected } = useAccount()

    const [amountIn, setamountIn] = React.useState('')
    const debouncedAmountIn = useDebounce(amountIn)
    const adress_pair = [DAI_Mumbai_Adress, BUSD_Mumbai_Adress]
    const time = Math.floor(Date.now() / 1000) + 200000;
    const deadline = ethers.BigNumber.from(time);

    const mounted = useIsMounted();
    const provider = getProvider();
    const account = getAccount();
    const signer = useSigner();
    const [selectedItemIn, setSelectedItemIn] = useState("WFil");
    const [selectedItemOut, setSelectedItemOut] = useState("WFil");



    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: RouterV2_Address,
        abi: Router_Abi,
        functionName: 'swapExactTokensForTokens',
        args: [parseInt(debouncedAmountIn), 0, adress_pair, address, deadline],
        enabled: Boolean(debouncedAmountIn),
    })
    const { data, error, isError, write } = useContractWrite(config)

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    return (
        
        <>
        {mounted && (<>
            <h1> Wallet Status : {account.status}</h1>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Text p="1rem">Swap</Text>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        write?.();
                    }}
                >
                    <Box
                        display="flex"
                        border="2px"
                        borderRadius="10px"
                        justifyContent="center"
                        borderColor="black"
                        width="30vw"
                    >
                        <input
                            id="amountIn"
                            onChange={(e) => setamountIn(e.target.value)}
                            placeholder="420"
                            value={amountIn}
                        />

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
                    <button disabled={!write || isLoading}>
                        {isLoading ? 'Swapping...' : 'swapExactTokensForTokens'}
                    </button>
                    {isSuccess && (
                        <div>
                            Successfully swapped!
                            <div>
                                <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
                            </div>
                        </div>
                    )}
                    {(isPrepareError || isError) && (
                        <div>Error: {(prepareError || error)?.message}</div>
                    )}
                </form>
            </Box>
        </>
              )}
        </>
    )
}
