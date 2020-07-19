import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Dashboard.css";

import logo from './../../Resources/spoonfork_only.png';

class About extends Component { 
    render() {
        return(
            <div className="in-container">
                <div className="nav-bar">
                    <img src={logo} className="logo"/>

                    <Link to="/Home">Welcome</Link>
                    <Link to="/About" className="active">About</Link>
                    <Link to="/Contact">Contact Us</Link>
                    <div className="nav-right">
                        <Link to="/Login">Login</Link>
                        <Link to="/Register">Register</Link>
                    </div>
                </div>
                <div className="highlight-bar"></div>
                <div className="mainBox">

                    <div className="mainText">
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
