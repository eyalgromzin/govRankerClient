import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getGovernmentParties, getPartyMembers } from "../utils";
import { EntityType, Government, Party, PartyMember } from "../models";
import AddButton from "./addButton";
import DeleteButton from "./deleteButton";
import {
    setSelectedGovernment,
    setSelectedParty,
    setSelectedPartyMember,
} from "../redux/dataSlice";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";

type ChooserProps = {
    isShowEditButtons: boolean;
};

interface Option {
    value: string | undefined;
    label: string | undefined;
}

export const PartyMemberChooser: React.FC<ChooserProps> = ({
    isShowEditButtons,
}) => {
    const dispatch = useDispatch();

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

    const selectedPartyMember = useSelector(
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

    let selectedPartyMemberOption: Option | undefined = {
        value: selectedPartyMember ? selectedPartyMember.uuid : "",
        label: selectedPartyMember ? selectedPartyMember.name : "",
    };
    if (!selectedPartyMember) {
        selectedPartyMemberOption = undefined;
    }

    let selectedPartyOption: Option | null = {
        value: selectedParty ? selectedParty.uuid : "",
        label: selectedParty ? selectedParty.name : "",
    };
    if (!selectedParty) {
        selectedPartyOption = null;
    }

    let selectedGovernmentOption: Option | null = {
        value: selectedGovernment ? selectedGovernment.uuid : "",
        label: selectedGovernment ? selectedGovernment.name : "",
    };
    if (!selectedGovernment) {
        selectedGovernmentOption = null;
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

    const onGovernmentChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        const selectedGovernment = governments.filter(
            (govI) => govI.uuid == selectedValue
        )[0];
        dispatch(setSelectedGovernment(selectedGovernment));
        const govParties = getGovernmentParties(
            selectedValue,
            partyAndGovernment,
            allParties
        );
        const newPartyOptions: any = [];
        govParties.forEach((partyI) => {
            if (partyI) {
                newPartyOptions.push({
                    value: partyI.uuid,
                    label: partyI.name,
                });
            }
        });

        setPartyOptions(newPartyOptions);
    };

    const onPartyChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        const selectedParty = allParties.filter(
            (partyI) => partyI.uuid == selectedValue
        )[0];
        dispatch(setSelectedParty(selectedParty));
        const partyMembers = getPartyMembers(
            selectedValue,
            partyMemberAndParty,
            allPartyMembers
        );
        const newPartyOptions: any = [];
        partyMembers.forEach((partyMemberI) => {
            if (partyMemberI) {
                newPartyOptions.push({
                    value: partyMemberI.uuid,
                    label: partyMemberI.name,
                });
            }
        });

        setPartyMemberOptions(newPartyOptions);
    };

    const onPartyMemberChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        const selectedPartyMember = allPartyMembers.filter(
            (partyMemberI) => partyMemberI.uuid == selectedValue
        )[0];
        dispatch(setSelectedPartyMember(selectedPartyMember));
    };

    const dropDownAndButtonsStyle: React.CSSProperties = {
        display: "flex",
        marginBottom: "10px",
    };

    const dropdownStyle: React.CSSProperties = {
        minWidth: 317,
        marginLeft: 20
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
            <div style={{ display: "flex" }}>
                <div className="government" style={dropDownAndButtonsStyle}>
                    <FormControl style={dropdownStyle}>
                        <InputLabel>ממשלה</InputLabel>
                        <Select
                            variant="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedGovernmentOption?.value}
                            label="ממשלה"
                            placeholder="ממשלה"
                            onChange={onGovernmentChange}
                        >
                            <MenuItem key='clear' value={undefined}>&nbsp;</MenuItem>
                            {governmentOptions.map((optionI: Option) => (
                                <MenuItem
                                    key={optionI.value}
                                    value={optionI.value}
                                >
                                    {optionI.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {isShowEditButtons && (
                        <AddButton
                            entityType={EntityType.government}
                            parentUUID={undefined}
                        />
                    )}
                    {isShowEditButtons && (
                        <DeleteButton
                            isEnabled={isDeleteGovernmentButtonEnabled}
                            entityUUID={selectedGovernmentOption?.value}
                            entityType={EntityType.government}
                            onSuccess={() => onGovernmentDeleteSuccess()}
                        />
                    )}
                </div>

                <div className="party" style={dropDownAndButtonsStyle}>
                    {/* <Select
                        styles={customStyles}
                        placeholder={"מפלגה"}
                        options={partyOptions}
                        onChange={onPartyChange}
                        value={selectedPartyOption}
                    /> */}
                    <FormControl style={dropdownStyle}>
                        <InputLabel>מפלגה</InputLabel>
                        <Select
                            variant="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedPartyOption?.value}
                            label="מפלגה"
                            onChange={onPartyChange}
                        >
                            <MenuItem key='clear' value={undefined}>&nbsp;</MenuItem>
                            {partyOptions.map((optionI: Option) => (
                                <MenuItem
                                    key={optionI.value}
                                    value={optionI.value}
                                >
                                    {optionI.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {isShowEditButtons && (
                        <AddButton
                            entityType={EntityType.party}
                            parentUUID={selectedGovernmentOption?.value}
                        />
                    )}
                    {isShowEditButtons && (
                        <DeleteButton
                            isEnabled={isDeletePartyButtonEnabled}
                            entityUUID={selectedPartyOption?.value}
                            entityType={EntityType.party}
                            onSuccess={() => onPartyDeleteSuccess()}
                        />
                    )}
                </div>

                <div style={dropDownAndButtonsStyle}>
                    {/* <Select
                        styles={customStyles}
                        placeholder={"חבר כנסת"}
                        options={partyMemberOptions}
                        onChange={onPartyMemberChange}
                        value={selectedPartyMemberOption}
                    /> */}
                    <FormControl style={dropdownStyle}>
                        <InputLabel>חבר כנסת</InputLabel>
                        <Select
                            variant="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedPartyMemberOption?.value}
                            label="חבר כנסת"
                            onChange={onPartyMemberChange}
                        >
                            <MenuItem key='clear' value={undefined}>&nbsp;</MenuItem>
                            {partyMemberOptions.map((optionI: Option) => (
                                <MenuItem
                                    key={optionI.value}
                                    value={optionI.value}
                                >
                                    {optionI.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {isShowEditButtons && (
                        <AddButton
                            entityType={EntityType.partyMember}
                            parentUUID={selectedPartyOption?.value}
                        />
                    )}
                    {isShowEditButtons && (
                        <DeleteButton
                            isEnabled={isDeletePartyMemberButtonEnabled}
                            entityUUID={selectedPartyMemberOption?.value}
                            entityType={EntityType.partyMember}
                            onSuccess={() => onPartyMemberDeleteSuccess()}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
};
