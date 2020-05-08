//imports
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Places from './pages/Places';
import Test from './pages/test'
import BucketList from './pages/BucketList'
import AuthService from './utils/auth';
import * as API from './utils/API';

import UserInfoContext from './utils/UserInfoContext';

import "./App.css";


function App(){ 
  const [userInfo, setUserInfo] = useState({
    savedCountries: [],
    username: 'person2',
    name: '',
    countryCount: 0,
    getUserData: () => {
      // if user's logged in get the token or return null
      const token = AuthService.loggedIn() ? AuthService.getToken() : null;

      if (!token) {
        return false;
      }
      API.getMe(token)
        // .then(({ data: { username, name, savedPlaces} }) =>{
        .then(({ data: { username} }) =>{
          console.log("inside getMe in app", username)
          // setUserInfo({ ...userInfo, username, name, savedPlaces})
          setUserInfo({ ...userInfo, username })
        }
        )
        .catch((err) => console.log(err));
    },
  })

  useEffect(() => {
    userInfo.getUserData();
  },[]);

  return (
    <Router>
    <div>
      {/* <NavTabs /> */}
      <UserInfoContext.Provider value={userInfo}>
        <Route exact path="/" component={Login} />
        
        <Route exact path="/places" component={Places} />
        <Route exact path="/bucketlist" component={BucketList} />

        <Route exact path='/test'component={Test} />
      </UserInfoContext.Provider>
    </div>
    </Router>
  );
}

export default App;