import React, {useState} from 'react';
import './KnessetChairs.css';
import ClickableCircularImage from "./ClickableCircularImage";




interface DisplayMembers {
    dataArray: MyObject[];
}
const KnessetComp:React.FC<DisplayMembers> =({dataArray})=>{

    const handleImageClick=()=> {

    }


    return    <div className="knesset-flex">
        {
            dataArray.map((box, index) => (
                <ClickableCircularImage  imageUrl={box.url}  onClick={handleImageClick}
                                         text1={box.name}



                />

        ))}
    </div>
};

export default KnessetComp;
