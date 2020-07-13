import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";

import logo from './../../Resources/spoonfork.png';

class Home extends Component { 
    constructor(props) {
        super(props);
        this.state = {  };
      }
    
      submitLogin(e) {
    
      }

    render() {
        return(
            <div className="in-container">
                <nav>
                    <div className="nav-wrapper">
                        <ul>
                        <li><Link to="/Home">Home</Link></li>
                        <li><Link to="/About">About Us</Link></li>
                        <li><Link to="/Contact">Contact Us</Link></li>
                        </ul>
                        
                    </div>
                </nav>
                <div className="headerBox">
                    <div className="left-box">
                        <img src={logo} className="logo" />
                    </div>
                    <div className="right-box">               
                        <div>
                            <button type="button" className="login-button" onClick={this.submitLogin.bind(this)}><Link to="/Register">Create a free account!</Link></button>
                        </div>
                        <div>
                            <Link to="/login">Already have an account with us? Login!</Link>
                        </div>
                    </div>
                 </div>

                 <div className="body">
                     <div> . </div>
                     <div> . </div>
                     <div>
                        Tracking our food and calorie intake is vitally important to maintaining a long and healthy life. 
                     </div>
                     <div>
                        And one of the best things that you can do for yourself is track what you eat. 
                     </div>
                     <div> . </div>
                     <div> . </div>
                     <div>
                        Research shows that people who log calories lose more weight and are likelier to keep the weight off in the long run.
                     </div>
                     <div> . </div>
                     <div> . </div>
                     <div>
                        Join our community as we embark on a weight loss journey filled with awareness and accountability.
                     </div>
                     <div>
                        Track no matter where you are with our free mobile app which will sync with your desktop application.
                     </div>
                     <div>
                        It's so easy!
                     </div>
                     <div> . </div>
                     <div> . </div>
                 </div>

                 <Link to="/Settings">Settings</Link>

            </div>
        );
      }


}

export default Home;