import { useDispatch } from "react-redux";
import { addArticle, removeArticle, setArticles, setGovernments } from "../redux/dataSlice";
import { APIResult, Article, EntityType } from "../models";

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

export const updateArticle = async (
    articleUUID: string, 
    dispatch: any,
    url: string,
    date: string,
    description: string,
    imageUrl: string,
    rating: number,
    title: string,
    creationDate: string,
) => {
    const data = {url, date, description, imageUrl, rating}

    try{
        const updatedArticle = await updateArticleInDb(data, dispatch);

        const article: Article = {uuid: articleUUID, url, imageUrl, date, description, rating, title, creationDate }

        console.log('updated article in db ', articleUUID, url, imageUrl, date, description, rating, title, creationDate)
    }catch(error){
        return {
            data: undefined,
            error: error + ''
        }
    }
};

async function updateArticleInDb(article: Article, dispatch: any) : Promise<Article>{
    const customHeaders = {
        "Content-Type": "application/json",
    }
    const res = await fetch(`http://127.0.0.1:3000/article/updateArticle`, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(article),
    });
    if (!res.ok) {
        console.log(await res.json());
    }

    const resData = await res.json();
    dispatch(addArticle(resData.res));

    return resData.res;
}

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

export const deleteArticle = async (dispatch: Function, articleUUID: string):Promise<APIResult> => {
    const customHeaders = {
        "Content-Type": "application/json",
    }
    
    const fullUrl = `http://127.0.0.1:3000/article/deleteArticle`
    try{
        const res = await fetch(fullUrl, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify({articleUUID}),
        })
        if (!res.ok){
            console.log(await res.json())
        }
    
        const resData = await res.json();

        dispatch(removeArticle(articleUUID))

        return resData.res
    }catch(error){
        return {
            data: undefined,
            error: error + ''
        }
    }
}
