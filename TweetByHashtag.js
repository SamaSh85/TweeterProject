import React, {useEffect, useState} from "react";
import  "./style.css"
import Header from "../../Components/Header/Header";
import TweetList from "../Home/component/TweetList";
import {textFieldClasses} from "@mui/material";

import {useParams} from "react-router-dom";
import axios from "axios";
import {getAllTweets} from "../../api/api_tweet";
import {setTweetList, useTweetDispatch, useTweetState} from "../../context/TweetContext";




const TweetByHashtag=()=>{
   const {hashtag}=useParams();
   console.log(hashtag);
    const {tweetList} = useTweetState();
    const tweetDispatch = useTweetDispatch();
    useEffect(() => {
        getAllTweets((isok,data)=>{
            if(!isok)
                return alert(data.message());
            else setTweetList(tweetDispatch,data);
        })
    }, []);

    return <div className={"Home"}>
        <Header title={hashtag} icon={<img src={"/images/hashtag.png"}/>}/>
        <hr className={"divider_home"}/>
        <TweetList  data={tweetList}/>
    </div>
}
export default TweetByHashtag;


