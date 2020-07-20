import React, { Component } from 'react';

import logo from './../../Resources/logo.png';
import { Link } from "react-router-dom";

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { isLoginOpen: true, isRegisterOpen: false };
    }

    submitLogin(e) {
  
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
            <div className="box-container">
      
              <img src={logo} className="modal_logo" alt="logo"/>

              <div className="title">
                    Login  
              </div>
              <div className="box">
                

                <div className="input-group">
                  <label className="some-label">E-Mail Address:</label>
                  <input type="email" name="e-mail" className="login-input" placeholder="E-Mail Address"/>
                </div>

                <div className="input-group">
                  <label className="some-label">Password:</label>
                  <input type="password" name="password" className="register-input" placeholder="Password"/>
                </div>

                <button type="button" className="some-button" onClick={this.submitLogin.bind(this)}>LOGIN</button>
              

                <div className="backToLog"><Link to="/register">Don't have an Account?</Link></div>
                <div className="forgot"><a href="#">Forgot your Password?</a></div>
                <div className="backToLog"><Link to="/home">Go back home?</Link></div>

              </div>      
            </div>
          </div>

      );
    }
}
  

export default Login;
