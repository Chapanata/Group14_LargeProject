import React, { Component } from 'react';
import { Link } from "react-router-dom";


import logo from './../../Resources/spoonfork_only.png';

class About extends Component { 
    render() {
        return(
            <div className="in-container">
                <div class="home-nav-bar">
                    <a href="#Login">
                        <Link to="/Login">Login</Link>
                    </a>
                    <a href="#Register">
                        <Link to="/Register">Register</Link>
                    </a>
                </div>
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

                <div class="footer">
                    <a href="#Home">
                        <Link to="/Home">Home</Link>
                    </a>
                    <a href="#AboutUs">
                        <Link to="/About"className="active">About Us</Link>
                    </a>
                    <a href="#ContactUs">
                        <Link to="/Contact">Contact Us</Link>
                    </a>
                    <div className="fooder-right">
                        <p>Nutrition Manager Deluxe&trade;</p>
                    </div>
                </div>
                 
            </div>
        );
      }  
}

export default About;
