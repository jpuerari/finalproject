//imports
import React, { Component } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login"
import "./App.css";

class App extends Component {




  

  render() {
    return (
      <div>
        <Login />
      </div>
      // <Router>
      // <div>
      //   <NavTabs />
      //   <Route exact path="/" component={Home} />
      //   <Route exact path="/about" component={About} />
      //   <Route exact path="/blog" component={Blog} />
      //   <Route path="/contact" component={Contact} />
      // </div>
      // </Router>
    );
  }
}
export default App;