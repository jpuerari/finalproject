//imports
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./pages/Login";
import Places from './pages/Places';
import BucketList from './pages/BucketList'
import Navbar from './components/Navbar';

import Login from "./pages/Login"
import Home from "./pages/Home"

import "./App.css";


class App extends Component {




  

  render() {
    return (
      <Router>
      <div>
        {/* <NavTabs /> */}
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Login} />
        <Navbar />
        <Route exact path="/Places" component={Places} />
        <Route exact path="/BucketList" component={BucketList} />
      </div>
      </Router>
    );
  }
}

export default App;