import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import * as anchor from '@project-serum/anchor';
import * as bs58 from "bs58";
import DataContext from '../context/Dataprovider';
import idl from '../idl/idl.json';
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
const gold = "#A67C37";
const white = "#FEF6E6";
const NTsecretKey = "2g9wcuHYPCpYpr1NP8tCr4tPnfttTSvzLJZzQiC8FFpRgpFRYAh1txzR295QwUEUV8DdDD4i47SHhMng4eUKEEw2"
const { SystemProgram } = anchor.web3; // Added to initialize account


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


export default function Dummy3() {

  const { walletstatus, walletkey, walletprovider } = useContext(DataContext)
  //const provider = new anchor.AnchorProvider(connection, walletkey);
  const [program, setData] = useState(false)
  const [anchorprovider, setanchorProvider] = useState(false)
  const [anchoruser, setUser] = useState(false)
  const [signeruser, setSigner] = useState(false)
  const wallet = useAnchorWallet()
  const tdevries = useAnchorWallet()

  async function getContract() {

    const user2 = anchor.web3.Keypair.generate();
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const newProvider = new anchor.AnchorProvider(
      connection,
      wallet,
      anchor.AnchorProvider.defaultOptions()
    );

    try {
      if (newProvider) {
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const a = JSON.stringify(idl)
        const b = JSON.parse(a)
        const address = "4MSiYq6mTYZUozVfcLNsf5ubBrE2Yzk9aekx3X4J8PCb"
        const program = new anchor.Program(b, address, newProvider)
        setData(program)
        setanchorProvider(newProvider)
        setUser(wallet)
        setSigner(user2)
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log('program' , program)
  console.log('provider', anchorprovider)
  console.log('user', anchoruser)

  async function getSet() {
   
    try {
     const tx = await program.rpc.initialize({
        // Pass in all the accounts needed
        accounts: {
          myAccount: signeruser.publicKey, // publickey for our new account
          user: anchorprovider.wallet.publicKey, // publickey of our anchor wallet provider
          systemProgram: SystemProgram.programId // just for Anchor reference
        },
        signers: [signeruser]
      }
    )

    console.log('sig', JSON.stringify(signeruser.publicKey))
    console.log('sig', JSON.stringify(anchoruser.publicKey))
    console.log('tx', program.transaction);

    } catch (err) {
      console.log(err);
    }

  }



  async function getSigner2() {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const confirmation = await connection.requestAirdrop(
        anchoruser.publicKey,
        6000000000

      );
      console.log(confirmation)

      const tx = await program.transaction.initialize({
        // Pass in all the accounts needed
        accounts: {
          myAccount: walletkey, // publickey for our new account
          user: anchoruser.publicKey, // publickey of our anchor wallet provider
          systemProgram: SystemProgram.programId // just for Anchor reference
        },
        signers: []
      }
    )

    const latestBlockhash = await connection.getLatestBlockhash();
    tx.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
    tx.recentBlockhash = latestBlockhash.blockhash;
    tx.feePayer = await walletkey
    const signedTx = await walletprovider.signTransaction(tx);
    signedTx.partialSign(anchoruser)
    const signature = await connection.sendRawTransaction(signedTx.serialize());

    console.log(signature)




    } catch (err) {
      console.log(err);
    }

  }

  async function getSigner3() {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    try {
      const tx = await program.rpc.increment({
        // Pass in all the accounts needed
        accounts: {
          myAccount: walletkey, // publickey for our new account
        },
      }
    )

    console.log('done');
    } catch (err) {
      console.log(err);
    }

  }




  async function getInitialize() {
    try {
      if (program) {
        const Signer = Keypair.fromSecretKey(bs58.decode(NTsecretKey));

        await program.methods.initialize()
          .accounts({
            myAccount: anchorprovider.publicKey,
            user: anchorprovider.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          })
          .signers([Signer, Signer])
          .rpc();

        const gameState = await program.account.myAccount.fetch(anchorprovider.publicKey)
        console.log('account: ', gameState)
      };


    } catch (err) {
      console.log(err);
    }
  };


  async function getInitialize2() {
    // generate an address (PublciKey) for this new account

    getContract()
    console.log('data1', program)

    // The Account to create.
    const myAccount = anchor.web3.Keypair.generate();
    // Execute the RPC call
    console.log('data2', program)
    await program.rpc.initialize({
      // Pass in all the accounts needed
      accounts: {
        myAccount: myAccount.publicKey, // publickey for our new account
        user: anchorprovider.publicKey, // publickey of our anchor wallet provider
        systemProgram: SystemProgram.programId // just for Anchor reference
      },
      signers: [myAccount.publicKey]
      // blogAccount must sign this Tx, to prove we have the private key too
    })

    //const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    // const signedTransaction = await walletprovider.signTransaction(tx);
    //signedTransaction.partialSign(myAccount)
    //const signature = await connection.sendRawTransaction(signedTransaction.serialize());

    const account = await program.account.myAccount.fetch(myAccount.publicKey);



  }



  useEffect(() => {
    getContract()


  }, []);



  return (
    <>{walletstatus == "connected" ?
      <ContentBox bordercolor={gold} bordercolor2={white}>
            <button onClick={getSet}>initialize</button> : <></>
        <button onClick={getSigner3}>increment</button> : <></>


      </ContentBox>
      : <></>
    }
    </>

  )
}
