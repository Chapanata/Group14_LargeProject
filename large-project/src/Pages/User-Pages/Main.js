import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Settings.css';
import './progressbar.css'

import {CircularProgressbar, buildstyles} from 'react-circular-progressbar';

class Main extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        const percentage = 66;

        return(
        <div className="page">
                    <div className="nav-bar">
                        <div className="nav-centered">
                            {/* Replace href with Link later */}
                            <a href="#" className="active">Overview</a>
                        </div>

                        <div class="nav-left">
                            <a href="#">Food</a>
                            <a href="#">Biometrics</a>
                        </div>

                        <div class="nav-right">
                            <a href="#" >Settings</a>
                            <a href="#">Log Out</a>
                        </div>
                    </div>

                    <div className="init-container">
                        <div className="square-container1"></div>

                        <div className="square-container2">
                            <div class="grid-container1">
                                <div class="grid-item">
                                    <CircularProgressbar 
                                    value={percentage} 
                                    text={`${percentage}%`}
                                    />
                                    Calories
                                </div>
                                <div class="grid-item">
                                    <CircularProgressbar 
                                        value={percentage} 
                                        text={`${percentage}%`}
                                    />
                                    Total Fat
                                </div>
                                <div class="grid-item">
                                    <CircularProgressbar 
                                        value={percentage} 
                                        text={`${percentage}%`}
                                    />
                                    Saturates
                                </div>  
                                <div class="grid-item">
                                    <CircularProgressbar 
                                        value={percentage} 
                                        text={`${percentage}%`}
                                    />
                                    Carbohydrates
                                </div>  
                            </div>

                            <div class="grid-container2">
                                <div class="grid-item">
                                    <CircularProgressbar 
                                        value={percentage} 
                                        text={`${percentage}%`}
                                    />
                                    Total Sugars
                                </div>
                                <div class="grid-item">
                                    <CircularProgressbar 
                                        value={percentage} 
                                        text={`${percentage}%`}
                                    />
                                    Protein
                                </div>  
                                <div class="grid-item">
                                    <CircularProgressbar 
                                        value={percentage} 
                                        text={`${percentage}%`}
                                    />
                                    Salt
                                </div>  
                            </div>
                            <h2>DAILY INTAKE GOALS</h2>
                        </div>

                        <div className="square-container3">
                            3
                        </div>     
                    </div>
                       
                    
        </div>
        )
    }
}

export default Main;