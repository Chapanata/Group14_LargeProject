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

            jsonResponse: null,

            foodItem: 'N/A',
            brand: 'N/A',
            descript: 'N/A',
            ingred: 'N/A',
            ene: 'N/A',
            tfat: 'N/A',
            sat: 'N/A',
            carbo: 'N/A',
            tsugars: 'N/A',
            prot: 'N/A',
            sodium: 'N/A',
            cal: 'N/A',
            pot: 'N/A',
            iro: 'N/A',
            zin: 'N/A',
            vitA: 'N/A',
            vitB: 'N/A',
            vitC: 'N/A',
            vitD: 'N/A',
        } 
    }

    handleSearchSubmit = e => {
        e.preventDefault();

        this.setState({
            foodItem: 'N/A',
            brand: 'N/A',
            descript: 'N/A',
            ingred: 'N/A',
            ene: 'N/A',
            tfat: 'N/A',
            sat: 'N/A',
            carbo: 'N/A',
            tsugars: 'N/A',
            prot: 'N/A',
            sodium: 'N/A',
            cal: 'N/A',
            pot: 'N/A',
            iro: 'N/A',
            zin: 'N/A',
            vitA: 'N/A',
            vitB: 'N/A',
            vitC: 'N/A',
            vitD: 'N/A',
        })
  
        axios.post('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=Uh00f59beCTOVOkHQvLjpO98kW6OL8aua0eiTqol&query=' 
        + [this.state.foodquery], {
            query: this.state.foodquery, 
            apikey: null,
        })
        .then(response => {
            console.log(response.data)
        
            this.setState({
                returnedname: response.data.foods[0].description,
                jsonResponse: response.data,
            })

            var selectDropdown = document.getElementById("selectDropdown");

            if (selectDropdown.hasChildNodes())
            {
                selectDropdown.innerHTML = '';
            }

            for (var i = 0; i < response.data.foods.length; i++) {

                var option = document.createElement("option");
                
                option.text = response.data.foods[i].description;
                option.value = response.data.foods[i].fdcId;
                
                selectDropdown.appendChild(option);
            }
        })        
    }

    handleSelectSubmit = e => {
        e.preventDefault();

        var selectDropdown = document.getElementById("selectDropdown");
        var json = this.state.jsonResponse;
        var foodNumber = 0;

        this.setState({
            foodItem: 'N/A',
            brand: 'N/A',
            descript: 'N/A',
            ingred: 'N/A',
            ene: 'N/A',
            tfat: 'N/A',
            sat: 'N/A',
            carbo: 'N/A',
            tsugars: 'N/A',
            prot: 'N/A',
            sodium: 'N/A',
            cal: 'N/A',
            pot: 'N/A',
            iro: 'N/A',
            zin: 'N/A',
            vitA: 'N/A',
            vitB: 'N/A',
            vitC: 'N/A',
            vitD: 'N/A',
        })

        for (var i = 0 ; i < json.foods.length; i++)
        {
            if (json.foods[i].fdcId == selectDropdown.value)
            {
                foodNumber = i;
            }
        }

        if (json.foods[foodNumber].description != undefined)
        {
            this.setState({foodItem: json.foods[foodNumber].description})
        }

        if (json.foods[foodNumber].brandOwner != undefined)
        {
            this.setState({brand: json.foods[foodNumber].brandOwner})
        }

        if (json.foods[foodNumber].additionalDescriptions != undefined)
        {
            this.setState({descript: json.foods[foodNumber].additionalDescriptions})
        }

        if (json.foods[foodNumber].ingredients != undefined)
        {
            this.setState({ingred: json.foods[foodNumber].ingredients})
        }

        for (var j = 0 ; j < json.foods[foodNumber].foodNutrients.length ; j++)
        {
            // Energy
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1008')
            {
                this.setState({ene: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Total Fat
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1004')
            {
                this.setState({tfat: json.foods[foodNumber].foodNutrients[j].value})
            }
            
            // Saturates
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1258')
            {
                this.setState({sat: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Carbohydrates
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1005')
            {
                this.setState({carbo: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Total Sugars
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '2000')
            {
                this.setState({tsugars: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Protein
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1003')
            {
                this.setState({prot: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Sodium
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1093')
            {
                this.setState({sodium: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Calcium
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1087')
            {
                this.setState({cal: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Potassium
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1092')
            {
                this.setState({pot: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Iron
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1089')
            {
                this.setState({iro: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Zinc
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1095')
            {
                this.setState({zin: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Vitamin A
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1106')
            {
                this.setState({vitA: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Vitamin B12
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1178')
            {
                this.setState({vitB: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Vitamin C
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1162')
            {
                this.setState({vitC: json.foods[foodNumber].foodNutrients[j].value})
            }

            // Vitamin D
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1114')
            {
                this.setState({vitD: json.foods[foodNumber].foodNutrients[j].value})
            }
        }
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
                    <form onSubmit={this.handleSearchSubmit} noValidate>
                        <div className="food-container1">
                                <div className="search-bar">
                                    <input 
                                        type="food"
                                        name="food"
                                        value={this.state.foodquery}
                                        onChange={ this.handleChange }
                                        placeholder="Enter what food or nutrient you would like to know more about..."
                                    />
                                    <button type="submit" className="enter-food-button">Search</button>                         
                                </div>                               
                        </div>
                    </form>

                    <form onSubmit={this.handleSelectSubmit} noValidate>
                        <div className="food-container2">
                            <div className="results-box">
                                <h1>Searching: {this.state.foodquery}</h1>
                                <h1>Returning: {this.state.returnedname}</h1>
                                <label for="cars">Choose a food option:</label>
                                <select name="selectDropdown" id="selectDropdown">
                                    <option value="initial">---</option>  
                                </select>
                                <button type="submit" className="enter-food-button">Select</button>
                                <br></br>
                                <br></br>
                                <h1>Food Item: {this.state.foodItem} </h1>
                                <h1>Brand Owner: {this.state.brand}</h1>
                                <h1>Description : {this.state.descript}</h1>
                                <h1>Ingrediants: {this.state.ingred}</h1>
                                <br></br>
                                <br></br>
                                <h1>Energy: {this.state.ene} kcal</h1>
                                <h1>Total Fat: {this.state.tfat} grams</h1>
                                <h1>Saturates: {this.state.sat} grams</h1>
                                <h1>Carbohydrates: {this.state.carbo} grams</h1>
                                <h1>Total Sugars: {this.state.tsugars} grams</h1>
                                <h1>Protein: {this.state.prot} grams</h1>
                                <h1>Sodium: {this.state.sodium} grams</h1>
                                <br></br>
                                <br></br>
                                <h1>Calcium: {this.state.cal} MG</h1>
                                <h1>Potassium: {this.state.pot} MG</h1>
                                <h1>Iron: {this.state.iro} MG</h1>
                                <h1>Zinc: {this.state.zin} mg</h1>
                                <h1>Vitamin A: {this.state.vitA} ug</h1>
                                <h1>Vitamin B12: {this.state.vitB} ug</h1>
                                <h1>Vitamin C: {this.state.vitC} mg</h1>
                                <h1>Vitamin D: {this.state.vitD} ug</h1>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        )
    }
} 

export default Dictionary;