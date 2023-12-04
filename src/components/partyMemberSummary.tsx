import React from "react";

interface ImageTextProps {
    imageUrl: string | undefined;
    description: string | undefined;
    name: string | undefined;
}

const Summary: React.FC<ImageTextProps> = ({ imageUrl, description, name }) => {
    return (
        <div style={{ display: "flex" }}>
            <div style={{marginLeft: '20px'}}>
                <img
                    src={imageUrl}
                    style={{
                        maxWidth: "100%",
                        height: "300px",
                        width: "300px",
                    }}
                />
            </div>
            <div >
                <p>{name}</p>
                <div>{description}</div>
            </div>
        </div>
    );
};

export default Summary;
