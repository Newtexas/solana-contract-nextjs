import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import * as bs58 from "bs58";
import DataContext from '../context/Dataprovider';
const gold = "#A67C37";
const white = "#FEF6E6";

export const ContentBox = styled.div`
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  border : 1px solid ${(devries) => devries.bordercolor};
  transition: 3.5s;
  text-align: left;

  h2 {
  text-align: left;
  font-size: 8px;
  color: ${(devries) => devries.bordercolor};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Montagu Slab', serif;
  font-style: italic;
  width : 100px;
  display: inline; 
  margin:10;
}

h3 {
  text-align: left;
  font-size: 14px;
  color: ${(devries) => devries.bordercolor2};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Montagu Slab', serif;
  font-style: italic;
  width : 100px;
  display: inline; 
  margin:10;
}

h6 {
  text-align: left;
  font-size: 16px;
  color: ${(devries) => devries.bordercolor};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-family: 'Graduate', cursive;
  width : 100px;
  display: inline; 
  margin:5;
}
`;


export default function Dummy() {
  const [balance, setBalance] = useState(null);
  const { walletstatus, walletkey, walletprovider } = useContext(DataContext)

  const [userSOLBalance, setSOLBalance] = useState()

  async function getWalletBalance() {
    try {
      if (walletprovider && walletkey) {


        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        //const myWallet = await Keypair.fromSecretKey(bs58.decode(NTsecretKey));
        const walletBalance = await connection.getBalance(
          walletprovider.publicKey
        );

        setBalance(`${parseInt(walletBalance) / LAMPORTS_PER_SOL}`)
        console.log(`=> For wallet address ${walletkey}`);
        console.log(`   Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
      }
      else {
        setBalance(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWalletBalance()

  }, [walletkey]);
 
  return (
    <>{walletstatus == "connected" ?
      <ContentBox bordercolor={gold} bordercolor2={white}>
        {walletstatus ? <div>
          <h3>status: </h3>
          <h6>{walletstatus}</h6>
        </div> : <></>}
        {balance ? <div>
          <h3>balance: </h3>
          <h6>{balance}</h6>
        </div> : <></>}
        {walletkey ? <div>
          <h3>walletkey: </h3>
          <h2>{JSON.stringify(walletkey)}</h2>
        </div> : <></>}

        <div>
          {walletkey &&
            walletkey._bn.words.map((obj, i) => {
              return (




                
                <div>
                  <h3>object:  </h3>
                  <h2>{obj}</h2>
                </div>

              );
            })}
        </div>
      </ContentBox>
: <></>}
    </>

  )
}
