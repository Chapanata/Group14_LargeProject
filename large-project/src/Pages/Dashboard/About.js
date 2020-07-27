import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from './../../Resources/spoonfork_only.png';

class About extends Component { 
    render() {
        return(
            <div className="in-container">
                <div className="about-Box1">
                        <img src={logo} className="about-logo"/>
                </div>

                <div className="about-Box2">
                    <div className="about-bottomBox1">
                        <h1>About Us</h1>
                        <p>
                            Nutrition Manager Deluxe&trade; was designed by a group of health conscious students 
                            that weren't satisfied with the nutrition apps currently available. So we decided to create our own!
                            Using our 200 years of combined experience we developed an app that could compete with current nutrition apps.
                            <br></br>
                            <br></br>
                            <h4>Front End Developers: </h4> Tommy To, Samantha Chou, Kris Choudhury, Jordy Pantonja
                            <br></br>
                            <h4>Back End Developers: </h4> Aaron Koo, Samuel Arminana
                            <br></br>
                            <h4>Mobile Developers: </h4> Cameron Lindsey
                        </p>
                    </div>
                </div>

                <div class="footer">
                    <a href="#Home">
                        <Link to="/Home">Home</Link>
                    </a>
                    <a href="#AboutUs" className="active">
                        <Link to="/About">About Us</Link>
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
