import {addPartyMember, setPartyMembers} from '../redux/dataSlice'

export const getAllPartyMembers = (dispatch: any) => {
    fetch('http://127.0.0.1:3000/partyMember/getAllPartyMembers').then(
        res => res.json()
    ).then(
        res => {
            dispatch(setPartyMembers(res.data))
        }
    )
}


export const createPartyMember = async (dispatch: Function, data: any):Promise<any> => {
    const customHeaders = {
        "Content-Type": "application/json",
    }
    
    const fullUrl = `http://127.0.0.1:3000/party/addParty`
    const res = await fetch(fullUrl, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    })
    if (!res.ok){
        return
    }

    const resData = await res.text();
    dispatch(addPartyMember(data))
}

