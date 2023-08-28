import React from 'react'
import styled from "styled-components";
import { useState, useEffect, useContext, useCallback, useRef, useMemo } from "react";
import DataContext from '../../context/Dataprovider';
import Texasprogram from './Texasprogram';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import Increment from './Increment';
import Initialize from './Initialize';


const gold = "#A67C37";
const white = "#FEF6E6";

export const ContentBox = styled.div`
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  border : 1px solid ${(devries) => devries.bordercolor};
  transition: 3.5s;
  text-align: left;

  h2 {
  text-align: left;
  font-size: 8px;
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

th {
  text-align: left;
  font-size: 14px;
  color: ${(devries) => devries.bordercolor2};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Montagu Slab', serif;
  font-style: italic;
  border-bottom : 4px solid ${(devries) => devries.bordercolor};
  margin:10;
  width: 150px;
}


td {
  text-align: center;
  font-size: 14px;
  color: ${(devries) => devries.bordercolor};
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-family: 'Graduate', cursive;
  border-bottom : 1px solid ${(devries) => devries.bordercolor};
  //word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left:10px;
  padding-right:10px;
}



table {
width: 100%;
  table-layout: fixed;
}

`;


export default function Chaindata() {
    const { walletstatus, walletkey} = useContext(DataContext)
    const [selectedOption, setSelectedOption] = useState(null);
    const program = Texasprogram();

    const [userdata, setUserdata] = useState(false)
    const setuserdata = useRef(undefined);
    useEffect(() => {
        setuserdata.current = userdata;
    }, [userdata]);

    const [username, setUsername] = useState([])
    const setusername = useRef(undefined);
    useEffect(() => {
        setusername.current = username;
    }, [username]);

    const [userobject, setUserobject] = useState(false)
    const setuserobject = useRef(undefined);
    useEffect(() => {
        setuserobject.current = userobject;
    }, [userobject]);


    async function infoUser() {

        if (program && walletkey) {

            try {

                const accounts = await program.account.userAccount.all();
                setUserdata(accounts)
                accounts.map(getFullName);

                function getFullName(obj) {
                    setUsername(prevArray => [...prevArray, obj.account.name])
                    return obj.account.name;
                }
            } catch (err) {


            }
        }
    }


    useEffect(() => {
        infoUser()
      }, [walletstatus, walletkey]);





    const optionItems = username.map((item, i) =>
        <option value={item} key={i} label={item}>{item}</option>

    );


    useEffect(() => {
        
    if (userdata){

    const optionItems2 = userdata.map((obj, i) => {
        const value = obj.account.name;
        const label = obj.account.name;
        return { value, label };
            })
            console.log(`optionItems2:`, optionItems2)
            setUserobject(optionItems2)
        }

    }, [walletstatus, userdata]);


    const MyComponent = () => (
        <Select>
        {userdata.map(fbb =>
          <option key={fbb.key} value={fbb.account.name}>{fbb.account.name}</option>
        )};
      </Select>    
    )


    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelected ? "#212529" : "#fff",
            backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
        }),

        control: (defaultStyles) => ({
            ...defaultStyles,
            backgroundColor: "#212529",
            padding: "10px",
            border: "none",
            boxShadow: "none",
        }),
        singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
    };

    console.log(`username:`, username)
    console.log(`option:`, selectedOption)
    console.log(`optionItems:`, optionItems)
    console.log(`userdata:`, userdata)

    return (

        <>
            {walletstatus === "connected" && optionItems ?
                <>
                    <ContentBox bordercolor={gold} bordercolor2={white}>

                        <Select defaultValue={selectedOption} onChange={setSelectedOption} options={userobject} styles={customStyles} isMulti/>
                        <Increment/> 
                        <Initialize/>
                        {userdata ? 
                      
                        <table>
                            <thead>
                                <tr>
                                    <th>TX</th>
                                    <th>name</th>
                                    <th>data</th>
                                    <th>Publickey</th>
                                    <th>Publickey</th>
                                </tr>
                            </thead>

                            {userdata &&
                                userdata.map((obj, i) => {
                                    return (
                                        <>
                                     
                                            <tbody>
                                                <tr>
                                                    <td>{i}</td>
                                                    <td>{obj.account.name}</td>
                                                    <td>{obj.account.data.words[0]}</td>
                                                    <td>{obj.publicKey._bn.words.toString()}</td>
                                                    <td>{obj.account.authority._bn.words.toString()}</td>
                                                </tr>

                                            </tbody>
                                        </>
                                    );
                                })}
                        </table> : <></>}

                    </ContentBox>
                    : <></>


                </>
                : <></>
            }
        </>
    )
}
