import { useDispatch } from 'react-redux';
import {setGovernments} from '../redux/dataSlice'

export const getAllGovernments = (dispatch: any) => {
    fetch('http://127.0.0.1:3000/government/getAllGovernments').then(
        res => res.json()
    ).then(
        res => {
            dispatch(setGovernments(res.data))
        }
    )
}

export const addGovernment = async (dispatch: Function, actionName: string, data: any) => {
    const customHeaders = {
        "Content-Type": "application/json",
    }
    
    const fullUrl = `http://127.0.0.1:3000/${actionName}`
    const res = await fetch(fullUrl, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    })
    if (!res.ok){
        return
    }

    const resData = await res.text();
    dispatch(createGovernment())
}




