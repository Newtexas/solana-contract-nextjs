import React from 'react'
import * as anchor from '@project-serum/anchor'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import Texasprogram from './Texasprogram';
import {PublicKey} from '@solana/web3.js'

export default function GetPDA() {
    //zeker niet af
    async function getPDA() {

        if (1) {

            try {

            const program = Texasprogram();
            const PROGRAM_ID = program.programId
            const owner = new PublicKey("GYZJMoRd2c4pNeLhnGRiWAckhQq2eeqsfhzy6jyKaEhY");
            const seed1 = Buffer.from(utf8.encode("user"))
            const seed3 = Buffer.from(owner.toBytes());
            const [userPDA1, _bump] = await anchor.web3.PublicKey.findProgramAddressSync([seed1, seed3], PROGRAM_ID);
      
            return userPDA1
    
        

              
            } catch (error) {
   
          
          } finally {
      
          }

        }


    }







    

    const userPDA = getPDA();
    return userPDA
}
