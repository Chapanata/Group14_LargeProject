import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

var pass = ""
var confirm = ""
var newName = ""
var confirmName =""

const passRegex = RegExp(/^(?=.*\d)(?=.*[!?<>@#$%^&*])(?=.*[a-zA-Z]).{8,}$/);


class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showName: false,
            showEmail: false,
            showPass: false,
            fullName: null,
            confirmFull: null,
            password: null,
            confirmPassword: null,
            errors: {
                fullName:"",
                confirmFull:"", 
                password:"", 
                confirmPassword:"",
            }
        }
    }
    
    state = {
        initWeight: "0",
        initGender: "Choose Gender",
        initFeet: "0",
        initInches: "0",
        initbuttonText: "0",
        initBMI: "0",
        isInEditMode: false,
        buttonMode: false,
        buttonText: false,
        apiError: ''
    }

    handleChange = e => {

      

        e.preventDefault();
        const { name, value } = e.target;
        let errors = this.state.errors;
  
        
        switch (name) {
      
          case 'fullName':
            newName = value;
            errors.fullName = value.length < 1 
            ? "Cannot be empty"
            : "";
          break;
  
          case 'confirmName':
              confirmName = value;
            if(name === confirmName) {
                errors.confirmFull = "Names do not match"
            }
            else {
                errors.confirmFull = ""
            }
          break;
  
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


    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
        console.log("This works");
        console.log("Weight:" + this.state.weight)
    }

    updateWeight = (e) => {
        this.setState({
            initWeight: e.target.value, 
        })  
    }

    updateGender = (e) => { 
        this.setState({
            initGender: e.target.value,     
        })  
    }

    updateFeet = (e) => { 
        this.setState({
            initFeet: e.target.value,     
        })  
    }

    updateInches = (e) => { 
        this.setState({
            initInches: e.target.value,     
        })  
    }

    updateBMI = (e) => { 
        this.setState({
            initBMI: e.target.value,     
        })  
    }


    renderDefaultView = () => {
        return <div className="biogrid-container1">
        <h3>Weight: {this.state.weight} pounds</h3>
        <h3>Gender: {this.state.gender}</h3>
        <h3>Height: {this.state.feet} feet {this.state.inches} inches</h3>
        <h3>BMI: {this.state.BMI}</h3>
        </div>
        
    }

    renderEditView = () => {
        return <div class="biogrid-container1">
        <h3>Weight: 
        {
            this.state.isInEditMode 
            ? 
                <input className="bio-inputs" type="text" onChange={this.updateWeight}/>
            : <div>
                {this.state.weight}
              </div>

        } pounds</h3>

        <h3>Gender:
        {
            this.state.isInEditMode
            ?
                <select name="genderChoice" onChange={this.updateGender}>
                    <option value="">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            
            : <div>
                {this.state.initGender}
            </div>
        }

        </h3>

        <h3>Height:
        {
            this.state.isInEditMode
            ? 
                <input className="bio-inputs" type="text" onChange={this.updateFeet}/>
            
            : <div className="feet">
                {this.state.initFeet};
            </div>
                
        }
        Feet 
        {
            this.state.isInEditMode
            ? 
                <input className="bio-inputs" type="text" onChange={this.updateInches}/>
            
            : <div className="inches">
                {this.state.initInches};
            </div>
                
        }
        Inches
        </h3>
        <button type="button" class="saveStats" onClick={this.changeEditMode}>Save Changes</button>
        </div>
    }
    
    showNameFields() {
        this.setState({
            showName: true
        })
    }

    showEmailFields() {
        this.setState({
            showEmail: true
        })
    }
npm 
    showPassFields() {
        this.setState({
            showPass: true
        })
    }

    // Save Name Changes
    hideNameFields() {
        // Grab the token from localStorage and store it in a header object.
        let token = window.localStorage.getItem('session-token');
        const tokenHeader = { 'auth-token': token };

        // Send Post to Send Name Data
        // http://localhost:8080/editUser/name
        axios.post('http://localhost:8080/editUser/name', 
        {
            name: this.state.fullName,
            nameConfirm: this.state.confirmFull
        },
        {
            // Send the token to the header when calling the API
            headers: tokenHeader
        })
        .then(response => {
            console.log(response.data)
            console.log(response.data.Success)
            console.log(response.data.Error)
            this.setState({
                apiError: response.data.Error
            })
        })
        .catch(error => {
            console.log(error.response)
        })

        this.setState({
            showName: false
        })
    }

    // Save Pass Changes
    hidePassFields() {
        // Grab the token from localStorage and store it in a header object.
        let token = window.localStorage.getItem('session-token');
        const tokenHeader = { 'auth-token': token };
        
        // Send Post to Send Password Data
        // http://localhost:8080/editUser/password
        axios.post('http://localhost:8080/editUser/password', 
        {
            password: this.state.password,
            passwordConfirm: this.state.confirmPassword
        },
        {
            // Send the token to the header when calling the API
            headers: tokenHeader
        })
        .then(response => {
            console.log(response.data)
            console.log(response.data.Success)
            console.log(response.data.Error)
            this.setState({
                apiError: response.data.Error
            })
        })
        .catch(error => {
            console.log(error.response)
        })

        this.setState({
            showPass: false
        })
    }

    render() {
        const { errors } = this.state;
        return(
        <div className="page">
            <div className="box">
                <div className="nav-bar">
                    <Link to="/Overview" >Overview</Link>
                    <Link to="/Dictionary">Food Dictionary</Link>
                    <Link to="/Daily">Daily Intake</Link>
                    <div className="nav-right">
                        <Link to="/Settings" className="active">Settings</Link>
                        <Link to="/Home">Log Out</Link>
                    </div>

                </div>
                <div className="highlight-bar"></div>

                    <div className = "inner-container"> 
                        <form id="my-settings">
                            <h1>Account Settings</h1>
                            <div className="name-box">
                                <h2>Change Name:</h2>
                                <button type="button" className="name" onClick={()=>this.showNameFields()}>Change</button>
                                {
                                    this.state.showName
                                    // If true show name field
                                    ?<div className="change-name">
                                        <input type="text" name="fullName" placeholder="Enter New Full Name" onChange={this.handleChange} required></input>
                                        <input type="text" name="confirmFull" placeholder="Confirm Full Name" onChange={this.handleChange} required></input>
                                        {/* {errors.confirmFull.length > 0 && (
                                            <span className="error">{errors.confirmFull}</span>
                                        )} */}
                                        <button type="button" class="save" onClick={()=>this.hideNameFields()}>Save Changes</button>
                                    </div>
                                    // Else hide name field
                                    :null
                                }
                                
                            </div>

                            <div className="pass-box">
                                <h2>Change Password:</h2>
                                <button type="button" class="name" onClick={()=>this.showPassFields()}>Change</button>
                                {
                                    this.state.showPass
                                    // If true show password fields
                                    ?<div className="change-pass">
                                        <input type="password" name="password" placeholder="Enter New Password" onChange={this.handleChange} required></input>
                                        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} required></input>
                                        <button type="button" class="save" onClick={()=>this.hidePassFields()}>Save Changes</button>
                                    </div>
                                    // Else hide password fields
                                    :null
                                }
                            </div>
                        </form>
                    </div>  
            </div>

            <div className="user-stats">
            <h2>Your Statistics</h2>
                {/* Will Contain Render Edits */}
                <div class="biogrid-container1">
                    {
                        this.state.isInEditMode 
                        ? this.renderEditView()
                        : this.renderDefaultView()

                    }
                </div>
                <button type="button" class="changeStats" onClick={this.changeEditMode}>Make Changes</button>      
            </div>
        </div>
        )
    }
}

/*
{" "}
                                    {reactStringReplace(content, /(\d+)/g, (match, i) => ( <span key={i} style={{ color: 'red' }}>{match}</span>))}
                                    {" "}!*/
export default Settings;