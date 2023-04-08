import React from "react";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";
import "./style.css"

import TweetByUser from "./TweetByUser";
import { useMediaQuery } from "@mui/material";
import DrawerComponent from "../../Drower";



const LayoutForTweetByUser=()=>{
  const isTabletSize=useMediaQuery('(max-width:600px)');
    return <div className={"root"}>
      {
        isTabletSize ? <DrawerComponent/>:<RightSideBar/>
      }
        
         <hr orientation={"vertical"}  className={"divider_root"} ></hr>
        <div className={"content"}>
          <TweetByUser/>
        </div>

        <hr orientation={"vertical"}  className={"divider_root"} ></hr>
        <LeftSidebar/>
    </div>
}
export default  LayoutForTweetByUser;