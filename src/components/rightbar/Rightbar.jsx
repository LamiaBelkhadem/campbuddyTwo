import "./rightbar.css";
import { getImageURL } from "../../../utils/getImageURL.js";

export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <img className="rightbar-img"  src={
                
                    
               getImageURL(`campersList.png`)
                } alt="" />
        
      </div>
    </div>
  );
}
