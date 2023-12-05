import React from 'react';
import './KnessetChairs.css';

const KnessetComp = (props: { data: any; }) => {

    const receivedData = props.data;
    const numRows = 10;
    const numCols = 12;

    const chairs = [];
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            chairs.push(
                <div className="chair" key={`${row}-${col}`}>

                    {/* תוכן הכיסא */}
                </div>
            );
        }
    }

    return <div className="knesset">{chairs}</div>;
};

export default KnessetComp;
