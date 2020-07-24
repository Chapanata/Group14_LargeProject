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
            </div>

        )
    }
} 

export default Dictionary;