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
                <div className="nav-bar">
                    <div className="nav-centered">
                        
                        <a href="#"><Link to="/Home">Home</Link></a>
                    </div>

                    <a href="#"><Link to="/About">About Us</Link></a>
                    <a href="#"><Link to="/Contact">Contact Us</Link></a>

                    <div class="nav-right">
                        <a href="#" ><Link to="/Login">Login</Link></a>
                        <a href="#"><Link to="/Register">Register</Link></a>
                    </div>
                </div>


                 <div className="body">
                 <img src={logo} className="logo"/>
                     <div className="textField">
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
                 </div>
                </div>
                 <Link to="/Settings">Settings</Link>
                 <br></br>
                 <Link to="/Main">Main</Link>

            </div>
        );
      }


}

export default Home;