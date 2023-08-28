import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl, Transaction } from "@solana/web3.js";
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

th {
  text-align: left;
  font-size: 14px;
  color: ${(devries) => devries.bordercolor2};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Montagu Slab', serif;
  font-style: italic;
  border-bottom : 4px solid ${(devries) => devries.bordercolor};
  margin:10;
  width: 150px;
}


td {
  text-align: center;
  font-size: 14px;
  color: ${(devries) => devries.bordercolor};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-family: 'Graduate', cursive;
  border-bottom : 1px solid ${(devries) => devries.bordercolor};
  //word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left:10px;
  padding-right:10px;
}



table {
width: 100%;
  table-layout: fixed;
}

`;


export default function Dummy2() {

  const { walletstatus, walletkey, walletprovider } = useContext(DataContext)

  const [data, setData] = useState(false)

  async function getTransactions() {
    try {
      if (walletprovider && walletkey) {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        var transactionlist = connection.getSignaturesForAddress(walletkey, {
          limit: 10
        })

        var signaturelist = (await transactionlist).map((transaction) => transaction.signature)


        var transactionrich = await connection.getParsedTransactions(signaturelist, 3)
        var transferdata = (transactionrich).map((transactiondata) => transactiondata.transaction)
        setData(transactionrich)

      }
    } catch (err) {
      console.log(err);
    }
  };




  useEffect(() => {
    getTransactions()

  }, [walletkey]);
  console.log(`data:` ,data)

  return (
    <>{walletstatus == "connected" &&  data ?
      <ContentBox bordercolor={gold} bordercolor2={white}>


        {data ? <table>

          <thead>
                    <tr>
                      <th>TX</th>
                      <th>BlockTime</th>
                      <th>Slot</th>
                      <th>Fee</th>
                      <th>Owner</th>
                      <th>Mint</th>
                      <th>Amount</th>
                      <th>Signer1</th>
                      <th>Signer2</th>
                    </tr>
                  </thead>

          {data &&
            data.map((obj, i) => {
              return (
                <>
                  <tbody>
                    <tr>
                      <td>{i}</td>
                      <td>{obj.blockTime}</td>
                      <td>{obj.slot}</td>
                      <td>{obj.meta.fee}</td>
                      {obj.meta.postTokenBalances.map((data) => {
                        return (
                          <td>  <a href={`https://explorer.solana.com/address/${data.owner}?cluster=devnet`}target="_blank">{data.owner}</a></td>
                        );
                      })}
                      {obj.meta.postTokenBalances.map((data) => {
                        return (
                            <td>  <a href={`https://explorer.solana.com/address/${data.mint}?cluster=devnet`}target="_blank">{data.mint}</a></td>
                        );
                      })}
                      {obj.meta.postTokenBalances.map((data) => {
                        return (
                          <td> {data.uiTokenAmount.amount}</td>
                        );
                      })}
                      {obj.transaction.signatures.map((data) => {
                        return (
                          <td>  <a href={`https://explorer.solana.com/address/${data}?cluster=devnet`}target="_blank">{data}</a></td>
                        );
                      })}


                    </tr>

                  </tbody>
                </>
              );
            })}
        </table> : <></>}


      </ContentBox>
      : <></>
    }
    </>

  )
}
