import {setPartyMembers} from '../redux/dataSlice'

export const getAllPartyMembers = (dispatch: any) => {
    fetch('http://127.0.0.1:3000/partyMember/getAllPartyMembers').then(
        res => res.json()
    ).then(
        res => {
            dispatch(setPartyMembers(res.data))
        }
    )
}
