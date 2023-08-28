import React from 'react'
import { useState } from "react";
import Test2 from './Test2';
import Ticker from './API/Ticker';
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import * as bs58 from "bs58";

const {
  getLatestBlockhash,


} = require("@solana/web3.js");

export default function Test1() {
  
  const [data, setData] = useState();
  const [selectedTxt1, setTxt1] = useState("empty");
  const [selectedTxt2, setTxt2] = useState("empty");
  const [selectedTxt3, setTxt3] = useState("empty");
  const [selectedTxt4, setTxt4] = useState("empty");
  const [selectedTxt5, setTxt5] = useState("empty");
  const [selectedTxt6, setTxt6] = useState("empty");
  const [ColorPos, setColorPos] = useState("8ujkH3WCp9bQuwA32LfLoLmnMc1Wt1BpvgiMqNc1MTqJ");
  const key = JSON.stringify(ColorPos)
  const newPair = new Keypair();

  //const publicKey = new PublicKey(newPair._keypair.publicKey).toString();
  const secretKey = newPair._keypair.secretKey

  const NTpublicKey = new PublicKey("8ujkH3WCp9bQuwA32LfLoLmnMc1Wt1BpvgiMqNc1MTqJ").toString();
  const NTsecretKey = "2g9wcuHYPCpYpr1NP8tCr4tPnfttTSvzLJZzQiC8FFpRgpFRYAh1txzR295QwUEUV8DdDD4i47SHhMng4eUKEEw2"

  const getWalletBalance = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const myWallet = await Keypair.fromSecretKey(bs58.decode(NTsecretKey)
      );
      const walletBalance = await connection.getBalance(
        new PublicKey(myWallet.publicKey)
      );

      setTxt1(`${NTpublicKey}`)
      setTxt2(`${parseInt(walletBalance) / LAMPORTS_PER_SOL}`)
      console.log(`=> For wallet address ${NTpublicKey}`);
      console.log(`   Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`);
    } catch (err) {
      console.log(err);
    }
  };


  const airDropSol = async () => {
    try {
      const solana = new Connection(clusterApiUrl("devnet"), "confirmed");

      const walletPayer = Keypair.fromSecretKey(bs58.decode(NTsecretKey));
      console.log(`-- Airdropping 22 SOL --`)
      console.log(solana.getLatestBlockhash());

      let txhash = await solana.requestAirdrop(walletPayer.publicKey, 2 * LAMPORTS_PER_SOL);
      console.log(`txhash: ${txhash}`)




    } catch (err) {
      console.log(err);
    }
  };

  const connectContract = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const feePayer = Keypair.fromSecretKey(bs58.decode(NTsecretKey));
      console.log(`-- Airdropping 22 SOL --`)
      let txhash = await connection.requestAirdrop(feePayer.publicKey, 2 * LAMPORTS_PER_SOL);
      console.log(`txhash: ${txhash}`)
    } catch (err) {
      console.log(err);
    }
  };

  const solanaInfo = async () => {
    try {
      const solana = new Connection(clusterApiUrl("devnet"), "confirmed");
      //setTxt3(solana.getVersion())
      console.log(solana.getVersion())
      console.log(solana.getSupply())
    } catch (err) {
      console.log(err);
    }
  };

  const executeAllLongRunningTasks = async () => {
    const solana = new Connection(clusterApiUrl("devnet"), "confirmed");
    const res = await solana.getSupply();
    setData([res.data]);
}


  const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await solanaInfo();
    await executeAllLongRunningTasks();
    //const solana = new Connection(clusterApiUrl("devnet"), "confirmed");
    ///console.log(solana.getSupply())
  }





  return (
    <>

<div>
      <h3>For wallet address {selectedTxt1}</h3>
      <h3>Wallet balance: {selectedTxt2} SOL</h3>
      <h3>Wallet : {key} SOL</h3>
      <h3>Wallet : {selectedTxt3} SOL</h3>
      <Test2 SetColorPos={setColorPos} />
      <Ticker setFunction={driverFunction} seconds={1000} />
      <button onClick={driverFunction}>Switch</button>
    </div>
    </>
  )
}
