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

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          email: null,
          password: null,
          errors: {
            email: "",
            password: ""
          }
       }
    }

    state = {
  
      apiError: '',
      anyErrors: '',
      isAuthenticated: false,
      resData: ''
    }

    
    // componentDidMount() {

    //   const payload = {
    //     email: "krischoudhury@hotmail.com",
    //     password: "poopeater@69"
    //   }
    //   fetch('https://nutrition-heroku.herokuapp.com/login', {
    //       method: 'POST',
    //       headers: {
    //         'Accept': '*/*',
    //         'Content-type':'application/json'
    //       },
    //       body: JSON.stringify(payload)
    //   })
    //   .then(response => response.json())
    //   .then((data)=>{
    //     this.setState({
    //       isAuthenticated: true,
    //       resData: data.SessionToken
    //     });
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.setState({
    //       isAuthenticated: false,
    //       resData: "Non Data from server"
    //     })
    //   }
    //   );
    // }

    handleSubmit = e => {
      e.preventDefault();

      if (formValid(this.state)) {
        console.log(`
          -- Submitting --
          Email: ${this.state.email}
          Pass: ${this.state.password}
        `);

        // http://localhost:8080/login
        // https://nutrition-heroku.herokuapp.com/login 
        axios.post('https://nutrition-heroku.herokuapp.com/login', {
          email: this.state.email,
          password: this.state.password
        })
        .then(response => {
          console.log(response.data)
          console.log("UserID: " + response.data.UserID)
          console.log("SessionToken:" + response.data.SessionToken)
          console.log("Name: " + response.data.Name)
          this.setState({
            apiError: response.data.Error
          })
          if(response.data.UserID != undefined && response.data.SessionToken != undefined && response.data.Name  != undefined) 
          {
            console.log("YES IT WORKED")
            window.location = "../Daily"

            window.localStorage.setItem('session-token', response.data.SessionToken);

          }
          else {
            console.log("IT NO WORK TRY AGAIN")
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

        case 'password':
          if (value.length < 1) {
            errors.password = "Password Field cannot be empty!";
          }
          
          else {
            errors.password ="";
          }
      
        break;


        default:
          break;
      }

      this.setState({errors, [name]: value}, () => console.log("yes"));
    };
    

    

    render() {
      const { errors } = this.state;

      return (

          <div className="root-container">
            <div className="box-container">
      
              <img src={logo} className="modal_logo" alt="logo"/>

              <div className="title">
                    Login  
              </div>
              
              {/* <h1>The request returned is - {this.state.resData}</h1> */}
              <div className="box">
                
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

                <div className="input-group">
                  <label className="some-label">Password:</label>
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

                {this.state.apiError && (
                      <span className="error">{this.state.apiError}<br></br><br></br></span>
                    )} 
                     
                <br></br>
                <br></br>
                <br></br>
                <button type="submit" className="some-button" >LOGIN</button>
              

                <div className="backToLog"><Link to="/register">Don't have an Account?</Link></div>
                <div className="forgot"><Link to="/Forgot">Forgot your Password</Link></div>
                <div className="backToLog"><Link to="/home">Go back home?</Link></div>
                </form>
              </div>      
            </div>
          </div>

      );
    }
}
  

export default Login;
