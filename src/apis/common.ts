import { useDispatch } from 'react-redux';
import {setGovernments, setPartyMemberAndParty, setPartyToGovernment} from '../redux/dataSlice'

export const getAllPartyToGovernment = (dispatch: any) => {
    fetch('http://127.0.0.1:3000/common/getAllPartyToGovernment').then(
        res => res.json()
    ).then(
        res => {
            dispatch(setPartyToGovernment(res.data))
        }
    )
}

export const getAllPartyMemberToParty = (dispatch: any) => {
    fetch('http://127.0.0.1:3000/common/getAllPartyMemberToParty').then(
        res => res.json()
    ).then(
        res => {
            dispatch(setPartyMemberAndParty(res.data))
        }
    )
}
