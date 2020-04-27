//imports
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login"
import "./App.css";

class App extends Component {




  

  render() {
    return (
      <Router>
      <div>
        {/* <NavTabs /> */}
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" component={Login} />
      </div>
      </Router>
    );
  }
}
export default App;