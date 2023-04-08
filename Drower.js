import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import RightSideBar from "./Components/RightSideBar/RightSideBar";
import { SetToggle } from "./context/TweetContext";
import { useTweetDispatch,useTweetState } from "./context/TweetContext";

export default function DrawerComponent() {
    const {toggleOpen} = useTweetState();
    const tweetDispatch = useTweetDispatch();
	

	return (
		<>
			
			<Drawer anchor={"left"} open={toggleOpen}
				onClose={()=>{SetToggle(tweetDispatch)}}>
				<MenuItem><RightSideBar/></MenuItem>
				
			</Drawer>
		</>
	);
}
