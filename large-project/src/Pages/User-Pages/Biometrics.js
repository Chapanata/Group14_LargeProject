import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Settings.css';


class Biometrics extends Component {
    
    constructor(props) {
        super(props);
        
    }

    render() {

        return (
            <div className="page">
                    <div className="nav-bar">
                        <div className="nav-centered">
                            {/* Replace href with Link later */}
                            <a href="#" >Overview</a>
                        </div>

                        <div class="nav-left">
                            <a href="#">Food</a>
                            <a href="#" className="active">Biometrics</a>
                        </div>

                        <div class="nav-right">
                            <a href="#" >Settings</a>
                            <a href="#">Log Out</a>
                        </div>
                    </div>

                    <div className="init-container">
                        <div className="bio-container1">
                            <h2>All Activity</h2>
                        </div>

                        <div className="bio-container2">
                        <h2>Your Statistics</h2>

                            <div class="biogrid-container1">
                                <h3>Weight:# pounds</h3>
                                <h3>Gender: (Dropdown)</h3>
                                <h3>Height: # feet # inches</h3>
                            </div>

                            <div class="biogrid-container2">
                                <h2>BMI:</h2>
                                <h2> #</h2>
                            </div>
                            <button type="button" class="changeStats">Make Changes</button>
                        </div>

                        <div className="bio-container3">
                            <h2>This Week's Activity</h2>
                        </div>     
                    </div>
            </div>







        )



    }
} 

export default Biometrics;