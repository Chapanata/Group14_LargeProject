import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Dashboard.css";

import logo from './../../Resources/spoonfork.png';

class About extends Component { 
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

                <div className="aboutBox">
                    <img src={logo} className="logo" />
                    <div className="aboutText">
                        <h1>About Us</h1>
                            <p>
                            Nutrition Manager Deluxe&trade; was designed by a group of health conscious students
                            <br></br>
                            that weren't satisfied with the nutrition apps currently available. So we decided to create our own!
                            <br></br>
                            Using our 200 years of combined experience we developed an app that could compete with current nutrition apps.
                            <br></br>
                            <ul>
                                <li>Front End Designers: Tommy To, Samantha Chou, Kris Choudhury</li>
                                <li>Back End Designers: Aaron Koo, Samuel Arminana</li>
                                <li>Mobile Designers: Cameron Lindsey, Jordy Pantonja</li>
                            </ul>
                            </p>
                    </div>
                 </div>
                
                 
            </div>
        );
      }  
}

export default About;