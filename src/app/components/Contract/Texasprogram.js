import React from 'react'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as anchor from '@project-serum/anchor'
import idl from '../../idl/idl.json';
import { useMemo } from "react";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import { mont } from 'bn.js';
const TODO_PROGRAM_PUBKEY = "BrCcvB8c2d59n3h66WBrFT6ufsbydnohWMbmquwBpuB8"


export default function Texasprogram() {
    //const { connection2 } = useConnection()
    //const { publicKey } = useWallet()
    //const anchorWallet = useAnchorWallet()
    const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

    const MockWallet = {
        signTransaction: () => Promise.reject(),
        signAllTransactions: () => Promise.reject(),
        publicKey: Keypair.generate().publicKey,
    }

    const program = useMemo(() => {

        if (MockWallet) {
            const provider = new anchor.AnchorProvider(connection, MockWallet, anchor.AnchorProvider.defaultOptions())
            //const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
            return new anchor.Program(idl, TODO_PROGRAM_PUBKEY, provider)
        }
        //MockWallet
    }, [connection, MockWallet])
    return program
}
