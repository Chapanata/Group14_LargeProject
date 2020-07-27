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
            <div className="homePage">
                <div className="in-container">
                    <div className="mainBox1">
                        <div className="topBox1">
                            <img src={logo} className="main-logo"/>
                        </div>
                        <div className="bottomBox1">
                            <h1>Welcome to Nutrition Manager Deluxe&trade;!</h1>
                            <p>
                                Tracking our food and calorie intake is vitally important to maintaining a long and healthy life. 
                                In order to achieve this lifestyle, one of the best things that you can do for yourself is to track what you eat.
                                Research shows that people who log calories lose more weight and are likelier to keep the weight off in the long run.
                                It can be hard tracking all this information by yourself. 
                                <br></br>
                                <br></br>
                                But don't worry!
                                We here at Nutrition Manager Deluxe&trade; can help you through this journey of self improvement!
                                <br></br>
                                <br></br>
                                Join our community as we embark on a weight loss journey filled with awareness and accountability.
                                <br></br>
                                <br></br>
                                Track whatever you eat no matter where you are with our free mobile app which will sync with your desktop application.
                                It's so easy!
                                To start today register an account with us and begin your journey today!
                            </p>
                        </div>
                    </div>
                    <div className="mainBox2">
                        <div className="topBox2">
                            <h1>Join our Community!</h1>
                            <button type="submit" className="enter-select-button">
                                <a href="#Register">
                                    <Link to="/Register"className="active">Create an account!</Link>
                                </a>
                            </button>
                            <h4> If you already have an account with us, click here to
                                <a href="#Login">
                                    <Link to="/Login"className="active"> login</Link>
                                </a>
                            </h4>
                        </div>
                        <div className="bottomBox2">
                            <h2>"Incredible way to keep track of the food you eat and maintain a healthy lifestyle! A++++!" 
                                <br></br>
                                -The Times
                            </h2>
                            <br></br>
                            <br></br>
                            <h2>"Easy to Use. Free to Use. Easy application. What more do you want??" 
                                <br></br>
                                -UCF Digest
                            </h2>
                        </div>
                    </div>
                </div>

                <div class="footer">
                    <a href="#Home" className="active">
                        <Link to="/Home">Home</Link>
                    </a>
                    <a href="#AboutUs">
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

export default Home;
