import React from "react";
import "./style.css"
import RightSideBar from  "../../Components/RightSideBar/RightSideBar";
import LeftSidebar from  "../../Components/LeftSidebar/LeftSidebar"
import TweetByHashtag from "../../Pages/TweetByHashtag/TweetByHashtag";






const LayoutForHashtags=()=>{
 
    return <div className={"root"}>
      
        <RightSideBar/>
         <hr orientation={"vertical"}  className={"divider_root"} ></hr>
        <div className={"content"}>
          <TweetByHashtag/>
        </div>

        <hr orientation={"vertical"}  className={"divider_root"} ></hr>
        <LeftSidebar/>
    </div>
}
export default  LayoutForHashtags;