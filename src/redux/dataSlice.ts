import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article, EntityAndArticle, Government, Party, PartyAndGovernment, PartyMember, PartyMemberAndParty } from "../models";

export interface DataState {
  governments: Government[];
  parties: Party[];
  partyMembers: PartyMember[];
  articles: Article[];
  entityAndArticles: EntityAndArticle[]
  partyMemberAndParty: PartyMemberAndParty[];
  partyAndGovernment: PartyAndGovernment[];
  selectedPartyMember: PartyMember | undefined;
  selectedParty: Party | undefined;
  selectedGovernment: Government | undefined | null;
  recentlyAddedArticles: Article[];
}

const initialState: DataState = {
  governments: [],
  parties: [],
  partyMembers: [],
  articles: [],
  entityAndArticles: [],
  partyAndGovernment: [],
  partyMemberAndParty: [],
  selectedGovernment: undefined,
  selectedParty: undefined,
  selectedPartyMember: undefined,
  recentlyAddedArticles: [],
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
    setSelectedGovernment: (state: DataState, action: PayloadAction<Government | null>) => {
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
    addParty: (state: DataState, action: PayloadAction<Party>) => {
      state.parties.push(action.payload);
    },
    addArticle: (state: DataState, action: PayloadAction<Article>) => {
      state.articles.push(action.payload);
    },
    addPartyMember: (state: DataState, action: PayloadAction<PartyMember>) => {
      state.partyMembers.push(action.payload);
    },
    removeGovernment: (state: DataState, action: PayloadAction<any>) => {
      state.governments = state.governments.filter(governmentI => {
        return governmentI.uuid != action.payload.governmentUUID
      });
    },
    removeParty: (state: DataState, action: PayloadAction<any>) => {
      state.parties = state.parties.filter(partyI => {
        return partyI.uuid != action.payload.partyUUID
      });
    },
    removePartyMember: (state: DataState, action: PayloadAction<any>) => {
      state.partyMembers = state.partyMembers.filter(partyMemberI => {
        return partyMemberI.uuid != action.payload.partyMemberUUID
      });
    },
    removeArticle: (state: DataState, action: PayloadAction<any>) => {
      state.articles = state.articles.filter(articleI => {
        return articleI.uuid != action.payload
      });
      let s = 4
      s += 1
    },
    addEntityToArticle: (state: DataState, action: PayloadAction<EntityAndArticle>) => {
      state.entityAndArticles.push(action.payload);
    },
    setRecentlyAddedArticles: (state: DataState, action: PayloadAction<Article[]>) => {
      state.recentlyAddedArticles = (action.payload);
    },
  }
});

// Action creators are generated for each case reducer function
export const { 
  setGovernments, setParties, setPartyMembers, 
  setArticles, setPartyToGovernment, setPartyMemberAndParty,
  addGovernment, addParty, addPartyMember, removeGovernment,
  removeParty, removePartyMember, addArticle,
  setSelectedGovernment, setSelectedParty, setSelectedPartyMember,
  removeArticle, setRecentlyAddedArticles
} = dataSlice.actions;


export default dataSlice.reducer;
