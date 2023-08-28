import React from 'react'
import { useState, useEffect, useAuth, useCallback, useRef } from "react";

export default function DisconnectWallet({ setPublicKey, setStatus, provider, setfireFunction, run }) {
    
    const setFire = (fire) => {
        setfireFunction(fire);
    };

    const setKey = (key) => {
        setPublicKey(key);
    };

    const setStatusConnect = (connect) => {
        setStatus(connect);
    };

    const localrun = useRef(false);

    useEffect(() => {
        if (!localrun.current) return;
        console.error("disconnect")
        try {
            if (provider) {
                provider.request({ method: "disconnect" });
                setKey(null)
                setStatusConnect("disconnected");
                setFire(false)

            }
        } catch (err) {
            setStatus("connection refused");

        }
    }, [])

    useEffect(() => {
        localrun.current = run;
    }, [run])
}


