import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./redux/counterSlice";
import { RootState } from "./redux/store";
import axios from "axios";
import { getAllGovernments } from "./apis/governmentApi";
import { getAllPartyMembers } from "./apis/partyMembersApi";
import {
    getAllPartyMembersToGovernment,
    getAllPartyMembersToParty,
    getAllPartyToGovernment,
} from "./apis/common";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { Governments } from "./components/governments";
import { AdminMain } from "./components/adminMain";
import { getAllParties } from "./apis/partyApi";
import { getAllArticles, getRecentlyAddedArticles } from "./apis/articleAPi";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/main";

export default function App() {
    // const { count } = useSelector((state: RootState) => state.counter1); // see store.ts
    const dispatch = useDispatch();

    useEffect(() => {
        getAllGovernments(dispatch);
        getAllParties(dispatch);
        getAllPartyMembers(dispatch);
        getAllPartyToGovernment(dispatch);
        getAllPartyMembersToParty(dispatch);
        getAllArticles(dispatch);
        getRecentlyAddedArticles(dispatch, 10);
        getAllPartyMembersToGovernment(dispatch)
    }, []);

    return (
        <div
            className="App"
            style={{ direction: "rtl", width: "1000px", margin: "0 auto" }}
        >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<AdminMain />} />
            </Routes>
        </div>
    );
}
