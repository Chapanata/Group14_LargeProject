import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Dictionary extends Component {
    
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
                    <div className="nav-right">
                        <Link to="/Settings">Settings</Link>
                        <Link to="/Home">Log Out</Link>
                    </div>
                </div>

                <div className="init-food-container">
                    <div className="food-container1">
                        <div className="search-bar">
                            <input 
                                type="food"
                                name="food"
                                placeholder="Enter what food or nutrient you would like to know more about..."
                            />                        
                        </div>
                    </div>

                    <div className="food-container2">
                        <button type="submit" className="enter-food-button">Enter</button>     
                    </div>

                    <div className="food-container3">
                        <div className="dictionary-box">
                        </div>
                    </div>
                </div>
            </div>

        )
    }
} 

export default Dictionary;