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

    const allPartyMembers = useSelector(
        (state: RootState) => state.data1.partyMembers
    );
    const allParties = useSelector((state: RootState) => {
        return state.data1.parties;
    });
    const allGovernments = useSelector((state: RootState) => {
        return state.data1.governments;
    });

    const selectedPartyMember = useSelector(
        (state: RootState) => state.data1.selectedPartyMember
    ); // see store.ts
    const selectedParty = useSelector(
        (state: RootState) => state.data1.selectedParty
    ); // see store.ts
    const selectedGovernment = useSelector(
        (state: RootState) => state.data1.selectedGovernment
    ); // see store.ts

    //  http://127.0.0.1:5173/entity/171e925c-0bfe-4319-9db3-94f417ae60a2/39ca591f-dda7-43f8-8cf0-a87087ba024f/3aa9ac7f-4ee5-429b-8ad2-c5a42e785875
    const { governmentUUID, partyUUID, partyMemberUUID } = useParams(); //url params

    if (allGovernments && allParties && allPartyMembers){
        let asd = 4
    }

    const RecentlyAddedArticles = useSelector(
        (state: RootState) => state.data1.recentlyAddedArticles
    );

    if (allPartyMembers.length > 0) {
        let asd = 4;
    }

    if (governmentUUID && (!selectedGovernment || selectedGovernment?.uuid != governmentUUID)) {
        const queryGovernment = allGovernments.find(
            (governmentI) => governmentI.uuid == governmentUUID
        );
        // if (
        //     !selectedGovernment ||
        //     (queryGovernment &&
        //         selectedGovernment &&
        //         queryGovernment.uuid != selectedGovernment?.uuid)
        // ) {
        //     dispatch(setSelectedGovernment(queryGovernment));
        selectedEntity = queryGovernment;
        // }
    }
    if (partyUUID && (!selectedParty || selectedParty?.uuid != partyUUID)) {
        const queryParty = allParties.find(
            (partyI) => partyI.uuid == partyUUID
        );
        // if (
        //     !selectedParty ||
        //     (queryParty &&
        //         selectedParty &&
        //         queryParty.uuid != selectedParty?.uuid)
        // ) {
        //     dispatch(setSelectedParty(queryParty));
        selectedEntity = queryParty;
        // }
    }
    if (partyMemberUUID && (!selectedPartyMember || selectedPartyMember?.uuid != partyMemberUUID)) {
        const queryPartyMember = allPartyMembers.find(
            (partyMemberI) => partyMemberI.uuid == partyMemberUUID
        );
        // if (
        //     !selectedPartyMember ||
        //     (queryPartyMember &&
        //         selectedPartyMember &&
        //         queryPartyMember.uuid != selectedPartyMember?.uuid)
        // ) {
        //     dispatch(setSelectedPartyMember(queryPartyMember));
        selectedEntity = queryPartyMember;
        // }
    }
   
    

    // if (selectedEntity) {
    //     let asd = 4;
    // }

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
                    selectedGovernment={selectedGovernment}
                    selectedParty={selectedParty}
                    selectedPartyMember={selectedPartyMember}
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
