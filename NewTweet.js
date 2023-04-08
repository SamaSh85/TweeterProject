import React, {useState} from "react";
import  "../style.css";
import {Button, Grid, IconButton} from "@mui/material";
import classnames from "classnames";
import axios from "axios";
import {newHashtagRequest, NewTweetReguest} from "../../../api/api_tweet";
import {setTweetText, updateHashTagList, useTweetDispatch, useTweetState} from "../../../context/TweetContext";
import {display} from "@mui/system";
import { useTranslation } from 'react-i18next';
import {toast} from "react-toastify";


const NewTweet=({updateTweet})=>{
    const {tweetText: tweet} = useTweetState();
    const tweetDispatch = useTweetDispatch();
    const [imageFile, setImageFile] = React.useState();
    const [imagePath, setImagePath] = React.useState();
    const[allHashtag,setallHashtag]=React.useState([]);
    const inputfile=React.useRef();
    const{t}=useTranslation();
  

/*const[tweet,setTweet]=useState("");*/
    const selectImg=()=>{
        inputfile.current.click();
    }
    const onChangeImg=(e)=>{
        if(e.target.files && e.target.files.length>0)
        {
            var picture = e.target.files[0];
            var src     = URL.createObjectURL(picture);
            setImageFile(picture);
            const reader=new FileReader();
            reader.onload=(e)=>{
                setImagePath(src);
            }
            reader.readAsDataURL(e.target.files[0])
        }

    }
   
    const setImage=()=>{
        if(imagePath) 
            return imagePath;
            if (localStorage.getItem("image") && localStorage.getItem("image") !== 'undefined')
          return localStorage.getItem("image");
        else
        return "/Images/user-profiles.png";
    }
   
const newTweetClick=()=>{
 const tweetText=tweet;
  if(!tweetText)
     return

    const data= {
        id: Math.floor(Math.random()*1000),
        "sender": {
            "name": localStorage.getItem("name"),
            "id": localStorage.getItem("Id"),
            "img": setImage()?setImage():"",
        },
        "text": tweetText,
        "likes": 0
    }
    NewTweetReguest(data,(isok,data1)=> {
        if (!isok)
            return toast.error(data1)
        else

            toast.success(t("success.newTweet"))
        updateTweet();
        setTweetText(tweetDispatch, "");
       
        if (tweetText.includes("#"))
             updateHashTagList(tweetDispatch);
            })

}

    return <div className={"newTweet"}>
        <Grid container>
            <img src={setImage()} style={{width:'30px'}}/>
            <input placeholder={t("label.doTweet")} className={classnames("input","editable")}
           value={tweet} onChange={e=>setTweetText(tweetDispatch, e.target.value)} />
            <input type={"file"} style={{display:'none'}} ref={inputfile} onChange={onChangeImg}/>
        </Grid>
        {
            imagePath &&
           <div>
               <div style={{backgroundImage:`url(${imagePath})`}} className={"tweetImg"}/>
            </div>

        }
        <Grid container direction={"row-reverse"} style={{marginTop:'16'}} >
            <Button  variant={"contained"} color={"primary"} onClick={newTweetClick}
            className={"newTweetImgBtn"}>{t("btn.tweet")}</Button>

            <IconButton  className={"newTweetImg"} onClick={selectImg}>
                <img src={"Images/btnpicc.png"}/>
            </IconButton>

        </Grid>

    </div>
}
export default NewTweet;