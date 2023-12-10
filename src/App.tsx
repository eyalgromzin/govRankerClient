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
import { Main } from "./components/main";

import { useNavigate } from "react-router-dom";
import Dummy from "./components/dummy";

import Parliament from "./components/Parliament";


export default function App() {
    // const { count } = useSelector((state: RootState) => state.counter1); // see store.ts
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        getAllGovernments(dispatch);
        getAllParties(dispatch);
        getAllPartyMembers(dispatch);
        getAllPartyToGovernment(dispatch);
        getAllPartyMembersToParty(dispatch);
        getRecentlyAddedArticles(dispatch, 10);
        getAllPartyMembersToGovernment(dispatch)
    }, []);

    const onButtonClick = () => {
        navigate("/entity/171e925c-0bfe-4319-9db3-94f417ae60a2/f35bd031-c7ec-49e6-af0f-bfd18265a8bc/f07c9ac4-9831-4d6e-891d-ad2263d33d24")
    }

    return (
        <div
            className="App"
            style={{ direction: "rtl", width: "1020px", margin: "0 auto" }}
        >
            <button onClick={() => onButtonClick()} > open liberman  </button>
            <br />
            <br />
            
            {/* bibs:   http://127.0.0.1:5173/entity/171e925c-0bfe-4319-9db3-94f417ae60a2/39ca591f-dda7-43f8-8cf0-a87087ba024f/3aa9ac7f-4ee5-429b-8ad2-c5a42e785875 */}
            {/* liberman: http://127.0.0.1:5173/entity/171e925c-0bfe-4319-9db3-94f417ae60a2/f35bd031-c7ec-49e6-af0f-bfd18265a8bc/f07c9ac4-9831-4d6e-891d-ad2263d33d24 */}
            <Routes>
                <Route path="/" element={<Parliament />} />
                <Route path="/admin" element={<AdminMain />} />
                <Route path="/Parliament" element={ <Parliament onPartyMemberSelect={undefined} /> } />
                <Route path="/entity/:governmentUUID" element={<Main />} />
                <Route path="/entity/:governmentUUID/:partyUUID" element={<Main />} />
                <Route path="/entity/:governmentUUID/:partyUUID/:partyMemberUUID" element={<Main />} />
            </Routes>
        </div>
    );
}
