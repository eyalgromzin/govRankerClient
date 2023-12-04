import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Select, { SingleValue } from "react-select";
import { getGovernmentParties, getPartyMembers } from "../utils";
import { Government, Party, PartyMember } from "../models";
import { PartyMemberChooser } from "./partyMemberChooser";
import ArticleCreation from "./createEditArticle";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import ArticlesList from "./articlesList";
import RecentlyAdded from "./recentlyAdded";
import Summary from "./imageAndTextSummary";

type GovernmentsProps = {};

export const Main: React.FC<GovernmentsProps> = ({}) => {
    const RecentlyAddedArticles = useSelector((state: RootState) => state.data1.recentlyAddedArticles); // see store.ts
    const selectedPartyMember = useSelector((state: RootState) => state.data1.selectedPartyMember); // see store.ts

    return (
        <div>
            <RecentlyAdded articles={RecentlyAddedArticles} />
            <PartyMemberChooser />
            {
                selectedPartyMember && <Summary name={selectedPartyMember?.name} imageUrl={selectedPartyMember?.imageUrl} description={selectedPartyMember?.description} />
            }
            <ArticlesList isEditable={false} />
        </div>
    );
};
