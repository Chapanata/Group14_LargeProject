import React, { Component } from 'react';
import axios from 'axios';
import logo from './../../Resources/logo.png';
import { Link } from "react-router-dom";

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

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

class Forgot extends Component {
    constructor(props) {
      super(props);
      this.state = {
          email: null,
          errors: {
            email: ""
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
          Email: ${this.state.email}

        `);

        // http://localhost:8080/forgotPassword
        // https://nutrition-heroku.herokuapp.com/forgotPassword
        axios.post('https://nutrition-heroku.herokuapp.com/forgotPassword', {
            email: this.state.email
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
                console.log("Successful Request")
                this.setState({
                    successMessage: "E-Mail with Reset Link Successfully Sent!"
                })
            }
            else {
                console.log("Failed Request")
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

        case 'email':
          errors.email = emailRegex.test(value)
          ? ""
          : "Invalid E-mail Address";
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
                    Forgot Password
              </div>

              {/* <h1>The request returned is - {this.state.resData}</h1> */}
              <div className="box">
              <p>Forgot your Password? Enter your e-mail so we can help reset your password!</p>
              <form onSubmit={this.handleSubmit} noValidate>
                <div className="input-group">
                  <label className="some-label">E-Mail Address:</label>
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


                {this.state.apiError && (
                      <span className="error">{this.state.apiError}<br></br><br></br></span>
                    )}

                {this.state.apiSuccess && (
                      <span className="success">{this.state.successMessage}<br></br><br></br></span>
                )}

                <button type="submit" className="some-button" >SUBMIT</button>


                <div className="backToLog"><Link to="/login">Already have an Account?</Link></div>
                <div className="backToLog"><Link to="/register">Don't have an Account?</Link></div>
                <div className="backToLog"><Link to="/home">Go back home?</Link></div>
                </form>
              </div>
            </div>
          </div>

      );
    }
}


export default Forgot;
