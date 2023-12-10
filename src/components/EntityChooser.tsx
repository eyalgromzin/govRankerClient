import {
    Fragment,
    FunctionComponent,
    useEffect,
    useRef,
    useState,
} from "react";
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
import {
    getAndShowGovernmentArticles,
    getAndShowPartyArticles,
} from "../apis/articleAPi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type ChooserProps = {
    isShowEditButtons: boolean;
    // selectedGovernment: Government | undefined;
    // selectedParty: Party | undefined;
    // selectedPartyMember: PartyMember | undefined;
};

interface Option {
    value: string;
    label: string;
}

export const EntityChooser: React.FC<ChooserProps> = ({
    isShowEditButtons,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const isGettingArticles = useRef(false);
    // const isGotArticles = useRef<boolean>(false);

    const allGovernments = useSelector(
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

    const { governmentUUID, partyUUID, partyMemberUUID } = useParams(); //url params

    const selectedGovernment = allGovernments.find(
        (governmentI) => governmentI.uuid == governmentUUID
    );

    const selectedParty = allParties.find((partyI) => partyI.uuid == partyUUID);

    const selectedPartyMember = allPartyMembers.find(
        (partyMemberI) => partyMemberI.uuid == partyMemberUUID
    );

    useEffect(() => {
        if (selectedGovernment) {
            const govParties = getGovernmentParties(
                selectedGovernment?.uuid,
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
        }
    }, [selectedGovernment]);

    useEffect(() => {
        if (selectedParty) {
            const partyMembers = getPartyMembers(
                selectedParty?.uuid,
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
        }
    }, [selectedParty]);

    const [governmentOptions, setGovernmentOptions] = useState<Option[]>([]);
    const [partyOptions, setPartyOptions] = useState<Option[]>([]);
    const [partyMemberOptions, setPartyMemberOptions] = useState<Option[]>([]);

    const isDeleteGovernmentButtonEnabled =
        partyAndGovernment.filter(
            (partyAndGovernmentI) =>
                partyAndGovernmentI.governmentUUID == selectedGovernment?.uuid
        ).length == 0;
    const isDeletePartyButtonEnabled =
        partyMemberAndParty.filter(
            (partyMemberAndPartyI) =>
                partyMemberAndPartyI.partyUUID == selectedParty?.uuid
        ).length == 0;
    const isDeletePartyMemberButtonEnabled = true;

    useEffect(() => {
        const initialGovOptions: Option[] = [];
        allGovernments &&
            allGovernments.forEach((itemI) => {
                initialGovOptions.push({
                    value: itemI.uuid,
                    label: itemI.name,
                });
            });
        setGovernmentOptions(initialGovOptions);
    }, [allGovernments]);

    const onGovernmentChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        const selectedGovernment = allGovernments.filter(
            (govI) => govI.uuid == selectedValue
        )[0];

        navigate(`/entity/${selectedGovernment.uuid}`);

        if (selectedGovernment) {
            getAndShowGovernmentArticles(
                dispatch,
                selectedGovernment.uuid,
                () => {}
            );
        }
    };

    const onPartyChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        const selectedParty = allParties.filter(
            (partyI) => partyI.uuid == selectedValue
        )[0];

        navigate(`/entity/${selectedGovernment?.uuid}/${selectedParty.uuid}`);

        if (selectedParty) {
            getAndShowPartyArticles(dispatch, selectedParty.uuid, () => {});
        }
    };

    const onPartyMemberChange = (event: SelectChangeEvent) => {
        const selectedValue = event.target.value;
        const selectedPartyMember = allPartyMembers.filter(
            (partyMemberI) => partyMemberI.uuid == selectedValue
        )[0];

        navigate(
            `/entity/${selectedGovernment?.uuid}/${selectedParty?.uuid}/${selectedPartyMember?.uuid}`
        );
    };

    const dropDownAndButtonsStyle: React.CSSProperties = {
        display: "flex",
        marginBottom: "10px",
    };

    const dropdownStyle: React.CSSProperties = {
        minWidth: 317,
        marginLeft: 20,
    };

    function onGovernmentDeleteSuccess() {
        // setSelectedGovernment(null);
    }

    function onPartyDeleteSuccess() {
        // setSelectedGovernment(null);
    }

    function onPartyMemberDeleteSuccess() {
        // setSelectedGovernment(undefined);
    }

    // if (!isGotArticles && !isGettingArticles) {
    //     if (selectedPartyMember) {
    //         isGettingArticles.current = true;
    //         getAndShowPartyArticles(dispatch, selectedPartyMember.uuid, () => {
    //             isGettingArticles.current = false;
    //             isGotArticles.current = true;
    //         });
    //     } else if (selectedParty) {
    //         isGettingArticles.current = true;
    //         getAndShowPartyArticles(dispatch, selectedParty.uuid, () => {
    //             isGettingArticles.current = false;
    //             isGotArticles.current = true;
    //         });
    //     } else if (selectedGovernment) {
    //         isGettingArticles.current = true;
    //         getAndShowPartyArticles(dispatch, selectedGovernment.uuid, () => {
    //             isGettingArticles.current = false;
    //             isGotArticles.current = true;
    //         });
    //     }
    // }

    return (
        <Fragment>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div className="government" style={dropDownAndButtonsStyle}>
                    <FormControl style={dropdownStyle}>
                        <InputLabel>ממשלה</InputLabel>
                        <Select
                            variant="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={
                                selectedGovernment
                                    ? selectedGovernment?.uuid
                                    : ""
                            }
                            label="ממשלה"
                            placeholder="ממשלה"
                            onChange={onGovernmentChange}
                        >
                            <MenuItem key="clear" value={""}>
                                &nbsp;
                            </MenuItem>
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
                            entityUUID={selectedGovernment?.uuid}
                            entityType={EntityType.government}
                            onSuccess={() => onGovernmentDeleteSuccess()}
                        />
                    )}
                </div>

                <div className="party" style={dropDownAndButtonsStyle}>
                    <FormControl style={dropdownStyle}>
                        <InputLabel>מפלגה</InputLabel>
                        <Select
                            variant="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedParty ? selectedParty?.uuid : ""}
                            label="מפלגה"
                            onChange={onPartyChange}
                        >
                            <MenuItem key="clear" value={""}>
                                &nbsp;
                            </MenuItem>
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
                            parentUUID={selectedGovernment?.uuid}
                        />
                    )}
                    {isShowEditButtons && (
                        <DeleteButton
                            isEnabled={isDeletePartyButtonEnabled}
                            entityUUID={selectedParty?.uuid}
                            entityType={EntityType.party}
                            onSuccess={() => onPartyDeleteSuccess()}
                        />
                    )}
                </div>

                <div style={dropDownAndButtonsStyle}>
                    <FormControl style={dropdownStyle}>
                        <InputLabel>חבר כנסת</InputLabel>
                        <Select
                            variant="standard"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedPartyMember? selectedPartyMember?.uuid : ''}
                            label="חבר כנסת"
                            onChange={onPartyMemberChange}
                        >
                            <MenuItem key="clear" value={""}>
                                &nbsp;
                            </MenuItem>
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
                            parentUUID={selectedParty?.uuid}
                        />
                    )}
                    {isShowEditButtons && (
                        <DeleteButton
                            isEnabled={isDeletePartyMemberButtonEnabled}
                            entityUUID={selectedPartyMember?.uuid}
                            entityType={EntityType.partyMember}
                            onSuccess={() => onPartyMemberDeleteSuccess()}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
};
