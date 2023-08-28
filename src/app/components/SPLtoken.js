import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl, Transaction, sendAndConfirmTransaction, TransactionInstruction } from "@solana/web3.js";
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createMintToInstruction } from '@solana/spl-token';
import { PROGRAM_ID, DataV2, createCreateMetadataAccountV2Instruction, createUpdateMetadataAccountV2Instruction } from '@metaplex-foundation/mpl-token-metadata';
import * as anchor from '@project-serum/anchor';
import * as bs58 from "bs58";
import * as buffer from "buffer";
import DataContext from '../context/Dataprovider';
import Assetholder from './Assetholder';


window.Buffer = buffer.Buffer;

/* global BigInt */
const {
  SystemProgram,
  getLatestBlockhash,
  findProgramAddressSync,
} = require("@solana/web3.js");

const gold = "#A67C37";
const white = "#FEF6E6";
const NTsecretKey = "2g9wcuHYPCpYpr1NP8tCr4tPnfttTSvzLJZzQiC8FFpRgpFRYAh1txzR295QwUEUV8DdDD4i47SHhMng4eUKEEw2"
const INITIALIZE = false;

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




export default function SPLtoken() {
  const [balance, setBalance] = useState(null);
  const [memberstatus, setStatus] = useState(false);
  const { walletstatus, walletkey, walletprovider } = useContext(DataContext)

  const [userSOLBalance, setSOLBalance] = useState()
  const [minimalSOLBalance, setminimalSOLBalance] = useState()
  const INITIALIZE = false;
  const mintKeypair = walletkey;


  if (walletkey) {
    async function getMinimumLamports() {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const lamports = await getMinimumBalanceForRentExemptMint(connection)
      return lamports
    }
    const lamportsvalue = getMinimumLamports();
    lamportsvalue.then((value) => {
      setminimalSOLBalance(value)
    });

  }


  async function setMint() {


    try {

      async function writeFiles() {
        const anchor = require('@project-serum/anchor')
        const account = anchor.web3.Keypair.generate()

        //RNFS.writeFile('./keys/keypair.json', JSON.stringify(account))
      }
      const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
      const transferAcc = new Keypair();
      const transferAccPubKey = transferAcc.publicKey;
      //let txhash = await connection.requestAirdrop(transferAccPubKey, 1 * LAMPORTS_PER_SOL);
      //console.log(`txhash: ${txhash}`)


      const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
      const seed2 = Buffer.from(PROGRAM_ID.toBytes());
      const seed3 = Buffer.from(transferAccPubKey.toBytes());
      const [metadataPDA, _bump] = PublicKey.findProgramAddressSync([seed1, seed2, seed3], PROGRAM_ID);
      const tokenATA = await getAssociatedTokenAddress(transferAccPubKey, walletkey);

      //supply
      const MINT_CONFIG = {
        numDecimals: 9,
        numberTokens: 100000000,
      }
      const max_supply = BigInt(MINT_CONFIG.numberTokens * Math.pow(10, MINT_CONFIG.numDecimals))


      const dataV2 = {
        name: "New Texas Dollar Test",
        symbol: "NTDT",
        //uri: "https://github.com/Newtexas/newtexas-assets/blob/4821bee62a74d6eda30aa60c84b4231f17deef03/metadata.json",
        uri: "https://github.com/Newtexas/newtexas-assets/blob/3b7e9e089006d6efdb0348290fc0349eadff8f86/metadata.json",
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
      }

      const accounts = {
        metadata: metadataPDA,
        mint: transferAccPubKey,
        mintAuthority: walletkey,
        payer: walletkey,
        updateAuthority: walletkey,
      }

      const args = {
        createMetadataAccountArgsV2: {
          data: dataV2,
          isMutable: true,
          updateAuthority: walletkey,
          primarySaleHappened: true
        }
      };

      let ix;
      if (INITIALIZE) {
        const args = {
          createMetadataAccountArgsV2: {
            data: dataV2,
            isMutable: true
          }
        };
        ix = createCreateMetadataAccountV2Instruction(accounts, args);
      } else {
        const args = {
          updateMetadataAccountArgsV2: {
            data: dataV2,
            isMutable: true,
            updateAuthority: walletkey,
            primarySaleHappened: true
          }
        };
        ix = createUpdateMetadataAccountV2Instruction(accounts, args)
      }

      const createMintTransaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: walletkey,
          newAccountPubkey: transferAccPubKey,
          space: MINT_SIZE,
          lamports: minimalSOLBalance,
          programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMintInstruction(
          transferAccPubKey,
          9,
          walletkey,
          walletkey,
          TOKEN_PROGRAM_ID
        ),
        createAssociatedTokenAccountInstruction(
          walletkey,
          tokenATA,
          walletkey,
          transferAccPubKey,
        ),
        createMintToInstruction(
          transferAccPubKey,
          tokenATA,
          walletkey,
          max_supply
        ),
      );


      const rx = createCreateMetadataAccountV2Instruction(accounts, args);
      createMintTransaction.add(rx)



      const instruction = new TransactionInstruction({
        keys: [
          { pubkey: walletkey, isSigner: true, isWritable: true },
          { pubkey: transferAccPubKey, isSigner: true, isWritable: false },
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false
          }
        ],

        programId: PROGRAM_ID,
      });
      //createMintTransaction.add(instruction)


      const latestBlockhash = await connection.getLatestBlockhash();
      createMintTransaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
      createMintTransaction.recentBlockhash = latestBlockhash.blockhash;
      createMintTransaction.feePayer = await walletkey
      const signedTransaction = await walletprovider.signTransaction(createMintTransaction);
      signedTransaction.partialSign(transferAcc)
      const signature = await connection.sendRawTransaction(signedTransaction.serialize());

      console.log(`Transaction ${createMintTransaction}`)
      console.log(`Transaction ${signature}`)


    } catch (err) {
      console.log(err);
    }


  }


  async function setMintTest() {
    console.log("let's name some tokens!");
    const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
    const seed2 = Buffer.from(PROGRAM_ID.toBytes());
    const seed3 = Buffer.from(walletkey.toBytes());
    const [metadataPDA, _bump] = PublicKey.findProgramAddressSync([seed1, seed2, seed3], PROGRAM_ID);


    console.log("let's go!");
    const dataV2 = {
      name: "New Texas Dollar Test",
      symbol: "NTDT",
      uri: "https://shdw-drive.genesysgo.net/ArP7jjhVZsp7vkzteU7mpKA1fyHRhv4ZBz6gR7MJ1JTC/metadata.json",
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null
    }

    const accounts = {
      metadata: metadataPDA,
      mint: walletkey,
      mintAuthority: walletkey,
      payer: walletkey,
      updateAuthority: walletkey,
    }

    let ix;
    if (INITIALIZE) {
      console.log("letsgo")
      const args = {
        createMetadataAccountArgsV2: {
          data: dataV2,
          isMutable: true
        }
      };
      ix = createCreateMetadataAccountV2Instruction(accounts, args);
    } else {

      const args = {
        updateMetadataAccountArgsV2: {
          data: dataV2,
          isMutable: true,
          updateAuthority: walletkey,
          primarySaleHappened: true
        }
      };
      ix = createUpdateMetadataAccountV2Instruction(accounts, args)
    }



    const tx = new Transaction();
    tx.add(ix);

    console.log(ix)
    //const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    //const txid = await sendAndConfirmTransaction(connection, tx, [walletkey]);
    //console.log(txid);



  }








  async function getWalletBalance() {
    try {
      if (walletprovider && walletkey) {


        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        const myWallet = await Keypair.fromSecretKey(bs58.decode(NTsecretKey));
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

    <>
      {walletkey ? <Assetholder value={walletkey} setStatus={setStatus} /> : <></>}

      {memberstatus == true ?
        <ContentBox bordercolor={gold} bordercolor2={white}>
          {walletstatus ? <div>
            <h3>status: </h3>
            <h6>{walletstatus}</h6>
          </div> : <></>}
          {minimalSOLBalance ? <div>
            <h3>minimal tokens: </h3>
            <h6>{minimalSOLBalance}</h6>
          </div> : <></>}
          {balance ? <div>
            <h3>balance: </h3>
            <h6>{balance}</h6>
          </div> : <></>}
          {TOKEN_PROGRAM_ID ? <div>
            <h3>program ID: </h3>
            <h2>{JSON.stringify(TOKEN_PROGRAM_ID)}</h2>
            <h2>{JSON.stringify(PROGRAM_ID)}</h2>
          </div> : <></>}
          {MINT_SIZE ? <div>
            <h3>mint size: </h3>
            <h6>{JSON.stringify(MINT_SIZE)}</h6>
          </div> : <></>}
          <button onClick={setMint}>Make coin</button>
        </ContentBox>
        : <></>}
    </>

  )
}


