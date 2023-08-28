import React from 'react'
import styled from "styled-components";
import * as anchor from '@project-serum/anchor'
import { useState, useEffect, useContext, useCallback, useRef, useMemo } from "react";
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import Texasprogram from './Texasprogram';
import DataContext from '../../context/Dataprovider';
import {PublicKey} from '@solana/web3.js'

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


`;


const testuser = "7EjiRQx6psXRXqRpyJFfzmCD8TWQUQSv37FxKtMChgEw"

export default function Initialize() {
  const { walletstatus, walletkey } = useContext(DataContext)
  const program = Texasprogram();
  


  async function initializeUser() {

    if (program && walletkey) {
 
        try {
            const [profilePda, profileBump] = findProgramAddressSync([utf8.encode('USER_STATE'), walletkey.toBuffer()], program.programId)

            const tx = await program.methods
                .initialize()
                .accounts({
                    userAccount: profilePda,
                    signer: testuser,
                    systemProgram: SystemProgram.programId,
                })
                .rpc()
        } catch (error) {
            console.log(error)
        } finally {

        }
    }
}


  return (
    <>{walletstatus == "connected" ?
      <>
        <ContentBox bordercolor={gold} bordercolor2={white}>
          <button onClick={initializeUser}>initialize</button>

        </ContentBox>
        : <></>

      </>
      : <></>
    }
    </>
  )
}
