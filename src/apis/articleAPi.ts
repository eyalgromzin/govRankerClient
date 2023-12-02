import { useDispatch } from "react-redux";
import { addArticle, setArticles, setGovernments } from "../redux/dataSlice";
import { Article } from "../models";

export const getAllArticles = (dispatch: any) => {
    fetch("http://127.0.0.1:3000/article/getAllArticles")
        .then((res) => res.json())
        .then((res) => {
            dispatch(setArticles(res.data));
        });
};

export const createArticle = async (
    dispatch: any,
    url: string,
    date: string,
    description: string,
    imageUrl: string,
    rating: number,
) => {
    const data = {url, date, description, imageUrl, rating}
    const customHeaders = {
        "Content-Type": "application/json",
    }
    
    const fullUrl = `http://127.0.0.1:3000/article/createArticle`
    try{
        const res = await fetch(fullUrl, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
        })
        if (!res.ok){
            console.log(await res.json())
        }
    
        const resData = await res.json();
        dispatch(addArticle(resData.res))

        return resData.res
    }catch(error){
        return {
            data: undefined,
            error: error + ''
        }
    }
};
