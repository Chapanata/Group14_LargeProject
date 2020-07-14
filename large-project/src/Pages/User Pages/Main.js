import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Settings.css';

class Main extends Component {

    constructor(props) {
        super(props);
        
    }
    
   

    render() {
        return(
        <div className="page">
            <div className="init-container">
                <div className="square-container">
                    <div className="nav-bar">
                        <div className="nav-centered">
                            {/* Replace href with Link later */}
                            <a href="#" className="active">Home</a>
                        </div>

                        <a href="#">Food</a>
                        <a href="#">Account</a>

                        <div class="nav-right">
                            <a href="#" >Settings</a>
                            <a href="#">Log Out</a>
                        </div>
                    </div>

                    <div className = "inner-container"> 
                       
                    
                    
                    </div>    
                </div>
            </div>
        </div>
        )
    }
}

export default Main;