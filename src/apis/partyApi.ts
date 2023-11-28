import { setParties } from "../redux/dataSlice"

export const getAllParties = (dispatch: any) => {
    fetch('http://127.0.0.1:3000/party/getAllParties').then(
        res => res.json()
    ).then(
        res => {
            dispatch(setParties(res.data))
        }
    )
}

