import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from "./Pages/Dashboard/Home";
import Login from "./Pages/Login/Login";
import Forgot from "./Pages/Login/Forgot";
import Register from "./Pages/Login/Register";
import resetPassword from "./Pages/Login/resetPassword";
import About from "./Pages/Dashboard/About";
import Contact from "./Pages/Dashboard/Contact";
import Settings from "./Pages/User-Pages/Settings";
import Daily from "./Pages/User-Pages/Daily";
//import Overview from "./Pages/User-Pages/Overview";
import Dictionary from "./Pages/User-Pages/Food-Dictionary";

class App extends Component {
  render() {
    return(
      < BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/Home" exact component={Home} />
          <Route path="/Login" exact component={Login} />
          <Route path="/Forgot" exact component={Forgot} />
          <Route path="/Register" exact component={Register} />
          <Route path="/resetPassword" exact component={resetPassword} />
          <Route path="/About" exact component={About} />
          <Route path="/Contact" exact component={Contact} />
          <Route path="/Settings" exact component={Settings} />
          <Route path="/Daily" exact component={Daily} />
          <Route path="/Dictionary" exact component={Dictionary} />

        </div> 
      </BrowserRouter>
    );
  }
}

export default App;

