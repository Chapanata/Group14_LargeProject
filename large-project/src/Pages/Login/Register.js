import React, { Component } from 'react';
import './Login.css';
import logo from './../../Resources/logo.png';
//import { Link } from "react-router-dom";

class Register extends Component {
    constructor(props) {
      super(props);
      this.state = { isRegisterOpen: true, isLoginOpen: false };
    }

    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false});
    }
  
    showRegisterBox() {
      this.setState({isRegisterOpen: true, isLoginOpen: false});
    }
  
    render() {
      return (
        <div className="root-container">
            <div className="box-slider">
  
            <div className="slider" onClick={this.showLoginBox.bind(this)}>
              Login
            </div>
            
            <div className="slider" onClick={this.showRegisterBox.bind(this)}>
              Register
            </div>
  
        {/*         
            <button type="button" className="slider" onClick={this.showLoginBox.bind(this)}>Login</button>
            <button type="button" className="slider" onClick={this.showRegisterBox.bind(this)}>Register</button>
             */}
          </div>
  
          <div className="box-container">
  
            {this.state.isRegisterOpen && <RegisterBox />}
  
          </div>
        </div>
      );
    }
}
  
  class RegisterBox extends Component {
  
    constructor(props) {
      super(props);
      this.state = {  };
  
    }
  
    submitRegister(e) {
  
    }
  
    render() {
      return(
      <div className="inner-container">
  
        <img src={logo} className="Logo" /> 
  
        <div className="title">
          Register  
        </div>
        <div className="box">
  
          <div className="input-group">
            <label className="login-label">Enter an E-Mail Address:</label>
            <input type="email" name="e-mail" className="login-input" placeholder="E-Mail Address"/>
          </div>
  
          <div className="input-group">
            <label className="login-label">Enter Password</label>
            <input type="password" name="password" className="register-input" placeholder="Password"/>
          </div>
  
          <div className="input-group">
            <label className="login-label">Confirm Password:</label>
            <input type="password" name="password" className="register-input" placeholder="Confirm Password"/>
          </div>
  
          <button type="button" className="register-button" onClick={this.submitRegister.bind(this)}>REGISTER</button>
        
          <div className="backToLog">Already have an Account? <a href="#">Click Here</a></div>
        </div>
      </div>
      );
    }
  
  }

export default Register;