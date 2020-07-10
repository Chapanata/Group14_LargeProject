import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Dashboard.css";

import logo from './../../Resources/logo.png';

class About extends Component { 
    render() {
        return(
            <div className="in-container">
                <div className="header">
                    <div className="left-box">
                        <img src={logo} className="logo" />
                    </div>
                </div>
                <div className="footer">
                    <div>
                        <p><Link to="/Home">Home</Link></p>
                    </div>
                    <div>
                        <p><Link to="/About">About Us</Link></p>
                    </div>
                    <div>
                        <p><Link to="/Contact">Contact Us</Link></p>
                    </div>
                 </div>
            </div>
        );
      }  
}

export default About;