import React from 'react'
import { Connection, Keypair,clusterApiUrl } from  "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, setAuthority, transfer } from  "@solana/spl-token";
export default function Newtexastoken() {



    const connection = new Connection(clusterApiUrl("testnet"), "confirmed");

    const secret = [207,247,28,172,105,224,222,96,235,7,192,147,118,28,230,213,6,243,39,27,19,13,195,184,181,11,127,43,117,134,96,57,110,56,63,16,81,156,131,81,94,43,213,36,254,200,206,139,21,171,236,185,255,72,188,106,11,212,31,177,123,123,197,177];
    const fromWallet = Keypair.fromSecretKey(new Uint8Array(secret));
    
    (async () => {
      // Create a new token 
      const mint = await createMint(
        connection, 
        fromWallet,            // Payer of the transaction
        fromWallet.publicKey,  // Account that will control the minting 
        null,                  // Account that will control the freezing of the token 
        0                      // Location of the decimal place 
      );
    
      // Get the token account of the fromWallet Solana address. If it does not exist, create it.
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey
      );
    
      // Generate a new wallet to receive the newly minted token
      const toWallet = Keypair.generate();
    
      // Get the token account of the toWallet Solana address. If it does not exist, create it.
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        toWallet.publicKey
      );
    
      // Minting 1 new token to the "fromTokenAccount" account we just returned/created.
      let signature = await mintTo(
        connection,
        fromWallet,               // Payer of the transaction fees 
        mint,                     // Mint for the account 
        fromTokenAccount.address, // Address of the account to mint to 
        fromWallet.publicKey,     // Minting authority
        1                         // Amount to mint 
      );
    
      await setAuthority(
        connection,
        fromWallet,            // Payer of the transaction fees
        mint,                  // Account 
        fromWallet.publicKey,  // Current authority 
        0,                     // Authority type: "0" represents Mint Tokens 
        null                   // Setting the new Authority to null
      );
    
      signature = await transfer(
        connection,
        fromWallet,               // Payer of the transaction fees 
        fromTokenAccount.address, // Source account 
        toTokenAccount.address,   // Destination account 
        fromWallet.publicKey,     // Owner of the source account 
        1                         // Number of tokens to transfer 
      );
    
      console.log("SIGNATURE", signature);
    
    })();


  return (
    <div>
      
    </div>
  )
}



