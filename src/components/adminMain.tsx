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

type GovernmentsProps = {};

interface Option {
    value: string;
    label: string;
}

export const AdminMain: React.FC<GovernmentsProps> = ({}) => {
    const notify = (str: string) => {
        toast("created", {
            duration: 1000,
            position: "top-center",
        });
    };

    return (
        <div style={{direction: 'ltr'}}>
            <PartyMemberChooser />
            <ArticleCreation notify={notify} />
            <ArticlesList />
            <Toaster
                toastOptions={{
                    className: "",
                    style: {
                        padding: "16px",
                        color: "white",
                        backgroundColor: "green",
                    },
                }}
            />
        </div>
    );
};
