"use client";
import styled from "styled-components";
import {keyframes} from "styled-components";

export const ContentBoxFrame = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 0em;
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