import { useCallback, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import Ticker from "./Ticker";
import * as bs58 from "bs58";

import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
const NTpublicKey = "8ujkH3WCp9bQuwA32LfLoLmnMc1Wt1BpvgiMqNc1MTqJ".toString();
const NTsecretKey = "2g9wcuHYPCpYpr1NP8tCr4tPnfttTSvzLJZzQiC8FFpRgpFRYAh1txzR295QwUEUV8DdDD4i47SHhMng4eUKEEw2"

export default function GetTokenSupply() {
  const [data, setData1] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [requestError, setRequestError] = useState("");
  const [requestErrorArray, setRequestErrorArray] = useState([]);

  const solanaInfo = async () => {
    try {
      const solana = new Connection(clusterApiUrl("devnet"), "confirmed");
      //const solana = new Connection(clusterApiUrl("testnet"), "confirmed");
      //const solana = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
      const feePayer = Keypair.fromSecretKey(
        bs58.decode("2g9wcuHYPCpYpr1NP8tCr4tPnfttTSvzLJZzQiC8FFpRgpFRYAh1txzR295QwUEUV8DdDD4i47SHhMng4eUKEEw2")
      );
      const res = await solana.getBalance(feePayer.publicKey)


      setData1([res/LAMPORTS_PER_SOL]);

    } catch (err) {
        if (err.result) {
          {
            console.log(err.result.data);
            console.log(err.result.status);
            console.log(err.result.headers);
            setRequestErrorArray([err.result]);
          }
        } else {
          console.log(`Error: ${err.message}`);
          setRequestError([err.message]);
        }
      }
  };


  const driverFunction = async () => {
    await solanaInfo();
  }
  console.log((data))

  return (
    <>
 
    <Ticker setFunction={driverFunction} seconds={1000} />
    <h1>{requestError}</h1>
    <h1>{requestErrorArray}</h1>

    <table>
        {data &&
          data.map((datainhoud, index) => {
            return (
              <thead>
                <tr classname="box" key={index}>
                <th>{datainhoud}</th>
         
                </tr>
                </thead>
            );
          })}
 
        {data2 &&
          data2.map((datainhoud, index) => {
            return (
              <tbody>
         
                <tr classname="box" key={index}>
                <td>{datainhoud.value}</td>
           
                </tr>

    
                </tbody>

            );
          })}
      </table>
    </>

  );
}