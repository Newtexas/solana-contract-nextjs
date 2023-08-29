'use client'
import React from "react";
import { GlobalStyles } from "./Global";
import img1 from '../assets/NTHOMES3.png';
import img3 from '../assets/NTHOMES3.png';


const gold = "#A67C37";
const black = "#13100D";
const value = "stage1";
const percentage = 80;


export default function Setglobal() {

  const percentagemin = percentage === 100 ? 100 : percentage > 90 ? percentage - 5 : percentage > 80 ? percentage - 10: percentage - 20;

  const extentionObj = {
    stage1: img1,
    stage2: img3
  };

  const image = extentionObj[value];
  console.log("Setglobal")
  return (
    <div>
      <GlobalStyles
        tk={gold}
        ts={image}
        td={black}
        taa={percentagemin}
        tab={percentage}

      />
    </div>
  );
}