import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Settings.css'
import './progressbar.css'
import DataTable from 'react-data-table-component'
import {CircularProgressbar, buildstyles} from 'react-circular-progressbar';

const percentage = 33;

const data = [
    { 
        id: 1, 
        nutrient: 'Energy (in kcal)', 
        amount: '2000' 
    },
    {
        id: 2, 
        nutrient: 'Total fat (in grams)', 
        amount: '70' 
    },
    {
        id: 3, 
        nutrient: 'Saturates (in grams)', 
        amount: '20' 
    },
    {
        id: 4, 
        nutrient: 'Carbohydrate (in grams)', 
        amount: '260' 
    },
    {
        id: 5, 
        nutrient: 'Total sugars (in grams)', 
        amount: '90' 
    },
    {
        id: 6, 
        nutrient: 'Protein (in grams)', 
        amount: '50' 
    },
    {
        id: 7, 
        nutrient: 'Salt (in grams)', 
        amount: '6' 
    },
];

const columns = [
  {
    name: 'Nutrient',
    selector: 'nutrient',
    sortable: true,
  },
  {
    name: 'Amount (in grams)',
    selector: 'amount',
    sortable: true,
    right: true,
  },
];

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

                    <div className="init-container">
                        <div className="square-container1"></div>

                        <div className="square-container2">
                            <div class="grid-container1">
                                <div class="grid-item">
                                    <CircularProgressbar 
                                    value={percentage} 
                                    text={`${percentage}%`}
                                    />
                                    Energy
                                </div>
                                <div class="grid-item">
                                    <CircularProgressbar
                                        value={percentage} 
                                        text={`${data.id}%`}
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
                            <div class="table">
                                <DataTable
                                    title="Reference Intakes (RI) for Adults"
                                    columns={columns}
                                    data={data}
                                />
                            </div>
                        </div>     
                    </div>
                       
                    
        </div>
        )
    }
}

export default Main;