import { useCallback, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import Ticker from "./Ticker";

import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";

const apiUrl = clusterApiUrl("devnet");
const accessToken = "5614f6efcda1620115a352c2b68cb8dd";
const accessToken1 = "aGlqNToxMjM0aGlqNQ==";
const authSolanaAxios = axios.create({
  baseURL: apiUrl,
  timeout: 1000,
  // headers: { Authorization: `Bearer ${accessToken}` },
  //headers: { Authorization: `Basic ${accessToken1}` },
});

export default function Gettest() {
  const [data, setData] = useState();
  const [requestError, setRequestError] = useState("");
  const [requestErrorArray, setRequestErrorArray] = useState([]);

  const [seconds, setTimerCount] = useState(10);

  const getData = useCallback(async () => {
    try {
      const solana = new Connection(clusterApiUrl("devnet"), "confirmed");
      //const res = await authSolanaAxios.create();
      const res = await solana.getSupply();
      setData([res.data]);

      console.log(res.data.results);
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
  }, 10000);

  let content = null;







  return (
    <>
      <div>
        <main className="customer">
          <h1>Eerste Api</h1>
        </main>
        <>
          <div>{content}</div>
        </>

        <Ticker setFunction={getData} seconds={1000} />

        <br></br>
        <h1>{seconds}</h1>
      </div>

      <table>
        {data &&
          data.map((datainhoud, index) => {
            return (

              <div classname="box" key={index}>
                <tr>
                  <th>{datainhoud.count}</th>
                  <th>{datainhoud.count}</th>
                  <th>{datainhoud.count}</th>
                  <th>{datainhoud.count}</th>
                  <th>{datainhoud.count}</th>
                  <th>{datainhoud.count}</th>
                  <th>{datainhoud.count}</th>
                </tr>
                {datainhoud.results.map((data) => {
                  return (
                    <div classname="box" key={data.created_at}>
                      <tr>
                        <td>{data.reglaar}</td>
                        <td>{data.description}</td>
                        <td>{data.group}</td>
                        <td>{data.sent_to_server === true ? "hello" : "ono"}</td>
                        <td>{data.resolved === true ? "hello" : "ono"}</td>
                        <td>{data.created_at}</td>
                      </tr>
                    </div>
                  );
                })}

              </div>
            );
          })}
      </table>




    </>

  );
}