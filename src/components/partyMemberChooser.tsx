import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Select, { SingleValue } from "react-select";
import { getGovernmentParties, getPartyMembers } from "../utils";
import { EntityType, Government, Party, PartyMember } from "../models";
import AddButton from "./addButton";
import DeleteButton from "./deleteButton";
import { setSelectedGovernment, setSelectedParty, setSelectedPartyMember } from "../redux/dataSlice";

type ChooserProps = {};

interface Option {
    value: string;
    label: string;
}

export const PartyMemberChooser: React.FC<ChooserProps> = ({}) => {
    const dispatch = useDispatch()

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

    const selectedPartyMember  = useSelector(
        (state: RootState) => state.data1.selectedPartyMember
    );

    const selectedParty = useSelector(
        (state: RootState) => state.data1.selectedParty
    );

    const selectedGovernment = useSelector(
        (state: RootState) => state.data1.selectedGovernment
    );

    const [governmentOptions, setGovernmentOptions] = useState<Option[]>([]);
    const [partyOptions, setPartyOptions] = useState<Option[]>([]);
    const [partyMemberOptions, setPartyMemberOptions] = useState<Option[]>([]);
    
    let selectedPartyMemberOption: Option | null = {
        value: selectedPartyMember? selectedPartyMember.uuid : '',
        label: selectedPartyMember? selectedPartyMember.name : ''
    }
    if (!selectedPartyMember){
        selectedPartyMemberOption = null
    }

    let selectedPartyOption: Option | null = {
        value: selectedParty? selectedParty.uuid : '',
        label: selectedParty? selectedParty.name : ''
    }
    if (!selectedParty){
        selectedPartyOption = null
    }

    let selectedGovernmentOption: Option | null = {
        value: selectedGovernment? selectedGovernment.uuid : '',
        label: selectedGovernment? selectedGovernment.name : ''
    }
    if (!selectedGovernment){
        selectedGovernmentOption = null
    }

    const isDeleteGovernmentButtonEnabled =
        partyAndGovernment.filter(
            (partyAndGovernmentI) =>
                partyAndGovernmentI.governmentUUID ==
                selectedGovernmentOption?.value
        ).length == 0;
    const isDeletePartyButtonEnabled =
        partyMemberAndParty.filter(
            (partyMemberAndPartyI) =>
                partyMemberAndPartyI.partyUUID == selectedPartyOption?.value
        ).length == 0;
    const isDeletePartyMemberButtonEnabled = true;

    useEffect(() => {
        const initialGovOptions: Option[] = [];
        governments &&
            governments.forEach((itemI) => {
                initialGovOptions.push({
                    value: itemI.uuid,
                    label: itemI.name,
                });
            });
        setGovernmentOptions(initialGovOptions);
    }, [governments]);

    const onGovernmentChange = (selectedOption: any) => {
        const selectedGovernment = governments.filter(
            (govI) => govI.uuid == selectedOption.value
        )[0];
        dispatch(setSelectedGovernment(selectedGovernment));
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
        )[0];
        dispatch(setSelectedParty(selectedParty))
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
        )[0];
        dispatch(setSelectedPartyMember(selectedPartyMember));
    };

    const customStyles = {
        control: () => ({
            width: 300, // Set the width of the control
        }),
    };

    const dropDownAndButtonsStyle: React.CSSProperties = {
        display: "flex",
        marginBottom: "10px",
    };

    function openAddGovernmentDialog(): void {
        console.log("clicked add gov  ");
    }

    function onGovernmentDeleteSuccess() {
        setSelectedGovernment(null);
    }

    function onPartyDeleteSuccess() {
        setSelectedGovernment(null);
    }

    function onPartyMemberDeleteSuccess() {
        setSelectedGovernment(null);
    }

    return (
        <Fragment>
            <div style={dropDownAndButtonsStyle}>
                <Select
                    styles={customStyles}
                    placeholder={"government"}
                    options={governmentOptions}
                    onChange={onGovernmentChange}
                    value={selectedGovernmentOption}
                />
                <AddButton
                    entityType={EntityType.government}
                    parentUUID={undefined}
                />
                <DeleteButton
                    isEnabled={isDeleteGovernmentButtonEnabled}
                    entityUUID={selectedGovernmentOption?.value}
                    entityType={EntityType.government}
                    onSuccess={() => onGovernmentDeleteSuccess()}
                />
            </div>

            <div style={dropDownAndButtonsStyle}>
                <Select
                    styles={customStyles}
                    placeholder={"party"}
                    options={partyOptions}
                    onChange={onPartyChange}
                    value={selectedPartyOption}
                />
                <AddButton
                    entityType={EntityType.party}
                    parentUUID={selectedGovernmentOption?.value}
                />
                <DeleteButton
                    isEnabled={isDeletePartyButtonEnabled}
                    entityUUID={selectedPartyOption?.value}
                    entityType={EntityType.party}
                    onSuccess={() => onPartyDeleteSuccess()}
                />
            </div>

            <div style={dropDownAndButtonsStyle}>
                <Select
                    styles={customStyles}
                    placeholder={"party member"}
                    options={partyMemberOptions}
                    onChange={onPartyMemberChange}
                    value={selectedPartyMemberOption}
                />
                <AddButton
                    entityType={EntityType.partyMember}
                    parentUUID={selectedPartyOption?.value}
                />
                <DeleteButton
                    isEnabled={isDeletePartyMemberButtonEnabled}
                    entityUUID={selectedPartyMemberOption?.value}
                    entityType={EntityType.partyMember}
                    onSuccess={() => onPartyMemberDeleteSuccess()}
                />
            </div>
        </Fragment>
    );
};
