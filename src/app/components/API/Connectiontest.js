import { useContext, useState, useEffect, useRef } from "react";
import React from 'react'


export default function Connectiontest({ setFunction, seconds, run}) {

  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);

  function tick() {
    secondsLeftRef.current++;
    setSecondsLeft(secondsLeftRef.current);
  }


  useEffect(() => {
    function ProgramTimer() {
      setFunction();
      secondsLeftRef.current = 0;
    }
    const interval = setInterval(() => {
      if ((secondsLeftRef.current === seconds || secondsLeftRef.current > seconds) && run === true) {
        return ProgramTimer();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);
}