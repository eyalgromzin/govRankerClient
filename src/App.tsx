import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./redux/counterSlice";
import { RootState } from "./redux/store";
import axios from 'axios';
import { getAllGovernments } from "./apis/governmentApi";
import { getAllPartyMembers } from "./apis/partyMembersApi";
import { getAllParties } from "./apis/PartyApi";
import { getAllPartyMembersToParty, getAllPartyToGovernment } from "./apis/common";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { Governments } from "./components/Governments";

export default function App() {
  // const { count } = useSelector((state: RootState) => state.counter1); // see store.ts
  const dispatch = useDispatch();
  
  const getResultFromServer = async () => {
    console.log('in getResultFromServer()')
    const res = axios.get('http://localhost:3000/test2').then(res => {
      console.log('in res')
      let asd = 4
      asd += 1
      console.log(res)
    })
  }

  useEffect(() => {
    getAllGovernments(dispatch)
    getAllParties(dispatch)
    getAllPartyMembers(dispatch)
    getAllPartyToGovernment(dispatch) 
    getAllPartyMembersToParty(dispatch) 
  }, [])

  return (
    <div className="App">
      <button onClick={() => getResultFromServer()}>
        
      </button>

      <Governments />

      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        ++++
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -----
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          dispatch(incrementByAmount(10));
        }}
      >
        +10
      </button>
    </div>
  );
}

