import React,{Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Layout from "./Components/Layout/Layout";
import {createBrowserRouter, Route, RouterProvider,Router,createRoutesFromElements, Routes,BrowserRouter} from "react-router-dom";
import {TweetProvider} from "./context/TweetContext";
import Page404 from "./Pages/404/404";
import LayoutForHashtags from './Pages/TweetByHashtag/LayputForHashtags';
import LayoutForTweetByUser from './Pages/TweetByUser/LayoutForTweetByUser';
import {ToastContainer} from 'react-toastify';
import './i18n.js'
import AuthPage from './Pages/Auth/AuthPage';
import { Navigate,Outlet,redirect } from 'react-router-dom';

const TweeterRouter= createBrowserRouter([
  {
    path:"/login",
    element:!!localStorage.getItem("x-auth-token")?<Layout/>:<AuthPage/>,
    errorElement:<Page404/> ,
    
  },
  {
    path:"/",
    element:!!localStorage.getItem("x-auth-token")?<Layout/>:<AuthPage/>,
    errorElement:<Page404/>,
  },
  {
    path:'/hashtags/:hashtag' ,
    element:!!localStorage.getItem("x-auth-token")?<LayoutForHashtags/>:<AuthPage/>,
    errorElement:<Page404/>,
  },
  {
    path:'users/:id',
    element:!!localStorage.getItem("x-auth-token")?<LayoutForTweetByUser/>:<AuthPage/>,
    errorElement:<Page404/>,

  }
   
])
   
const isLogin =  !!localStorage.getItem("x-auth-token"); 

 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback={<div></div>}>
        <TweetProvider>
        <React.StrictMode>
        <RouterProvider router={TweeterRouter} />
        </React.StrictMode>
        </TweetProvider>
        <ToastContainer/>
    </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

