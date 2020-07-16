import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Dashboard.css";

import logo from './../../Resources/spoonfork.png';

class Contact extends Component { 
    render() {
        return(
            <div className="in-container">
                <div className="nav-bar">
                    <div className="nav-centered">
                        {/* Replace href with Link later */}
                        <a href="#"><Link to="/Home">Home</Link></a>
                    </div>

                    <a href="#"><Link to="/About">About Us</Link></a>
                    <a href="#"><Link to="/Contact">Contact Us</Link></a>

                    <div class="nav-right">
                        <a href="#" ><Link to="/Login">Login</Link></a>
                        <a href="#"><Link to="/Register">Register</Link></a>
                    </div>
                </div>

                <div className="contactBox">
                    <img src={logo} className="logo" />
                    <div className="contactText">
                        <h1>Contact Us</h1>
                            <p>
                            Got any feedback about Nutrition Manager Deluxe&trade;? Reach out to us! Currently the best way to reach us
                            <br></br>
                            Is through our UCF E-Mails. Below is our respective E-Mails based on the roles of each member.
                            <br></br>
                            Thank you for using our app!
                            <br></br>
                            <ul>
                                <li>Front End Designers:
                                    <dl>Tommy To - E-Mail</dl>
                                    <dl>Samantha Chou - E-Mail</dl>
                                    <dl>Kris Choudhury - E-Mail</dl>
                                </li>
                                <br></br>
                                <li>Back End Designers:
                                    <dl>Aaron Koo - E-Mail</dl>
                                    <dl>Samuel Arminana</dl>
                                </li>
                                <br></br>
                                <li>Mobile Designers:
                                    <dl>Cameron Lindsey - E-Mail</dl>
                                    <dl>Jordy Pantoja - E-Mail</dl>
                                </li>
                            </ul>
                            </p>
                    </div>
                 </div>
                
                
            </div>
        );
      }  
}

export default Contact;