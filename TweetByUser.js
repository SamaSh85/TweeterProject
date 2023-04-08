import "./style.css"
import Header from "../../Components/Header/Header";
import TweetList from "../Home/component/TweetList";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {getAllTweets} from "../../api/api_tweet";




const TweetByUser=()=>{
    const {user}=useParams();

    const [tweets,setTweets]=useState([]);
    useEffect(() => {
        getAllTweets((isok,data)=>{
            if(!isok)
                return alert(data.message());
            else setTweets(data);
        })
    }, []);
    return <div className={"Home"}>
        <Header title={user} icon={<img src={"/Images/1.png"} />}/>
        <hr className={"divider_home"}/>
        <TweetList  data={tweets}/>
    </div>
}
export default TweetByUser;