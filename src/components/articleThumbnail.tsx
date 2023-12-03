import React, { useState } from "react";
import { deleteArticle } from "../apis/articleAPi";
import { useSelector, useDispatch } from "react-redux";
import ConfirmDialog from "./confirmDialog";

interface ThumbnailProps {
    uuid: string;
    title: string;
    url: string;
    date: string;
    description: string;
    imageUrl: string;
    rating: number;
    creationDate: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
    uuid,
    title,
    url,
    date,
    description,
    imageUrl,
    rating,
    creationDate,
}) => {
    const dispatch = useDispatch();

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState<boolean>(false)

    const divStyles: React.CSSProperties = {
        display: "flex",
        marginTop: "20px",
    };

    function onDeleteArticle(uuid: string): void {
        deleteArticle(dispatch, uuid);
        setIsConfirmDialogOpen(false)
    }

    return (
        <div>
            <a href={url} style={{ cursor: "pointer", margin: "0 auto" }}>
                <div key={uuid} style={divStyles} className="thumbnail">
                    <div>
                        <img
                            src={imageUrl}
                            style={{
                                height: "200px",
                                margin: "0 auto",
                                width: "300px",
                            }}
                            alt={title}
                        />
                    </div>
                    <div style={{ cursor: "pointer", margin: "0 15px" }}>
                        <div className="thumbnail-details">
                            <h2>{title}</h2>
                            <p>{description}</p>
                            <p>Date: {date}</p>
                            <p>Rating: {rating}</p>
                            <p>Creation Date: {creationDate}</p>
                        </div>
                    </div>
                </div>
            </a>
            <div style={{ display: "flex" }}>
                <img
                    src="https://cdn.iconscout.com/icon/free/png-256/free-delete-736-470378.png"
                    onClick={() => setIsConfirmDialogOpen(true)}
                    style={{height: '40px'}}
                />
            </div>
            <ConfirmDialog
                isOpen={isConfirmDialogOpen}
                title={"delete"}
                message={"delete article?"}
                onConfirm={function (): void {
                    onDeleteArticle(uuid)
                }}
                onCancel={function (): void {
                    setIsConfirmDialogOpen(false)
                }}
            />
        </div>
    );
};

export default Thumbnail;
