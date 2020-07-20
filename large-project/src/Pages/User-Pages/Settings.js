import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showName: false,
            showEmail: false,
            showPass: false
        }
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

    showPassFields() {
        this.setState({
            showPass: true
        })
    }

    hideNameFields() {
        this.setState({
            showName: false
        })
    }

    hideEmailFields() {
        this.setState({
            showEmail: false
        })
    }

    hidePassFields() {
        this.setState({
            showPass: false
        })
    }

    render() {
        return(
        <div className="page">
            <div className="box">
                <div className="nav-bar">

                    <Link to="/Overview" >Overview</Link>
                    <Link to="#">Food</Link>
                    <Link to="/Daily">Daily Intake</Link>
                    <Link to="/Settings" className="active">Settings</Link>
                    <div className="nav-right"><Link to="/Home">Log Out</Link></div>

                </div>
                <div className="highlight-bar"></div>

                    <div className = "inner-container"> 
                        <form id="my-settings">
                            <h1>Account Settings</h1>
                            <div className="name-box">
                                <h2>Change Name:</h2>
                                <button type="button" class="name" onClick={()=>this.showNameFields()}>Change</button>
                                {
                                    this.state.showName
                                    // If true show name field
                                    ?<div className="change-name">
                                        <input type="text" name="full-name" placeholder="Enter New Full Name" required></input>
                                        <input type="text" name="full-name" placeholder="Confirm Full Name" required></input>
                                        <button type="button" class="save" onClick={()=>this.hideNameFields()}>Save Changes</button>
                                    </div>
                                    // Else hide name field
                                    :null
                                }
                                
                            </div>

                            <div className="email-box">
                                <h2>Change E-Mail Address:</h2>
                                <button type="button" class="name" onClick={()=>this.showEmailFields()}>Change</button>
                                {
                                    this.state.showEmail
                                    // If true show email fields
                                    ?<div className="change-email">
                                        <input type="email" name="email" placeholder="Enter New E-Mail Address" required></input>
                                        <input type="email" name="email" placeholder="Confirm E-Mail Address" required></input>
                                        <button type="button" class="save" onClick={()=>this.hideEmailFields()}>Save Changes</button>
                                    </div>
                                    // Else hide email fields
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
                                        <input type="password" name="password" placeholder="Enter New Password" required></input>
                                        <input type="password" name="password" placeholder="Confirm Password" required></input>
                                        <button type="button" class="save" onClick={()=>this.hidePassFields()}>Save Changes</button>
                                    </div>
                                    // Else hide password fields
                                    :null
                                }
                            </div>
                        </form>
                    
                        </div>  
                       
              
            </div>
            <div class="biogrid-container1">
                                
                                </div>
        </div>
        )
    }
}

export default Settings;
