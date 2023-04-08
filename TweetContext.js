import React from "react";
import {getHashTags} from "../api/api_tweet";
import tweetList from "../Pages/Home/component/TweetList";

const TweetStateContext = React.createContext();
const TweetDispatchContext = React.createContext();

function tweetReducer(state, action) {
  switch (action.type) {
    case "SET_TWEET_TEXT":
      return {...state, tweetText: action.payload};
    case "SET_TWEET_LIST":
      return {...state, tweetList: action.payload};
    case "SET_HASHTAG_LIST":
      return {...state, hashTags: action.payload};
      case "SET_taggle":
       
      return {...state,toggleOpen: !state.toggleOpen}
      
    
      

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function TweetProvider({children}) {
  var [state, dispatch] = React.useReducer(tweetReducer, {
    tweetText: '',
    tweetList: [],
    hashTags: [],
    toggleOpen:false
  });
  return (
    <TweetStateContext.Provider value={state}>
      <TweetDispatchContext.Provider value={dispatch}>
        {children}
      </TweetDispatchContext.Provider>
    </TweetStateContext.Provider>
  );
}

function useTweetState() {
  var context = React.useContext(TweetStateContext);
  if (context === undefined) {
    throw new Error("useTweetState must be used within a TweetProvider");
  }
  return context;
}

function useTweetDispatch() {
  var context = React.useContext(TweetDispatchContext);
  if (context === undefined) {
    throw new Error("useTweetDispatch must be used within a TweetProvider");
  }
  return context;
}

export {TweetProvider, useTweetState, useTweetDispatch, setTweetText, setTweetList, setHashTagList,updateHashTagList,SetToggle};

// ###########################################################
function setTweetText(dispatch, tweetText) {
  dispatch({
    type: "SET_TWEET_TEXT",
    payload: tweetText
  });
}



function setTweetList(dispatch, list) {
  dispatch({
    type: "SET_TWEET_LIST",
    payload: list
  });
}

function setHashTagList(dispatch, list) {
  dispatch({
    type: "SET_HASHTAG_LIST",
    payload: list
  });
}

function updateHashTagList(dispatch) {
  getHashTags((isOk, data) => {
    if (isOk) {
      console.log(data);
      dispatch({
        type: "SET_HASHTAG_LIST",
        payload: data
      });
    }
  })
}

function SetToggle(dispatch) {
  dispatch({
    type: "SET_taggle"
    
  });
}


