
import '../components/ClickableCircli.css'
// @ts-ignore
const ClickableCircularImage = ({ imageUrl,onClick, text1}) => {


    const handleImageFocus=()=>{

   }
   const handleImageClick=()=>{

   }
    return (
        <div className="clickable-circular-image" onFocus={handleImageFocus}
             onClick={handleImageClick}>
            <img src={imageUrl}/>
            <p>{text1}</p>
        </div>
    );
};

export default ClickableCircularImage;
