import { useDispatch } from "react-redux";
import { addArticle, setArticles, setGovernments } from "../redux/dataSlice";
import { Article, EntityType } from "../models";

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
    partyMemberUUID: string,
    partyUUID: string,
    governmentUUID: string,
) => {
    const data = {url, date, description, imageUrl, rating}

    try{
        const addedArticle = await addArticleToDb(data, dispatch);

        await createEntityToArticleInDB(partyMemberUUID, addedArticle.uuid, EntityType.partyMember, dispatch);

        console.log('added entity to article ', partyMemberUUID, addedArticle.uuid)
    }catch(error){
        return {
            data: undefined,
            error: error + ''
        }
    }
};
async function addArticleToDb(data: { url: string; date: string; description: string; imageUrl: string; rating: number; }, dispatch: any) : Promise<Article>{
    const customHeaders = {
        "Content-Type": "application/json",
    }
    const res = await fetch(`http://127.0.0.1:3000/article/createArticle`, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        console.log(await res.json());
    }

    const resData = await res.json();
    dispatch(addArticle(resData.res));

    return resData.res;
}

async function createEntityToArticleInDB(entityUUID: string, articleUUID: string, entityTypeId: number, dispatch: any) {
    const customHeaders = {
        "Content-Type": "application/json",
    }

    const data = {entityUUID, articleUUID, entityTypeId}
    const res = await fetch(`http://127.0.0.1:3000/article/createEntityArticle`, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        console.log(await res.json());
    }

    const resData = await res.json();
    dispatch(addArticle(resData.res));

    return resData.res;
}

