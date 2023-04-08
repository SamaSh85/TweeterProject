import React from 'react';
import  "../style.css"
import {Grid, IconButton, Typography} from "@mui/material";
import {likeTweet, setTweetText, useTweetDispatch,setTweetList} from "../../../context/TweetContext";
import { getAllTweets } from '../../../api/api_tweet';
import {toast} from "react-toastify";


const Tweet=({data})=>{
    const tweetDispatch = useTweetDispatch();
    const renderTweet = (text) => {
        return {__html: text.replace(/#\S+/g, "<a href='/tags/$&' style='color:cornflowerblue'>$&</a>")};
    };

    const retweetClick = () => {
        setTweetText(tweetDispatch, data.text);
        console.log(data.id);
    }
    
     
    return  (
        <div className={"tweetItem"}>
            <Grid container>
                <img src={data.sender.img} style={{height: 60, width: 60, borderRadius: '50%'}}/>
                <Grid item container direction={"column"} style={{flex: 1, marginRight: '1rem'}}>
                    <Grid item container direction={"column"}>
                        <Typography className={"tweetItemName"}>{data.sender.name}</Typography>
                        <Typography className={"tweetItemId"}>{data.sender.id}</Typography>
                    </Grid>
                    <Typography dangerouslySetInnerHTML={renderTweet(data.text)}  className={"tweetText"} >

                    </Typography>

                </Grid>
            </Grid>
            <Grid container direction={"row-reverse"} style={{marginTop: 16}} alignItems={'center'}>
                <IconButton className="newTweetImgBtn" onClick={retweetClick}>
                    <img src={"/images/retweet.png"} className={"newTweetImg"}/>
                </IconButton>
                <IconButton className="newTweetImgBtn" >
                 <img src={"/Images/hert.png"} className={"newTweetImg"} />
                </IconButton>
                <Typography className={"likeCount"}>{data.likes}</Typography>
            </Grid>
        </div>
            )};
export default Tweet;

