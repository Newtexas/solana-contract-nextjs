import React from 'react'
import {useState} from "react";
import * as buffer from "buffer";
window.Buffer = buffer.Buffer;


const {
    Connection,
    SystemProgram,
    getLatestBlockhash,
    PublicKey,

    Keypair,

    Transaction,

} = require("@solana/web3.js");

export default function Test2({ SetColorPos }) {
    const [lamports, setLamports] = useState(10000);
    const [selectedState, setState] = useState(false);
    const colorStatusPos = (color) => {
        SetColorPos(color);
        console.log(color);
    };




    const driverFunction = async () => {
        await window.phantom.solana.connect();
        setLamports(
           100
        )
    }

    const getProvider = () => {
        if ('phantom' in window) {
            const provider = window.phantom?.solana;
            setState(
                true
            )
            if (provider?.isPhantom) {
                driverFunction()
                return provider;
            }
        }
        else {
            setState(
                false
            )

            window.open('https://phantom.app/', '_blank');
        }
    };


    const driverFunction2 = async () => {
        const provider = getProvider();
        try {
            const resp = await provider.connect();
            console.log(resp.publicKey.toString());
            colorStatusPos(resp.publicKey.toString())
        } catch (err) {
        }
    }



    const sign = async () => {
        try {









            const newPair = new Keypair();
            const transferTransaction = new Transaction()
                .add(SystemProgram.transfer({
                    // fromPubkey: provider.publicKey,
                    // toPubkey: new PublicKey(destAddr),
                    fromPubkey: new PublicKey(newPair._keypair.publicKey).toString(),
                    toPubkey: "8ujkH3WCp9bQuwA32LfLoLmnMc1Wt1BpvgiMqNc1MTqJ",
                    payerKey:"8ujkH3WCp9bQuwA32LfLoLmnMc1Wt1BpvgiMqNc1MTqJ",
                    lamports: lamports
                }))

            const network = "https://api.devnet.solana.com";
            const solana = new Connection(network);
                
            transferTransaction.recentBlockhash = (await solana.getLatestBlockhash()).blockhash;
            
            console.log(solana.getLatestBlockhash())
            const { signature } = await window.solana.signAndSendTransaction(transferTransaction);
            await solana.getSignatureStatus(signature);
            await solana.confirmTransaction(signature);


        } catch (err) {
            console.log(err);
        }
    };

    const driverFunction3 = async () => {
        getProvider()
        driverFunction2()
   
       sign()


    }

    return (

        <div>
            {selectedState ? <button onClick={driverFunction3}>Connect</button>
                : <button onClick={driverFunction3}>Connected</button>}

        </div>
    )
}
