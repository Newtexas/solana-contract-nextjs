import React from 'react'
import styled from "styled-components";
import * as anchor from '@project-serum/anchor'
import { useState, useEffect, useContext, useCallback, useRef, useMemo } from "react";
import DataContext from '../context/Dataprovider';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import idl from '../idl/idl.json';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import Texasprogram from './Contract/Texasprogram';
import * as bs58 from "bs58";

const { SystemProgram } = anchor.web3; // Added to initialize account


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




export default function Rpctest() {
  const { walletstatus, walletkey, walletprovider } = useContext(DataContext)
  const [userdata, setUserdata] = useState(false)
  const [username, setUsername] = useState([])
  const program = Texasprogram();





  async function initializeUser() {

    if (program && walletkey) {

      try {
        const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), walletkey.toBuffer()], program.programId)
        console.log(program)
        console.log(profilePda)
        const harry = JSON.stringify(program.programId)
        console.log(harry)
        const tx = await program.methods
          .initialize()
          .accounts({
            myAccount: walletkey,
            user: profilePda,
            systemProgram: SystemProgram.programId,
          })
          .instruction()
        console.log("succes")
        const account = await program.account.myAccount.fetch(walletkey);
        console.log("succes", account.data.toString())
        console.log(tx)

      } catch (err) {
        console.log(err)

      }
    }
  }

  async function incrementUser() {

    if (program && walletkey) {

      try {
        const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), walletkey.toBuffer()], program.programId)
        console.log(program)
        console.log(profilePda)
        const harry = JSON.stringify(program.programId)
        console.log(harry)
        const tx = await program.methods
          .increment()
          .accounts({
            myAccount: profilePda,
          })
          .instruction()
        console.log("succes")
        const account = await program.account.myAccount.fetch(walletkey);
        console.log("succes", account.data.toString())
        console.log(tx)
      } catch (err) {
        console.log(err)

      }
    }
  }


  async function decrementUser() {

    if (program && walletkey) {

      try {
        const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), walletkey.toBuffer()], program.programId)
        console.log(program)
        console.log(profilePda)
        const harry = JSON.stringify(program.programId)
        console.log(harry)
        const tx = await program.methods
          .decrement()
          .accounts({
            myAccount: profilePda,
          })
          .instruction()
        console.log("succes", tx)
        const account = await program.account.myAccount.fetch(walletkey);
        console.log("data", account.data.toString())

      } catch (err) {


      }
    }
  }

  async function infoUser() {

    if (program && walletkey) {

      try {


        //const account = await program.account.userAccount.fetch("7EjiRQx6psXRXqRpyJFfzmCD8TWQUQSv37FxKtMChgEw");
        //console.log("data", account.data.toString())

        const accounts = await program.account.userAccount.all();
        console.log(accounts)
        setUserdata(accounts)


        accounts.map(getFullName);

        function getFullName(obj) {
          console.log("data", obj.account.name)
          setUsername(prevArray => [...prevArray, obj.account.name])

       

          const ter = JSON.stringify(obj.account.authority._bn.words)
          return obj.account.name;
        }

        let optionItems = userdata.map((obj) =>
        <option>{obj}</option>
       );

      console.log("Optionsitem", optionItems)
      } catch (err) {


      }
    }
  }



  const airDropSol = async () => {
    try {


      const publicKeys = [
        "7EjiRQx6psXRXqRpyJFfzmCD8TWQUQSv37FxKtMChgEw",
        "8ujkH3WCp9bQuwA32LfLoLmnMc1Wt1BpvgiMqNc1MTqJ",
      ];

      const solana = new Connection(clusterApiUrl("testnet"), "confirmed");


      let netBalance = 0;
      for (let index = 0; index < publicKeys.length; index++) {
        const pk = new PublicKey(publicKeys[index]);
        console.log(pk);
        const walletBalance = await solana.getBalance(pk);
        netBalance += walletBalance;

        console.log(`   Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL}SOL`);
        console.log(`-- Airdropping 2 SOL --`)
        console.log(solana.getLatestBlockhash());

        let txhash = await solana.requestAirdrop(pk, 2 * LAMPORTS_PER_SOL);


        console.log(`txhash: ${txhash}`)
      }







    } catch (err) {
      console.log(err);
    }
  };

  console.log(`username:`, username)

let optionItems = username.map((item) =>
<option key={item}>{item}</option>
);

  return (
    <>{walletstatus == "connected" ?
      <>
        <ContentBox bordercolor={gold} bordercolor2={white}>
          <button onClick={initializeUser}>initialize</button>
          <button onClick={incrementUser}>increment</button>
          <button onClick={decrementUser}>decrement</button>
          <button onClick={infoUser}>info</button>
          <button onClick={airDropSol}>Air</button>



     <select>
{optionItems}
</select>
          {userdata ? <table>

            <thead>
              <tr>
                <th>TX</th>
                <th>name</th>
                <th>data</th>
                <th>Publickey</th>
                <th>Publickey</th>
              </tr>
            </thead>

            {userdata &&
              userdata.map((obj, i) => {
                return (
                  <>
                    <tbody>
                      <tr>
                        <td>{i}</td>
                        <td>{obj.account.name}</td>
                        <td>{obj.account.data.words[0]}</td>
                        <td>{obj.publicKey._bn.words.toString()}</td>
                        <td>{obj.account.authority._bn.words.toString()}</td>
                      </tr>

                    </tbody>
                  </>
                );
              })}
          </table> : <></>}


        </ContentBox>
        : <></>


      </>
      : <></>
    }
    </>
  )
}
