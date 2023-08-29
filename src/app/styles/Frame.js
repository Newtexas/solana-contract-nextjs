"use client";
import styled from "styled-components";
import {keyframes} from "styled-components";

export const ContentBoxFrame = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 0em;

  background: url(${(dirk) => dirk.ts}), 
    linear-gradient(to left, ${(henk) => henk.td} ${(henk) => henk.taa}%,
    ${(henk) => henk.tk} ${(henk) => henk.tab}%);
    background-size: auto;
    background-repeat: repeat;

    h1{
  text-align: left;
  font-size: 18px;
  color: ${(devries) => devries.bordercolor};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Montagu Slab', serif;
  font-style: italic;
  width : 100px;
  display: inline; 
  margin:10;
}
`;

const size = keyframes`
0%{
    background-position: 0 50%;
}
50%{
    background-position: 100 50%;
}
100%{
    background-position: 0 50%;
}

`;