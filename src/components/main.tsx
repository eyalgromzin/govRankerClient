import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { useParams } from "react-router-dom";
import {
    setSelectedGovernment,
    setSelectedParty,
    setSelectedPartyMember,
} from "../redux/dataSlice";
import { getAllPartyMembers } from "../apis/partyMembersApi";

type HomeProps = {};

export const Main: React.FC<HomeProps> = ({}) => {
    const dispatch = useDispatch();

    let selectedEntity:PartyMember| undefined = undefined

    const RecentlyAddedArticles = useSelector(
        (state: RootState) => state.data1.recentlyAddedArticles
    );

    const allPartyMembers = useSelector(
        (state: RootState) => state.data1.partyMembers
    );
    const allParties = useSelector((state: RootState) => {
        return state.data1.parties;
    });
    const allGovernments = useSelector((state: RootState) => {
        return state.data1.governments;
    });

    const { governmentUUID, partyUUID, partyMemberUUID } = useParams(); //url params

    const selectedGovernment = allGovernments.find(
        (governmentI) => governmentI.uuid == governmentUUID
    );

    const selectedParty = allParties.find(
        (partyI) => partyI.uuid == partyUUID
    );
    
    const selectedPartyMember = allPartyMembers.find(
        (partyMemberI) => partyMemberI.uuid == partyMemberUUID
    );
    
    if (selectedGovernment) selectedEntity = selectedGovernment
    if (selectedParty) selectedEntity = selectedParty
    if (selectedPartyMember) selectedEntity = selectedPartyMember
   
    if (allGovernments.length > 0 && allParties.length > 0 && allPartyMembers.length > 0){
        let asd = 4
    }

    return (
        <div>
            {!partyMemberUUID &&
                RecentlyAddedArticles &&
                RecentlyAddedArticles.length > 0 && (
                    <RecentlyAdded articles={RecentlyAddedArticles} />
                )}

            <div style={{ marginTop: "70px" }}>
                <EntityChooser
                    isShowEditButtons={false}
                    // selectedGovernment={selectedGovernment}
                    // selectedParty={selectedParty}
                    // selectedPartyMember={selectedPartyMember}
                />
            </div>
            <div>
                {(partyUUID || partyUUID || governmentUUID) && (
                    <Summary
                        name={selectedEntity?.name}
                        imageUrl={selectedEntity?.imageUrl}
                        description={selectedEntity?.description}
                    />
                )}
            </div>
            <div style={{ height: "50px" }} />
            <ArticlesList isEditable={false} />
        </div>
    );
};
