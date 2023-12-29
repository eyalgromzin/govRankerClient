import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { RootState } from "../redux/store";
import Select, { SingleValue } from "react-select";
import { getGovernmentParties, getPartyMembers } from "../utils";
import { Government, Party, PartyMember } from "../models";
import { EntityChooser } from "./EntityChooser";
import ArticleCreation from "./createEditArticle";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";
import ArticlesList from "./articlesList";
import { useSelector } from "react-redux";
import LoginForm from "./loginForm";

type GovernmentsProps = {};

interface Option {
    value: string;
    label: string;
}

export const AdminMain: React.FC<GovernmentsProps> = ({}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const selectedPartyMember = useSelector(
        (state: RootState) => state.data1.selectedPartyMember
    );

    const selectedParty = useSelector(
        (state: RootState) => state.data1.selectedParty
    );

    const selectedGovernment = useSelector(
        (state: RootState) => state.data1.selectedGovernment
    );

    const notify = (str: string) => {
        toast("created", {
            duration: 1000,
            position: "top-center",
        });
    };

    if (isLoggedIn) {
        return (
            <div>
                <EntityChooser isShowEditButtons={true} />
                {selectedPartyMember && selectedParty && selectedGovernment && (
                    <ArticleCreation notify={notify} article={undefined} />
                )}
                <ArticlesList isEditable={true} />
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
    }else{
        return <LoginForm  />
    }
};
