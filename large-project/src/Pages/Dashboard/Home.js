import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from './../../Resources/spoonfork_only.png';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
      }


    render() {
        return(
            <div className="HomePage">
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
                                <h1>Welcome</h1>
                                <p>
                                Tracking our food and calorie intake is vitally important to maintaining a long and healthy life.
                                <br></br>
                                In order to achieve this lifestyle, one of the best things that you can do for yourself is track what you eat.
                                <br></br>
                                Research shows that people who log calories lose more weight and are likelier to keep the weight off in the long run.
                                <br></br>
                                It can be hard tracking all this information by yourself. But don't worry!
                                We here at Nutrition Manager Deluxe&trade;<br></br>can help you through this journey of self improvement!
                                <br></br>
                                <br></br>
                                Join our community as we embark on a weight loss journey filled with awareness and accountability.
                                <br></br>
                                Track whatever you eat no matter where you are with our free mobile app which will sync with your desktop application.
                                <br></br>
                                It's so easy!
                                <br></br>
                                To start today register an account with us and begin your journey today!
                                </p>
                                <Link to="/Settings">Settings</Link>
                                <br></br>
                                <Link to="/Daily">Daily</Link>
                                <br></br>
                                <Link to="/Overview">Overview</Link>
                                <br></br>
                                <Link to="/Forgot">Forgot Password</Link>
                                <br></br>
                                <Link to="/resetPassword">Reset Password</Link>

                                <br></br>
                                <br></br>
                                <br></br>

                                <button type="submit" className="enter-select-button">
                                    <a href="#Register">
                                        <Link to="/Register"className="active">Create an account!</Link>
                                    </a>
                                </button>
                                <label>If you already have an account with us, click here to
                                    <a href="#Login">
                                        <Link to="/Login"className="active"> login</Link>
                                    </a>
                                </label>
                            </div>
                    </div>
                </div>

                <div class="footer">
                    <a href="#Home">
                        <Link to="/Home"className="active">Home</Link>
                    </a>
                    <a href="#AboutUs">
                        <Link to="/About">About Us</Link>
                    </a>
                    <a href="#ContactUs">
                        <Link to="/Contact">Contact Us</Link>
                    </a>
                    <div className="fooder-right">
                        <p>Nutrition Manager Deluxe TM</p>
                    </div>
                </div>
            </div>
        );
      }


}

export default Home;
