import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article, Government, Party, PartyAndGovernment, PartyMember, PartyMemberAndParty } from "../models";

export interface DataState {
  governments: Government[];
  parties: Party[];
  partyMembers: PartyMember[];
  articles: Article[];
  partyAndGovernment: PartyAndGovernment[];
  partyMemberAndParty: PartyMemberAndParty[];
}

const initialState: DataState = {
  governments: [],
  parties: [],
  partyMembers: [],
  articles: [],
  partyAndGovernment: [],
  partyMemberAndParty: []
};

export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setGovernments: (state: DataState, action: PayloadAction<Government[]>) => {
      state.governments = action.payload;
    },
    setParties: (state: DataState, action: PayloadAction<Party[]>) => {
      state.parties = action.payload;
    },
    setPartyMembers: (state: DataState, action: PayloadAction<PartyMember[]>) => {
      state.partyMembers = action.payload;
    },
    setArticles: (state: DataState, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
    setPartyToGovernment: (state: DataState, action: PayloadAction<{partyUUID: string, governmentUUID:string}[]>) => {
      state.partyAndGovernment = action.payload;
    },
    setPartyMemberAndParty: (state: DataState, action: PayloadAction<PartyMemberAndParty[]>) => {
      state.partyMemberAndParty = action.payload;
    },
  }
});

// Action creators are generated for each case reducer function
export const { 
  setGovernments, setParties, setPartyMembers, 
  setArticles, setPartyToGovernment, setPartyMemberAndParty 
} = dataSlice.actions;


export default dataSlice.reducer;
