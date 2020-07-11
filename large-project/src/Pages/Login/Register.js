import React, { Component } from 'react';
import './Register.css';
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
          confirmPassword:""
        }
      };
    }

    handleSubmit = e => {
      e.preventDefault();

      if (formValid(this.state)) {
        console.log(`
          -- Submitting --
          Full Name: ${this.state.fullName}
          Email: ${this.state.email}
          Password: ${this.state.password}
          Confirm Password: ${this.state.confirmPassword}
        `);
      } else {
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
          // if (x = 1) {
          //   if ()
          // }
          // // pass = value;
          // errors.password = pass;
          // if (comparePass != true) {
          //   errors.password = "Wrong";
          // }
        break;

        case 'confirmPassword':
          confirm = value;
          if (passRegex.test(value) != true) {
            errors.confirmPassword = "Minimum 6 characters required with at least 1 letter and 1 special character";
          }
          else if (!pass.match(confirm)){
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
          <div className="inner-container">
            <div className="box-container">
              <img src={logo} className="Logo" alt="logo"/> 

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

                <button type="submit" className="register-button">REGISTER</button>
              
                <div className="backToLog">Already have an Account? <Link to="/login">Click Here</Link></div>
                <div className="backToLog">Go back home?<Link to="/home"> Home</Link></div>

              </div>
              </form>
            </div>
          </div>  
        </div>
      );
    }
}
  

export default Register;
