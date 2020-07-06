import React, { Component } from 'react';
import './Login.css';
import logo from './../../Resources/logo.png';
import { Link } from "react-router-dom";

class Register extends Component {
    constructor(props) {
      super(props);
      this.state = { email:"", password:"", errors: []};
    }

    showValidationErr(elm, msg) {
      this.setState((prevState) => ( { errors: [...prevState.errors, { elm, msg}] } ));
    }


    clearValidationErr(elm) {
      this.setState((prevState) => {
        let newArr = [];
        for(let err of prevState.errors) {
          if(elm != err.elm) {
            newArr.push(err);
          }
        }
        return {errors: newArr};
      });
    }


    onEmailChange(e) {
      this.setState({ email: e.target.value });
      this.clearValidationErr("email");
    }

    onPasswordChange(e) {
      this.setState({ password: e.target.value});
      this.clearValidationErr("password");
    }

    submitRegister(e) {
     
      if(this.state.email == "") {
         this.showValidationErr("email", "E-Mail cannot be empty!");
      } 
      
      else if(this.state.email.includes("@") != 1 ) {
        this.showValidationErr("email", "Invalid E-Mail");
      }
      
      if (this.state.password == ""){
         this.showValidationErr("password", "Password cannot be empty!");
      }

      else if (this.state.password.match("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$") != 1) {
        this.showValidationErr("password", "Password does not meet requirements");
      }

    }
  
    render() {

      let emailErr = null, passwordErr = null;

      for(let err of this.state.errors) {
        if(err.elm == "email") {
          emailErr = err.msg;
        } if (err.elm == "password") {
          passwordErr = err.msg;
        }
      }

      return (
        <div className="root-container">
          <div className="inner-container">
            <div className="box-container">
              <img src={logo} className="Logo" /> 

              <div className="title">
                Register  
              </div>

              <div className="box">

                <div className="input-group">
                  <label className="login-label">Enter your Full Name:</label>
                  <input type="text" name="name" className="login-input" placeholder="Full Name"/>
                </div>

                <div className="input-group">
                  <label className="login-label">Enter an E-Mail Address:</label>
                  <input 
                    type="email" 
                    name="e-mail" 
                    className="login-input" 
                    placeholder="E-Mail Address" 
                    onChange={this.onEmailChange.bind(this)} 
                  />
                  <small className="error">{ emailErr ? emailErr : ""}</small>
                </div>

                <div className="input-group">
                  <label className="login-label">Enter Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    className="register-input" 
                    placeholder="Password" 
                    onChange={this.onPasswordChange.bind(this)}
                  />
                  <small className="error">{ passwordErr ? passwordErr : ""}</small>
                </div>

                <div className="input-group">
                  <label className="login-label">Confirm Password:</label>
                  <input 
                    type="password" 
                    name="password" 
                    className="register-input" 
                    placeholder="Confirm Password" 
                    onChange={this.onPasswordChange.bind(this)}
                  />
                  <small className="error">{ passwordErr ? passwordErr : ""}</small>
                </div>

                <button type="button" className="register-button" onClick={this.submitRegister.bind(this)}>REGISTER</button>
              
                <div className="backToLog">Already have an Account? <Link to="/login">Click Here</Link></div>
              </div>
            </div>
          </div>  
        </div>
      );
    }
}
  

export default Register;