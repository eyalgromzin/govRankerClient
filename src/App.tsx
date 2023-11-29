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
import { AdminMain } from "./components/adminMain";

export default function App() {
  // const { count } = useSelector((state: RootState) => state.counter1); // see store.ts
  const dispatch = useDispatch();
  
  useEffect(() => {
    getAllGovernments(dispatch)
    getAllParties(dispatch)
    getAllPartyMembers(dispatch)
    getAllPartyToGovernment(dispatch) 
    getAllPartyMembersToParty(dispatch) 
  }, [])

  return (
    <div className="App">
      <AdminMain />      
    </div>
  );
}

