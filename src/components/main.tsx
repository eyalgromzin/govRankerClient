import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Select, { SingleValue } from "react-select";
import { getGovernmentParties, getPartyMembers } from "../utils";
import { Government, Party, PartyMember } from "../models";
import { EntityChooser } from "./EntityChooser";
import ArticleCreation from "./createEditArticle";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import ArticlesList from "./articlesList";
import RecentlyAdded from "./recentlyAdded";
import Summary from "./imageAndTextSummary";
import knesetImage from "../images/kneset.png"; // with import

type HomeProps = {};

export const Home: React.FC<HomeProps> = ({}) => {
    const RecentlyAddedArticles = useSelector(
        (state: RootState) => state.data1.recentlyAddedArticles
    ); // see store.ts
    const selectedPartyMember = useSelector(
        (state: RootState) => state.data1.selectedPartyMember
    ); // see store.ts
    const selectedParty = useSelector(
        (state: RootState) => state.data1.selectedParty
    ); // see store.ts
    const selectedGovernment = useSelector(
        (state: RootState) => state.data1.selectedGovernment
    ); // see store.ts

    let selectedEntity:PartyMember| undefined = undefined
    if(selectedPartyMember){
        selectedEntity = selectedPartyMember
    }else if(selectedParty){
        selectedEntity = selectedParty
    }else if(selectedGovernment){
        selectedEntity = selectedGovernment
    }

    return (
        <div>
            {!selectedPartyMember &&
                RecentlyAddedArticles &&
                RecentlyAddedArticles.length > 0 && (
                    <RecentlyAdded articles={RecentlyAddedArticles} />
                )}
            {/* <img src={knesetImage} style={{height: '400px', margin: '0 auto'}}/> */}
            <div style={{ marginTop: "70px" }}>
                <EntityChooser isShowEditButtons={false} />
            </div>
            <div>
                { (selectedPartyMember || selectedParty || selectedGovernment) && 
                    <Summary
                        name={selectedEntity?.name}
                        imageUrl={selectedEntity?.imageUrl}
                        description={selectedEntity?.description}
                    />
                }
            </div>
            <div style={{ height: "50px" }} />
            <ArticlesList isEditable={false} />
        </div>
    );
};
