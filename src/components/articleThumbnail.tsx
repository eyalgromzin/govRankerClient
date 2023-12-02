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
        backgroundColor: "lightsalmon",
        display: "flex",
        marginTop: "20px",
    };


    return (
        <div key={uuid} style={divStyles} className="thumbnail">
            <div>
                <img
                    src={imageUrl}
                    style={{ height: "200px", margin: "0 auto", width: '300px' }}
                    alt={title}
                />
            </div>
            <div className="thumbnail-details" style={{margin: '0 auto'}}>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>Date: {date}</p>
                <p>Rating: {rating}</p>
                <p>Creation Date: {creationDate}</p>
                <a href={url} target="_blank" rel="noopener noreferrer">
                    View Details
                </a>
            </div>
        </div>
    );
};

export default Thumbnail;
