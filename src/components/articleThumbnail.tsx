import React from "react";

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
    const divStyles: React.CSSProperties = {
        display: "flex",
        marginTop: "20px",
    };

    return (
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
    );
};

export default Thumbnail;
