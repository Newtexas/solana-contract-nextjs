"use client";
import React from "react";
import { GlobalStyles } from "./Global";
import img1 from './NTHOMES3.png';
import img3 from './NTHOMES3.png';

const gold = "#A67C37";
const black = "#13100D";
const value = "stage1";
const percentage = 80;

export default function Setglobal() {

  const percentagemin = percentage === 100 ? 100 : percentage > 90 ? percentage - 5 : percentage > 80 ? percentage - 10: percentage - 20;


  const extentionObj = {
    stage1: img1,
    stage2: img1,
    stage3: img1,
    stage4: img1,
    stage5: img1,
    stage6: img1,
    stage7: img1,
    stage8: img1,
    stage9: img1,
    stage10: img1,
    stage11: img1,
    stage12: img1,
    stage13: img1,
    stage14: img1,
    stage15: img1,
    stage16: img1,
    break1: img3,
    break2: img3,
    break3: img3,
    super1: img1,
    super2: img1,

  };

  const image = extentionObj[value];

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