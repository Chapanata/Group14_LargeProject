import React, { Component } from 'react';
import axios from 'axios';
import logo from './../../Resources/logo.png';
import { Link } from "react-router-dom";

const passRegex = RegExp(/^(?=.*\d)(?=.*[!?<>@#$%^&*])(?=.*[a-zA-Z]).{8,}$/);

var pass="";
var confirm="";
var pageURL = window.location.href;

var heroku = 'https://nutrition-heroku.herokuapp.com/resetPassword';

var keyValue = pageURL.substring(60);

var finalURL = heroku.concat(keyValue);

function comparePass(value1, value2) {

if(pass === confirm) {
  return true;
}
else {
  return false;
}
}
const formValid = ({ errors, ...rest }) => {
let valid = true;
Object.values(errors).forEach(val => {
  val.length > 0 && (valid = false);
});
Object.values(rest).forEach(val => {
  val === null && (valid = false)
});
return valid;
};
class resetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      confirmPassword: null,
      errors: {
        password:"",
        confirmPassword:"",
      }
    }
  }
  state = {
    apiError: '',
    apiSuccess: '',
    successMessage: ''
  }


  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log(`
        -- Submitting --
        Password: ${this.state.password}
      `);
      // http://localhost:8080/resetPassword
      // https://nutrition-heroku.herokuapp.com/resetPassword
      axios.post(finalURL,
      { password: this.state.password })
      .then(response => {
          console.log(response.data)
          console.log(response.data.Success)
          console.log(response.data.Error)
          this.setState({
              apiError: response.data.Error,
              apiSuccess: response.data.Success
          })
      })
      .catch(error =>{
          console.log(error.response)
      })
      window.location("/login")
    }

    else {
      console.error('FORM INVALID');
    }
  }

  handleChange = e => {

    e.preventDefault();
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case 'password':
        pass = value;
        if (passRegex.test(value) != true) {
          errors.password = "Minimum 6 characters required with at least 1 number, 1 letter, and 1 special character";
        }

        else {
          errors.password ="";
        }

      break;
      case 'confirmPassword':
        confirm = value;
        if (confirm !== pass){
          errors.confirmPassword = "Passwords do not match";
        }
        else {
          errors.confirmPassword = "";
        }
      break;
      default:
          break;
      }
      this.setState({errors, [name]: value}, () => console.log(this.state));
      console.log(keyValue)
      console.log(finalURL)
    };



    render() {
      const { errors } = this.state;


      return (
        <div className="root-container">
            <div className="box-container">
              <img src={logo} className="modal_logo" alt="logo"/>

              <div className="title">
                Reset Password
              </div>
              <form onSubmit={this.handleSubmit} noValidate>
              <div className="box">

                <div className="input-group">
                  <label className="login-label">Enter Password</label>
                  <input
                    type="password"
                    name="password"
                    className={ errors.password.length > 0 ? "error" : null}
                    placeholder="Password"
                    onChange={this.handleChange}
                    />
                    {errors.password.length > 0 && (
                    <span className="error">{errors.password}</span>
                    )}
                </div>

                <div className="input-group">
                  <label className="login-label">Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={ errors.confirmPassword.length > 0 ? "error" : null}
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    />
                    {errors.confirmPassword.length > 0 && (
                    <span className="error">{errors.confirmPassword}</span>
                    )}
                </div>

                {this.state.successMessage && (
                    <span className="error">{this.state.successMessage}<br></br><br></br></span>
                )}

                <button type="submit" className="register-button">Reset Password</button>

              </div>
              </form>
            </div>

        </div>
      );
    }
}


export default resetPassword;
