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
        nutrient: 'Energy', 
        amount: '8,400 kJ/2,000 kcal' 
    },
    {
        id: 2, 
        nutrient: 'Total fat', 
        amount: '<70g' 
    },
    {
        id: 3, 
        nutrient: 'Saturates', 
        amount: '<20g' 
    },
    {
        id: 4, 
        nutrient: 'Carbohydrate', 
        amount: '=>260g' 
    },
    {
        id: 5, 
        nutrient: 'Total sugars', 
        amount: '90g' 
    },
    {
        id: 6, 
        nutrient: 'Protein', 
        amount: '50g' 
    },
    {
        id: 7, 
        nutrient: 'Salt', 
        amount: '<6g' 
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
                            <div class="table">
                                <DataTable
                                    title="Reference Intakes (RI) for Adults"
                                    columns={columns}
                                    data={data}
                                />
                                <br></br>
                                <div>
                                    What are daily reference intakes?
                                </div>
                                <br></br>
                                <div>
                                    "Daily reference intakes are not meant to be targets. They just give you a rough idea of how much energy you should be eating each day, and how much fat, sugar, salt, and so on. Unless the label says otherwise, reference intakes are based on an average-sized woman doing an average amount of physical activity. This is to reduce the risk of people with lower energy requirements eating too much, and to make sure information on labels is clear and consistent."
                                </div>

                            </div>
                        </div>     
                    </div>
                       
                    
        </div>
        )
    }
}

export default Main;