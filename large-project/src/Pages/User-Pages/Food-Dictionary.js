import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from './../../Resources/spoonfork_only.png';
import axios from 'axios';

class Dictionary extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            sessiontoken: 2,
            foodquery: null,
            returnedname: null,
        }
        
    }

    handleSubmit = e => {
        e.preventDefault();
  
        axios.post('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=Uh00f59beCTOVOkHQvLjpO98kW6OL8aua0eiTqol&query=' 
        + [this.state.foodquery], {
            query: this.state.foodquery, 
            apikey: null,
        })
        .then(response => {
            console.log(response.data)
        
            this.setState({
                returnedname: response.data.foods[0].description
            })

            var cars = document.getElementById("cars");

            if (cars.hasChildNodes())
            {
                cars.innerHTML = '';
            }

            for(var i = 0; i < response.data.foods.length; i++) {

                var option = document.createElement("option");
                
                option.text = response.data.foods[i].description;
                
                cars.appendChild(option);
            }
        })        
    }

    handleChange = e => {
        e.preventDefault();
        this.setState ({foodquery: e.target.value});
    }  

    render() {

        return (
            <div className="page">
                <div className="nav-bar">
                    <img src={logo} className="logo"/>
                    <Link to="/Dictionary"className="active">Food Dictionary</Link>
                    <Link to="/Daily" >Daily Intake</Link>
                    <div className="nav-right">
                        <Link to="/Settings">Settings</Link>
                        <Link to="/Home">Log Out</Link>
                    </div>
                </div>
            
                <div className="highlight-bar"></div>

                
                    <div className="init-food-container">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="food-container1">
                                <div className="search-bar">
                                    <input 
                                        type="food"
                                        name="food"
                                        value={this.state.foodquery}
                                        onChange={ this.handleChange }
                                        placeholder="Enter what food or nutrient you would like to know more about..."
                                    />                        
                                </div>
                        </div>
                        <div className="food-container2">
                            <button type="submit" className="enter-food-button">Search</button>     
                        </div>
                    </form>


                        <div className="food-container3">
                                <div className="dictionary-box">
                                    <h1>Searching: {this.state.foodquery}</h1>
                                    <h1>Returning: {this.state.returnedname}</h1>
                                    <label for="cars">Choose a car:</label>
                                    <select name="cars" id="cars">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                        
                                    </select>
                                    <button type="submit" className="enter-food-button">Select</button>


                                </div>
                        </div>
                    </div>
            </div>

        )
    }
} 

export default Dictionary;