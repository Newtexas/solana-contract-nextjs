import React from 'react'
import { useState, useEffect, useAuth, useCallback, useRef } from "react";

export default function ConnectWallet({ setPublicKey, setShowSettings, setStatus, provider, setfireFunction, run }) {

  const setFire = (fire) => {
    setfireFunction(fire);
  };

  const setKey = (key) => {
    setPublicKey(key);
  };

  const setSettings = (settings) => {
    setShowSettings(settings);
  };

  const setStatusConnect = (connect) => {
    setStatus(connect);
  };

  const localrun = useRef(false);

  useEffect(() => {
    if (!localrun.current) return;
    console.error("connectwallet")
    try {
      if (provider) {
        provider.connect({ onlyIfTrusted: true }).then(({ publicKey }) => {
          setSettings(true)
          setStatusConnect("connected");
          setKey(publicKey)
          setFire(false)
          console.log(`Set public key ${publicKey}`);
        }).catch(() => {
          setStatusConnect("login wallet");
          setKey(null);
          setFire(false)
        });

      }

    } catch (err) {

      setStatusConnect("connection refused");
      setKey(null);
      console.log("connection refused");

    }

  }, [])

  useEffect(() => {
    localrun.current = run;
  }, [run])

}







