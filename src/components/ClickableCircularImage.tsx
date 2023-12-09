import React, {useState} from 'react';
import  '../components/ClickableCircli.css'
// @ts-ignore
const ClickableCircularImage = ({ imageUrl,onClick, text }) => {


    const handleImageClick=()=>{

   }
    return (
        <div className="clickable-circular-image" onFocus={handleImageClick}>
            <img src={imageUrl} />
            <p>{text}</p>
        </div>
    );
};

export default ClickableCircularImage;
