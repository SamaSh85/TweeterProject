import React, {useEffect, useState} from 'react'
import  "./style.css"
import Header from "../../Components/Header/Header";
import NewTweet from "./component/NewTweet";
import TweetList from "./component/TweetList";
import { useTranslation } from 'react-i18next';
import {toast} from "react-toastify";

import {getAllTweets} from "../../api/api_tweet";



const Home=()=>{
  const{t}=useTranslation();
    const[tweet,setTweet]=useState([]);
    const islogin=!!localStorage.getItem("x-auth-token");
    console.log(islogin);
    useEffect(() => {
        updateTweets();

    }, []);
    const updateTweets = () => {
        getAllTweets((isOk, data) => {
            if (!isOk)
                return toast.error(t("error.tweetFetch"));
           setTweet(data);
        })
    }
    return <div className={"Home"}>
        <Header title={t("home")} icon={<img src={"/Images/home.png"} style={{ padding:'7px'}}/>} />
        <hr className={"divider_home"}/>
        <NewTweet updateTweet={updateTweets}/>
      <TweetList  data={tweet}/>
    </div>
}
export default Home;