import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Overview extends Component {
    
    constructor(props) {
        super(props);
        
    }



    render() {

        return (
            <div className="page">
                <div className="nav-bar">

                    <Link to="/Overview" className="active">Overview</Link>
                    <Link to="/Dictionary">Food Dictionary</Link>
                    <Link to="/Daily" >Daily Intake</Link>
                    <Link to="/Settings">Settings</Link>
                    <div className="nav-right">
                    <Link to="/Settings">Settings</Link>
                        <Link to="/Home">Log Out</Link>
                    </div>

                </div>
                <div className="highlight-bar"></div>
                    <div className="init-container">
                        <div className="bio-container1">
                            <h2>Line Graph of Nutrient Requirements</h2>
                        </div>

                        <div className="bio-container2">
                        <h2>Your Statistics</h2>

                        {/* Will Contain Render Edits */}
                            <div class="biogrid-container1">
                                
                            </div>

                            
                            
                        </div>

                        <div className="bio-container3">
                            <h2>This Week's Activity</h2>
                        </div>     
                    </div>
            </div>

        )
    }
} 

export default Overview;
