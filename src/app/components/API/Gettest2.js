import { useCallback, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import Ticker from "./Ticker";

import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";


export default function Gettest2() {
  const [data, setData1] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [requestError, setRequestError] = useState("");
  const [requestErrorArray, setRequestErrorArray] = useState([]);

  const solanaInfo = async () => {
    try {
      const solana = new Connection(clusterApiUrl("devnet"), "confirmed");
      console.log(solana.getVersion())
      console.log(solana.getSupply())
      const res = await solana.getSupply();


      setData1([res]);
      setData2([res.value]);
      setData3(res.value.circulating);
      console.log((res).value.circulating)

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
  console.log((data2))
  console.log((data3))
  console.log(data)
  return (
    <>
 
    <Ticker setFunction={driverFunction} seconds={1000} />
    <h1>{requestError}</h1>
    <h1>{requestErrorArray}</h1>
    <h1>{data3}</h1>

    <table>
        {data &&
          data.map((datainhoud, index) => {
            return (
              <thead>
                <tr classname="box" key={index}>
                <th>{datainhoud.context.apiVersion}</th>
                  <th>{datainhoud.context.slot}</th>
                  <th>{datainhoud.value.circulating}</th>
                  <th>{datainhoud.value.nonCirculating}</th>
                  <th>{datainhoud.value.total}</th>
                </tr>
                </thead>
            );
          })}
 
        {data2 &&
          data2.map((datainhoud, index) => {
            return (
              <tbody>
         
                <tr classname="box" key={index}>
                <td>{datainhoud.circulating}</td>
                  <td>{datainhoud.nonCirculating}</td>
                  <td>{datainhoud.total}</td>
                </tr>

    
                </tbody>

            );
          })}
      </table>
    </>

  );
}