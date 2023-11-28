import { useDispatch } from 'react-redux';
import {setGovernments} from '../redux/dataSlice'

export const getAllArticles = (dispatch: any) => {
    fetch('http://127.0.0.1:3000/government/getAllGovernments').then(
        res => res.json()
    ).then(
        res => {
            dispatch(setGovernments(res.data))
        }
    )
}




