import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Select, { SingleValue } from "react-select";
import { getGovernmentParties, getPartyMembers } from "../utils";
import { Government, Party, PartyMember } from "../models";
import AddButton from "./addButton";

type ChooserProps = {};

interface Option {
    value: string;
    label: string;
}

export const PartyMemberChooser: React.FC<ChooserProps> = ({}) => {
    const governments = useSelector(
        (state: RootState) => state.data1.governments
    );
    const allParties = useSelector((state: RootState) => state.data1.parties);
    const allPartyMembers = useSelector(
        (state: RootState) => state.data1.partyMembers
    );
    const partyAndGovernment = useSelector(
        (state: RootState) => state.data1.partyAndGovernment
    );
    const partyMemberAndParty = useSelector(
        (state: RootState) => state.data1.partyMemberAndParty
    );

    const [governmentOptions, setGovernmentOptions] = useState<Option[]>([]);
    const [partyOptions, setPartyOptions] = useState<Option[]>([]);
    const [partyMemberOptions, setPartyMemberOptions] = useState<Option[]>([]);
    const [selectedGovernmentOption, setSelectedGovernmentOption] = useState<
        Option | undefined
    >();
    const [selectedPartyOption, setSelectedPartyOption] = useState<
        Option | undefined
    >();
    const [selectedPartyMember, setSelectedPartyMemberOption] = useState<
        Option | undefined
    >();

    useEffect(() => {
        const initialGovOptions: Option[] = [];
        governments.forEach((itemI) => {
            initialGovOptions.push({ value: itemI.uuid, label: itemI.name });
        });
        setGovernmentOptions(initialGovOptions);
    }, [governments]);

    const onGovernmentChange = (selectedOption: any) => {
        const selectedGovernment = governments.filter(
            (govI) => govI.uuid == selectedOption.value
        );
        setSelectedGovernmentOption(selectedOption);
        const govParties = getGovernmentParties(
            selectedOption.value,
            partyAndGovernment,
            allParties
        );
        const newPartyOptions: any = [];
        govParties.forEach((partyI) => {
            newPartyOptions.push({ value: partyI.uuid, label: partyI.name });
        });

        setPartyOptions(newPartyOptions);
    };

    const onPartyChange = (selectedOption: any) => {
        const selectedParty = allParties.filter(
            (partyI) => partyI.uuid == selectedOption.value
        );
        setSelectedPartyOption(selectedOption);
        const partyMembers = getPartyMembers(
            selectedOption.value,
            partyMemberAndParty,
            allPartyMembers
        );
        const newPartyOptions: any = [];
        partyMembers.forEach((partyI) => {
            newPartyOptions.push({ value: partyI.uuid, label: partyI.name });
        });

        setPartyMemberOptions(newPartyOptions);
    };

    const onPartyMemberChange = (selectedOption: any) => {
        const selectedPartyMember = allPartyMembers.filter(
            (partyMemberI) => partyMemberI.uuid == selectedOption.value
        );
        setSelectedPartyMemberOption(selectedOption);
    };

    const customStyles = {
        control: () => ({
            width: 300, // Set the width of the control
        }),
    };

    const dropDownAndButtonsStyle: React.CSSProperties = {
        display: "flex",
    };

    function openAddGovernmentDialog(): void {
        console.log('clicked add gov  ')
    }

    return (
        <Fragment>
            <div style={dropDownAndButtonsStyle}>
                <Select
                    styles={customStyles}
                    placeholder={"government"}
                    options={governmentOptions}
                    onChange={onGovernmentChange}
                />
                <AddButton onClick={() => openAddGovernmentDialog()} />
            </div>

            <Select
                styles={customStyles}
                placeholder={"party"}
                options={partyOptions}
                onChange={onPartyChange}
            />

            <Select
                styles={customStyles}
                placeholder={"party member"}
                options={partyMemberOptions}
                onChange={onPartyMemberChange}
            />
        </Fragment>
    );
};
