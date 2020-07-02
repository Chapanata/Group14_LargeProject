import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";

class App extends Component {
  render() {
    return(
      < BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/Login" exact component={Login} />
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;

