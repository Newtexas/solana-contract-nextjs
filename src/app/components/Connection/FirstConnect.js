import React from 'react'

export default function FirstConnect({setfireFunction}) {
    console.error("firstconnect")
    const setFire = (value) => {
        setfireFunction(value);

      };

      setFire(false)
    if ('phantom' in window) {
        
        try {
            const isPhantomInstalled = window.phantom?.solana?.isPhantom
            if (isPhantomInstalled == true) {
                return true;
            } else {
                window.alert("Phantom Wallet isn't installed");
                window.location = "https://www.phantom.app/";
                return false;
            }
        } catch (err) {
            console.error(err.stack)
        }
    }
};
