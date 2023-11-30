import { APIResult, PartyMember } from "../models";
import { addPartyMember, setPartyMembers } from "../redux/dataSlice";

export const getAllPartyMembers = (dispatch: any) => {
    fetch("http://127.0.0.1:3000/partyMember/getAllPartyMembers")
        .then((res) => res.json())
        .then((res) => {
            dispatch(setPartyMembers(res.data));
        });
};

export const createPartyMember = async (
    dispatch: Function,
    name: string,
    imageUrl: string,
    description: string,
    parentUUID: string
): Promise<APIResult> => {
    try{
        const customHeaders = {
            "Content-Type": "application/json",
        };
    
        const data = {name: name, imageUrl:imageUrl, description:description, partyUUID:parentUUID, uuid: ''}
    
        const fullUrl = `http://127.0.0.1:3000/partyMember/createPartyMember`;
        const res = await fetch(fullUrl, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            return {
                data: undefined,
                error: 'failed to createPartyMember',
            };
        }
    
        const addedPartyMember = await res.json()
        data.uuid = addedPartyMember.res.newPartyMemberUUID
    
        const partyMemberToAdd:PartyMember = {
            uuid: addedPartyMember.res.newPartyMemberUUID,
            name: addedPartyMember.res.name,
            description: addedPartyMember.res.description,
            imageUrl: addedPartyMember.res.imageUrl
        } 
        dispatch(addPartyMember(partyMemberToAdd));
    
        return {
            data: partyMemberToAdd,
            error: undefined,
        };
    }catch(e){
        return {
            data: undefined,
            error: e + '',
        };
    }
};
