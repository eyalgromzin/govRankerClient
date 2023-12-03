import React, { useState } from "react";
import { deleteArticle } from "../apis/articleAPi";
import { useSelector, useDispatch } from "react-redux";
import ConfirmDialog from "./confirmDialog";
import CreateEditArticle from "./createEditArticle";
import { Article } from "../models";

interface ThumbnailProps {
    article:Article
}

const Thumbnail: React.FC<ThumbnailProps> = ({
    article
}) => {
    const dispatch = useDispatch();

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const divStyles: React.CSSProperties = {
        display: "flex",
        marginTop: "20px",
    };

    function onDeleteArticle(uuid: string): void {
        deleteArticle(dispatch, uuid);
        setIsConfirmDialogOpen(false)
    }

    const previewItem = <a href={article?.url} style={{ cursor: "pointer", margin: "0 auto" }}>
        <div key={article?.uuid} style={divStyles} className="thumbnail">
            <div>
                <img
                    src={article?.imageUrl}
                    style={{
                        height: "200px",
                        margin: "0 auto",
                        width: "300px",
                    }}
                    alt={article?.title}
                />
            </div>
            <div style={{ cursor: "pointer", margin: "0 15px" }}>
                <div className="thumbnail-details">
                    <h2>{article?.title}</h2>
                    <p>{article?.description}</p>
                    <p>Date: {article?.date}</p>
                    <p>Rating: {article?.rating}</p>
                    <p>Creation Date: {article?.creationDate}</p>
                </div>
            </div>
        </div>
    </a>

    const editItem = <CreateEditArticle article={article} notify={() => alert('updated')} />

    return (
        <div>
            {
                isEdit ? editItem : previewItem
            }
            
            <div style={{ display: "flex" }}>
                <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-delete-736-470378.png"
                    onClick={() => setIsConfirmDialogOpen(true)}
                    style={{height: '40px', cursor: 'pointer', margin: '0 10px'}}
                />
                <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-edit-mode-pencil-tool-change-30495.png"
                    onClick={() => setIsEdit(true)}
                    style={{height: '40px', cursor: 'pointer'}}
                />
            </div>
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                title={"delete"}
                message={"delete article?"}
                onConfirm={function (): void {
                    onDeleteArticle(article.uuid)
                }}
                onCancel={function (): void {
                    setIsConfirmDialogOpen(false)
                }}
            />
        </div>
    );
};

export default Thumbnail;
