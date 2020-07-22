import React, { Component } from 'react';
import axios from 'axios';
import logo from './../../Resources/logo.png';
import { Link } from "react-router-dom";

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
const passRegex = RegExp(/^(?=.*\d)(?=.*[!?<>@#$%^&*])(?=.*[a-zA-Z]).{8,}$/);

var pass="";
var confirm="";


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

class Register extends Component {

    constructor(props) {
      super(props);
      this.state = {
        fullName: null, 
        email: null, 
        password: null, 
        confirmPassword: null, 
        errors: {
          fullName:"",
          email:"", 
          password:"", 
          confirmPassword:"",
        }
      }
    }

    state = {
  
      apiError: '',
      anyErrors: ''
    }

    handleSubmit = e => {
      e.preventDefault();

      if (formValid(this.state)) {
        console.log(`
          -- Submitting --
          Full Name: ${this.state.fullName}
          Email: ${this.state.email}
          
        `);


        axios.post("https://nutrition-heroku.herokuapp.com/register", {
            name: this.state.fullName,
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
          console.log(response.data)
          console.log(response.data.Success)
          console.log(response.data.Error)
          this.setState({
            apiError: response.data.Error
          })
          if(response.data.Success === "true") {
            window.location = "/login"
          }
          else {
            this.setState({
              anyErrors: "One or more fields are invalid!"
            })
          }
        })

        .catch(error => {
          console.log(error.response)
        })
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
    
        case 'fullName':
          errors.fullName = value.length < 1 
          ? "Cannot be empty"
          : "";
        break;

        case 'email':
          errors.email = emailRegex.test(value)  
          ? ""
          : "Invalid E-mail Address";
        break;

        case 'password':
          pass = value;
          if (passRegex.test(value) != true) {
            errors.password = "Minimum 6 characters required with at least 1 letter and 1 special character";
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
    };

    
  
    render() {
      const { errors } = this.state;
     

      return (
        <div className="root-container">
            <div className="box-container">
              <img src={logo} className="modal_logo" alt="logo"/>

              <div className="title">
                Register  
              </div>
              <form onSubmit={this.handleSubmit} noValidate>
              <div className="box">

                <div className="input-group">
                  <label className="login-label">Enter your Full Name:</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    className={ errors.fullName.length > 0 ? "error" : null} 
                    placeholder="Full Name"
                    onChange={this.handleChange} 
                  />
                  {errors.fullName.length > 0 && (
                    <span className="error">{errors.fullName}</span>
                  )}
                </div>

                <div className="input-group">
                  <label className="login-label">Enter an E-Mail Address:</label>
                  <input 
                    type="email" 
                    name="email"
                    noValidate 
                    className={ errors.email.length > 0 ? "error" : null}  
                    placeholder="E-Mail Address" 
                    onChange={this.handleChange} 
                  />
                    {errors.email.length > 0 && (
                    <span className="error">{errors.email}</span>
                    )}

                    {this.state.apiError && (
                      <span className="error">{this.state.apiError}</span>
                    )}                  
                </div>

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
                
                {this.state.anyErrors && (
                    <span className="error">{this.state.anyErrors}<br></br><br></br></span>
                )} 

                <button type="submit" className="register-button">REGISTER</button>
              
                <div className="backToLog"><Link to="/login">Already have an Account?</Link></div>
                <div className="backToLog"><Link to="/home">Go back home?</Link></div>

              </div>
              </form>
            </div>

        </div>
      );
    }
}
  

export default Register;
