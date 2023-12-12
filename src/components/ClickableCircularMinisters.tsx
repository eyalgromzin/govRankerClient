import React, { useState } from 'react';
import '../components/ClickableCircliMinisters.css'; // Import the CSS file


// @ts-ignore
const ClickableCircularMinisters = ({ text, imageSrc,onClick }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <button className={`flippable-button ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div className="front">
                <img src={imageSrc} alt="Icon" />
            </div>
            <div className="back">
                <span>{text}</span>
            </div>
        </button>
    );
};

export default ClickableCircularMinisters;
