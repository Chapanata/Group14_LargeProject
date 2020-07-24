import React, { Component } from 'react';
import axios from 'axios';
import logo from './../../Resources/logo.png';
import { Link } from "react-router-dom";

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

        // http://localhost:8080/resetPassword/email/confirmCode
        // https://nutrition-heroku.herokuapp.com/resetPassword/email/confirmCode
        axios.post('https://nutrition-heroku.herokuapp.com/resetPassword', {
            password: this.state.password
        })
        .then(response => {
            console.log(response.data)
            console.log(response.data.Success)
            console.log(response.data.Error)
            this.setState({
                apiError: response.data.Error,
                apiSuccess: response.data.Success
            })
            if(response.data.Success === "true") {
                console.log("Successful Change")
                this.setState({
                    successMessage: "Password Successfully Changed!"
                })
            }
            else {
                console.log("Password Change request failed!")
            }
        })
        .catch(error =>{
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
