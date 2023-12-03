import React, { useState } from "react";
import { createArticle, updateArticle } from "../apis/articleAPi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Article } from "../models";

interface MyComponentProps {
    notify: Function;
    article: Article;
}

const CreateArticle: React.FC<MyComponentProps> = ({ notify, article }) => {
    // State for each field
    const [url, setUrl] = useState(article?.url || '');
    const [date, setDate] = useState(article?.date || '');
    const [description, setDescription] = useState(article?.description || '');
    const [imageUrl, setImageUrl] = useState(article?.imageUrl || '');
    const [rating, setRating] = useState<number>(article?.rating || 0);
    const [creationDate, setCreationDate] = useState(article?.creationDate || '');
    const [title, setTitle] = useState(article?.title || '');

    const selectedPartyMember = useSelector(
        (state: RootState) => state.data1.selectedPartyMember
    );

    const selectedParty = useSelector(
        (state: RootState) => state.data1.selectedParty
    );

    const selectedGovernment = useSelector(
        (state: RootState) => state.data1.selectedGovernment
    );

    const dispatch = useDispatch();

    // Function to handle the "create" button click
    const handleCreateClick = async () => {
        if (selectedPartyMember && selectedParty && selectedGovernment) {
            if(article){
                await updateArticle(
                    article.uuid,
                    dispatch,
                    url,
                    date,
                    description,
                    imageUrl,
                    rating,
                    title,
                    article.creationDate
                );
    
                notify("updated article");
            }else{
                await createArticle(
                    dispatch,
                    url,
                    date,
                    description,
                    imageUrl,
                    rating,
                    selectedPartyMember?.uuid,
                    selectedParty?.uuid,
                    selectedGovernment?.uuid
                );
    
                notify("created article");
            }
        }else{
          alert('plz select party member')
        }
    };

    return (
        <div style={{ padding: "10px", backgroundColor: "lightcoral" }}>
            <label>
                URL:
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </label>

            <label>
                Date:
                <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </label>

            <label>
                Description:
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <br />

            <label>
                Image URL:
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </label>

            <label>
                title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            <label>
                Rating:
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                />
            </label>

            <label>
                Creation Date:
                <input
                    type="text"
                    value={creationDate}
                    onChange={(e) => setCreationDate(e.target.value)}
                />
            </label>
            <br />
            

            <button
                onClick={handleCreateClick}
                style={{ padding: "5px", backgroundColor: "lightgray" }}
            >
                {article ? 'save' : 'create'}
            </button>
        </div>
    );
};

export default CreateArticle;
