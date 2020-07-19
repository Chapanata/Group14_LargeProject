import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Dashboard.css";
import { Email, LocationOn, Notifications } from '@material-ui/icons';
import logo from './../../Resources/spoonfork_only.png';


class Contact extends Component { 
    render() {
        return(
            <div className="in-container">
                <div className="nav-bar">
                    <img src={logo} className="logo"/>

                    <Link to="/Home">Welcome</Link>
                    <Link to="/About">About</Link>
                    <Link to="/Contact" className="active">Contact Us</Link>
                    <div className="nav-right">
                        <Link to="/Login">Login</Link>
                        <Link to="/Register">Register</Link>
                    </div>
                </div>
                <div className="highlight-bar"></div>
                <div className="mainBox">

                    <div className="mainText">
                        <h1>Contact Us</h1>
                            <p>
                            Got any feedback about Nutrition Manager Deluxe&trade;? Reach out to us! Currently the best way to reach us
                            <br></br>
                            Is through our UCF E-Mails. Below is our respective E-Mails based on the roles of each member.
                            <br></br>
                            Thank you for using our app!
                            <br></br>
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
                
                
            </div>
        );
      }  
}

export default Contact;
