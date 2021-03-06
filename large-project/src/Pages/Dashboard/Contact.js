import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { Email, LocationOn, Notifications } from '@material-ui/icons';
import logo from './../../Resources/spoonfork_only.png';


class Contact extends Component { 
    render() {
        return(
            <div className="HomePage">
                <div className="in-container">
                    <div className="contact-Box1">
                            <img src={logo} className="about-logo"/>
                    </div>

                    <div className="contact-Box2">
                        <div className="contact-bottomBox1">
                            <h1>Contact Us</h1>
                            <p>
                                Got any feedback about Nutrition Manager Deluxe&trade;? Reach out to us!
                                <br></br>
                                Currently the best way to reach us is through our UCF E-Mails. Below is our respective E-Mails based on the roles of each member.
                                <br></br>
                                Thank you for using our app!

                                <h3>Front End Developers</h3>
                                <div className="contactCard"><Email></Email><br></br>Tommy To</div>
                                <div className="contactCard"><Email></Email><br></br>Samantha Chou</div>
                                <div className="contactCard"><Email></Email><br></br>Kris Choudhury</div>


                                <h3>Back End Developers</h3>
                                <div className="contactCard"><Email></Email><br></br>Aaron Koo</div>
                                <div className="contactCard"><Email></Email><br></br>Samuel Arminana</div>

                                <h3>Mobile Developers</h3>
                                <div className="contactCard"><Email></Email><br></br>Cameron Lindsey</div>
                                <div className="contactCard"><Email></Email><br></br>Jordy Pantoja</div>
                            </p>
                        </div>
                    </div>
                
                    <div class="footer">
                        <a href="#Home">
                            <Link to="/Home">Home</Link>
                        </a>
                        <a href="#AboutUs">
                            <Link to="/About">About Us</Link>
                        </a>
                        <a href="#ContactUs" className="active">
                            <Link to="/Contact">Contact Us</Link>
                        </a>
                        <div className="fooder-right">
                            <p>Nutrition Manager Deluxe&trade;</p>
                        </div>
                    </div>
                </div>
            </div>
        );
      }  
}

export default Contact;
