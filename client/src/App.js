//imports
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Places from './pages/Places';
import Test from './pages/test'
import BucketList from './pages/BucketList'





import "./App.css";


class App extends Component { 

  render() {
    return (
      <Router>
      <div>
        {/* <NavTabs /> */}

        <Route exact path="/" component={Login} />
       
        <Route exact path="/places" component={Places} />
        <Route exact path="/bucketlist" component={BucketList} />

        <Route exact path='/test'component={Test} />
      </div>
      </Router>
    );
  }
}

export default App;