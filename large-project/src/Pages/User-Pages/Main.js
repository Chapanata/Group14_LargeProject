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
                    <div className="nav-bar">
                        <div className="nav-centered">
                            {/* Replace href with Link later */}
                            <a href="#" className="active">Home</a>
                        </div>

                        <div class="nav-left">
                            <a href="#">Food</a>
                            <a href="#">Account</a>
                        </div>

                        <div class="nav-right">
                            <a href="#" >Settings</a>
                            <a href="#">Log Out</a>
                        </div>
                    </div>

                    <div className="inner-container"> 
                        <div className="init-container">
                            <div className="square-container">
                                <h1>Calendar:</h1>
                                <h2>Stacked Bar Chart:</h2>
                                <h3>General Information:</h3>

                            </div>
                            
                        </div>
                       
                    </div>    
        </div>
        )
    }
}

export default Main;