import React from 'react'
import { useRef, useEffect } from "react";

export default function Getprovider({ setProvider, setStatus, run }) {
    const solanaprovider = useRef(undefined);

    const providerStatus = (provider) => {
        setProvider(provider);
    };

    const setStatusConnect = (connect) => {
        setStatus(connect);
    };

    useEffect(() => {
        if (!run) return;
        try {
            solanaprovider.current = window.phantom?.solana;
            if (solanaprovider.current?.isPhantom) {
                providerStatus(solanaprovider.current)
                window.phantom.solana.connect()
                //console.error(`1e ${run}`)
                setStatusConnect("provider available");
            }
        } catch (err) {
            setStatusConnect("error provider");
        }
    }, [run]);

}