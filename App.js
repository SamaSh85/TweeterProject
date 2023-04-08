import React from "react";
import Layout from "./Components/Layout/Layout";
import { createBrowserRouter,RouterProvider,createRoutesFromElements, Router, Link} from "react-router-dom";
//import RedirectFunction from "@remix-run/router";
import { Route} from "react-router-dom";
import { redirect  } from "react-router-dom";

import Home from "./Pages/Home/Home"
import Page404 from "./Pages/404/404"
import TweetByUser from "./Pages/TweetByUser/TweetByUser";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {TweetProvider} from "./context/TweetContext";
import TweetByHashtag from "./Pages/TweetByHashtag/TweetByHashtag";
import AuthPage from "./Pages/Auth/AuthPage";
import LayoutForHashtags from "./Pages/TweetByHashtag/LayputForHashtags";
import LayoutForTweetByUser from "./Pages/TweetByUser/LayoutForTweetByUser";

const App=()=>{
 const TweeterRouter=createBrowserRouter(
  createRoutesFromElements(
    
      <Route path="/login" element={<AuthPage/>} >
        <Route path="/" element={<Layout/>} />
         <Route path="/hashtags/:hashtag" element={<LayoutForHashtags/>} />
      <Route path = "/users/:user" element={<LayoutForTweetByUser/>} />
     
      </Route>
      
  
  ));

  return  <>
          <TweetProvider>      
          
          </TweetProvider>
          <ToastContainer/>
   
     </>
 
}

const isLogin =  !!localStorage.getItem("x-auth-token");
const PrivateRoute = ({render, ...props}) => {
  return <Route {...props} render={(props) => {
    if (isLogin())
      return render(props);
    else return <Link to={"/login"}/>
  }}/>
}

 
 


export default App;

