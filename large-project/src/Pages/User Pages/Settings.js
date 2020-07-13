import React, { Component } from 'react';
import { Link } from "react-router-dom";
import $ from "jquery";
import './Settings.css';

class Settings extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
        <div className="page">
            <div className="init-container">
                <div className="square-container">
                    <div className="nav-bar">
                        <div className="nav-centered">
                            {/* Replace href with Link later */}
                            <a href="#" >Home</a>
                        </div>

                        <a href="#">Food</a>
                        <a href="#">Account</a>

                        <div class="nav-right">
                            <a href="#" className="active">Settings</a>
                            <a href="#">Log Out</a>
                        </div>
                    </div>

                    <div className = "inner-container"> 
                        <form id="my-settings">
                            <h1>Account Settings</h1>
                            <div className="name-box">
                                <h2>Change Name:</h2>


                            </div>

                            <div className="email-box">
                                <h2>Change E-Mail Address:</h2>
                            </div>

                            <div className="pass-box">
                                <h2>Change Password:</h2>
                            </div>
                        </form>
                    
                    
                    
                    </div>    
                </div>
            </div>
        </div>
        )
    }
}

export default Settings;