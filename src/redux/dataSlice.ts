import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article, Government, Party, PartyAndGovernment, PartyMember, PartyMemberAndParty } from "../models";

export interface DataState {
  governments: Government[];
  parties: Party[];
  partyMembers: PartyMember[];
  articles: Article[];
  partyAndGovernment: PartyAndGovernment[];
  partyMemberAndParty: PartyMemberAndParty[];
  selectedGovernment: Government | undefined;
  selectedParty: Party | undefined;
  selectedPartyMember: PartyMember | undefined;

}

const initialState: DataState = {
  governments: [],
  parties: [],
  partyMembers: [],
  articles: [],
  partyAndGovernment: [],
  partyMemberAndParty: [],
  selectedGovernment: undefined,
  selectedParty: undefined,
  selectedPartyMember: undefined,
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
    setSelectedGovernment: (state: DataState, action: PayloadAction<Government>) => {
      state.selectedGovernment = action.payload;
    },
    setSelectedParty: (state: DataState, action: PayloadAction<Party>) => {
      state.selectedParty = action.payload;
    },
    setSelectedPartyMember: (state: DataState, action: PayloadAction<PartyMember>) => {
      state.selectedPartyMember = action.payload;
    },
    addGovernment: (state: DataState, action: PayloadAction<Government>) => {
      state.governments.push(action.payload);
    },
    removeGovernment: (state: DataState, action: PayloadAction<any>) => {
      state.governments = state.governments.filter(governmentI => {
        return governmentI.uuid != action.payload.governmentUUID
      });
    },
    addParty: (state: DataState, action: PayloadAction<Government>) => {
      state.parties.push(action.payload);
    },
    addPartyMember: (state: DataState, action: PayloadAction<Government>) => {
      state.partyMembers.push(action.payload);
    },
  }
});

// Action creators are generated for each case reducer function
export const { 
  setGovernments, setParties, setPartyMembers, 
  setArticles, setPartyToGovernment, setPartyMemberAndParty,
  addGovernment, addParty, addPartyMember, removeGovernment
} = dataSlice.actions;


export default dataSlice.reducer;
