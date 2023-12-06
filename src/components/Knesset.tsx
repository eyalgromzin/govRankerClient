import React from 'react';
import '../components/KnessetChairs.css'

const CircularMembersBoxes = () => {
    return (
        <div className="circular-boxes">
            <div className="box">
                <img src="path_to_image" alt="Image" />
                <p>Text</p>
            </div>
            {/* Repeat this structure for each box */}
        </div>
    );
};

export default CircularMembersBoxes;