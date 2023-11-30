import { useDispatch } from "react-redux";
import { setGovernments } from "../redux/dataSlice";
import { Article } from "../models";

export const getAllArticles = (dispatch: any) => {
    fetch("http://127.0.0.1:3000/government/getAllGovernments")
        .then((res) => res.json())
        .then((res) => {
            dispatch(setGovernments(res.data));
        });
};

export const createArticle = (
    dispatch: any,
    url: string,
    date: string,
    description: string,
    imageUrl: string,
    rating: number,
) => {
    const data = {url, date, description, imageUrl, rating}
    fetch("http://127.0.0.1:3000/article/create")
        .then((res) => res.json())
        .then((res) => {
            dispatch(setGovernments(res.data));
        });
};
