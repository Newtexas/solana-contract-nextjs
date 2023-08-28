import React from 'react'
import styled from "styled-components";
import * as anchor from '@project-serum/anchor'
import { useState, useEffect, useContext, useCallback, useRef, useMemo } from "react";
import { findProgramAddressSync, findProgramAddress } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import Texasprogram from './Texasprogram';
import DataContext from '../../context/Dataprovider';
import {PublicKey} from '@solana/web3.js'
import GetPDA from './GetPDA';


import idl from '../../idl/idl.json';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
const { SystemProgram } = anchor.web3; // Added to initialize account
const TODO_PROGRAM_PUBKEY = "BrCcvB8c2d59n3h66WBrFT6ufsbydnohWMbmquwBpuB8"

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


`;


const testuser = new PublicKey("GYZJMoRd2c4pNeLhnGRiWAckhQq2eeqsfhzy6jyKaEhY");
const owner = new PublicKey("GYZJMoRd2c4pNeLhnGRiWAckhQq2eeqsfhzy6jyKaEhY");
export default function Increment() {
  const { walletstatus, walletkey } = useContext(DataContext)

  const program = Texasprogram();


  async function incrementUser() {



    if (program && walletkey) {

      const PROGRAM_ID = program.programId
  
      try {

        const [profilePda, profileBump] = findProgramAddressSync([owner.toBuffer(), PROGRAM_ID.toBuffer()], program.programId)
        console.log("owner", owner)
        console.log("spda", profilePda)
        console.log("program", program)
        console.log(PublicKey.isOnCurve(owner.toBytes()));
        
        await program.methods.increment()
          .accounts({
            userAccount: profilePda,
          })
          .rpc()
  

        
      } catch (error) {
        console.log(error)
        console.log("succes")
        const account = await program.account.userAccount.fetch(testuser);
        console.log("succes vier", account.data.toString())
    
    } finally {

    }
    }
  }





  

  return (
    <>{walletstatus == "connected" ?
      <>
        <ContentBox bordercolor={gold} bordercolor2={white}>
          <button onClick={incrementUser}>increment</button>

        </ContentBox>
        : <></>

      </>
      : <></>
    }
    </>
  )
}
