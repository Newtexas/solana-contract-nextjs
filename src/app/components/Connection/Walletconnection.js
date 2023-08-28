import React from 'react'
import { useState, useEffect, useContext, useCallback, useRef } from "react";
import Connectiontest from '../API/Connectiontest';
import Getprovider from './Getprovider';
import FirstConnect from './FirstConnect';
import ConnectWallet from './ConnectWallet';
import DisconnectWallet from './DisconnectWallet';
import DataContext from '../../context/Dataprovider';



import styled from "styled-components";
const gold = "#A67C37";
const white = "#FEF6E6";


export const ContentBox = styled.div`
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  border : 1px solid ${(devries) => devries.bordercolor};
  transition: 3.5s;
  text-align: left;

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

export default function Walletconnection() {
  const [status, setStatus] = useState("pending");
  const [showSettings, setShowSettings] = useState(false);
  const setup1 = useRef(false);


  //context
  const { setWalletstatus } = useContext(DataContext);
  const walletStatus = (val) => {
    setWalletstatus(val);
  };

  const { setWalletkey } = useContext(DataContext);
  const walletKey = (val) => {
    setWalletkey(val);
  };

  const { setWalletprovider } = useContext(DataContext);
  const walletProvider = (val) => {
    setWalletprovider(val);
  };

  //key
  const [publicKey, setPublicKey] = useState(undefined);
  const setkey = useRef(null);
  useEffect(() => {
    setkey.current = publicKey;
  }, [publicKey]);

  //provider
  const [provider, setProvider] = useState(undefined);
  const setprovider = useRef(undefined);
  useEffect(() => {
    setprovider.current = provider;
  }, [provider]);

  //firefunctions
  const [fireconnect, setfireConnect] = useState();
  const setupconnect = useRef(false);
  const setupconnectstart = useRef(true);
  const autoconnect = useRef(true);
  const connect = useRef(false);
  useEffect(() => {
    connect.current = fireconnect;
  }, [fireconnect]);

  const [firedisconnect, setfireDisconnect] = useState();
  const disconnect = useRef(false);
  useEffect(() => {
    disconnect.current = firedisconnect;
  }, [firedisconnect]);

  const [firefirstconnect, setfireFirstconnect] = useState();
  const firstconnect = useRef(false);
  useEffect(() => {
    firstconnect.current = firefirstconnect;
  }, [firefirstconnect]);



  function checkWallet() {
    const provider = setprovider.current;
    try {
      if (provider) {
        provider.on('accountChanged', (publicKey) => {
          if (publicKey) {
            setPublicKey(publicKey);
            console.log(`switched to account ${publicKey.toBase58()}`);
            setStatus("account switched");
            setStatus("connected");
          } 
          else{
            console.error("wallet error222222");
          }
        });
      }
      setPublicKey(publicKey);
    } catch (err) {
      setStatus("connection refused");
      setPublicKey(null);
    }
   
  }

  function checkDisconnect() {
    const provider = setprovider.current;
    try {
      if (provider) {
        provider.on("disconnect", () => {
          setPublicKey(null);
          setStatus("disconnected");
        });
      
      }
    } catch (err) {
      console.log("wallet error");
      setStatus("connection refused");
      setPublicKey(null);
    }
  }

  async function checkConnect() {
    const provider = setprovider.current;
    try {
      if (provider) {
        provider.connect().then(({ publicKey }) => {
          if (publicKey) {
            setPublicKey(publicKey);
            connect.current = false;
          }
        });
      }

    } catch (err) {
      console.error("wallet error");
      setStatus("connection refused");
      setPublicKey(null);
    }

  }




  function driverFunctionConnect() {
    checkConnect();
    setStatus("await connection");
    connect.current = true;
    disconnect.current = undefined;
  }

  function driverFunctionConnectFirst() {
    if (!setupconnectstart.current) return;
    setupconnect.current = true;
    setupconnectstart.current = false;
    console.log(`heartbeat start ${setupconnectstart.current}`);
    setStatus("setting up connection");
  };

  function driverFunctionDisconnect() {
    setShowSettings(false);
    disconnect.current = true;
    connect.current = undefined;
  }

  useEffect(() => {
    //if (setup1.current) return;
    if (setprovider.current) {
      setStatus("waiting for connection");
      connect.current = true;
      autoconnect.current = false;
      console.log(`provider stored`)
    }
    //else {
    //  setProvider(undefined);
   //   console.log("provider not available")
   // }
  }, [provider]);

  useEffect(() => {
    checkWallet();
    checkDisconnect();

    if (status === "await connection" && setkey.current) 
    {
      setStatus("connected");
      setShowSettings(true)
    }

  },[setprovider.current, publicKey]);

  useEffect(() => {
    window.addEventListener("unhandledrejection", function(promiseRejectionEvent) { 
      setStatus("connection refused");
  });
  });

  walletStatus(status)
  walletKey(setkey.current)
  walletProvider(setprovider.current)

  useEffect(() => {
    if(provider)
    console.log(provider.isPhantom)
//test
  });






  //window.addEventListener("load", firstconnectWallet())
  return (
    <div>
      <Connectiontest setFunction={driverFunctionConnectFirst} seconds={2} run={setupconnectstart.current} />
      <Getprovider setProvider={setProvider} setStatus={setStatus} run={setupconnect.current} />
      {connect.current ? <ConnectWallet setPublicKey={setPublicKey} setShowSettings={setShowSettings} setStatus={setStatus} provider={setprovider.current} setfireFunction={setfireConnect} run={connect.current} /> : <></>}
      {disconnect.current ? <DisconnectWallet setPublicKey={setPublicKey} setStatus={setStatus} provider={setprovider.current} setfireFunction={setfireDisconnect} run={disconnect.current} /> : <></>}
      {firstconnect.current ? <FirstConnect setfireFunction={setfireFirstconnect} /> : <></>}


    
      <ContentBox bordercolor={gold} bordercolor2={white}>
      {status ? <div>
          <h3>status: </h3>
          <h6>{status}</h6>
        </div> : <></>}

      {autoconnect.current ? <></> : showSettings ? <button onClick={driverFunctionDisconnect}>Disconnect</button> : <button onClick={driverFunctionConnect}>Connect</button>}

      
      </ContentBox>

    </div>
  )
}


