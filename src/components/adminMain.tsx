import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Select, { SingleValue } from "react-select";
import { getGovernmentParties, getPartyMembers } from "../utils";
import { Government, Party, PartyMember } from "../models";
import { PartyMemberChooser } from "./partyMemberChooser";
import ArticleCreation from "./ArticleCreation";

type GovernmentsProps = {};

interface Option { 
    value: string;
    label: string;
}

export const AdminMain: React.FC<GovernmentsProps> = ({}) => {
    return <div>
        <PartyMemberChooser />
        <ArticleCreation />
    </div>
};
