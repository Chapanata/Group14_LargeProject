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
            ene: '--',
            eneUnits: '',
            tfat: '--',
            tfatUnits: '',
            sat: '--',
            satUnits: '',
            carbo: '--',
            carboUnits: '',
            tsugars: '--',
            tsugarsUnits: '',
            prot: '--',
            protUnits: '',
            sodium: '--',
            sodiumUnits: '',
            cal: '--',
            calUnits: '',
            pot: '--',
            potUnits: '',
            iro: '--',
            iroUnits: '',
            zin: '--',
            zinUnits: '',
            vitA: '--',
            vitAUnits: '',
            vitB: '--',
            vitBUnits: '',
            vitC: '--',
            vitCUnits: '',
            vitD: '--',
            vitDUnits: '',
        }
    }

    handleSearchSubmit = e => {
        e.preventDefault();

        this.setState({
            foodItem: 'N/A',
            brand: 'N/A',
            descript: 'N/A',
            ingred: 'N/A',
            ene: '--',
            eneUnits: '',
            tfat: '--',
            tfatUnits: '',
            sat: '--',
            satUnits: '',
            carbo: '--',
            carboUnits: '',
            tsugars: '--',
            tsugarsUnits: '',
            prot: '--',
            protUnits: '',
            sodium: '--',
            sodiumUnits: '',
            cal: '--',
            calUnits: '',
            pot: '--',
            potUnits: '',
            iro: '--',
            iroUnits: '',
            zin: '--',
            zinUnits: '',
            vitA: '--',
            vitAUnits: '',
            vitB: '--',
            vitBUnits: '',
            vitC: '--',
            vitCUnits: '',
            vitD: '--',
            vitDUnits: '',
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
                if (response.data.foods[i].dataType == "Branded")
                {
                    option.text = "[" + response.data.foods[i].brandOwner + "] " + response.data.foods[i].description;
                }

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
                this.setState({eneUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Total Fat
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1004')
            {
                this.setState({tfat: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({tfatUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Saturates
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1258')
            {
                this.setState({sat: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({satUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Carbohydrates
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1005')
            {
                this.setState({carbo: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({carboUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Total Sugars
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '2000')
            {
                this.setState({tsugars: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({tsugarsUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Protein
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1003')
            {
                this.setState({prot: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({protUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Sodium
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1093')
            {
                this.setState({sodium: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({sodiumUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Calcium
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1087')
            {
                this.setState({cal: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({calUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Potassium
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1092')
            {
                this.setState({pot: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({potUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Iron
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1089')
            {
                this.setState({iro: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({iroUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Zinc
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1095')
            {
                this.setState({zin: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({zinUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Vitamin A
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1106')
            {
                this.setState({vitA: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({vitAUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Vitamin B12
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1178')
            {
                this.setState({vitB: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({vitBUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Vitamin C
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1162')
            {
                this.setState({vitC: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({vitCUnits: json.foods[foodNumber].foodNutrients[j].unitName})
            }

            // Vitamin D
            if (json.foods[foodNumber].foodNutrients[j].nutrientId == '1114')
            {
                this.setState({vitD: json.foods[foodNumber].foodNutrients[j].value})
                this.setState({vitDUnits: json.foods[foodNumber].foodNutrients[j].unitName})
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
                    <a href="#Dictionary" className="active">
                        <Link to="/Dictionary">Food Dictionary</Link>
                    </a>
                    <a href="#Daily" >
                        <Link to="/Daily">Daily Intake</Link>
                    </a>
                    <div className="nav-right">
                        <a href="#Settings">
                            <Link to="/Settings">Settings</Link>
                        </a>
                        <a href="#Home">
                            <Link to="/Home">Log Out</Link>
                        </a>
                    </div>
                </div>

                <div className="init-food-container">
                    <form onSubmit={this.handleSearchSubmit} noValidate>
                        <div className="food-container1">
                                <div className="search-bar">
                                    <input
                                        type="food"
                                        name="food"
                                        value={this.state.foodquery}
                                        onChange={ this.handleChange }
                                        placeholder="Search for information about any food items!"
                                    />
                                </div>
                                <div className="search-button">
                                    <button type="submit" className="enter-food-button">Search</button>
                                </div>
                        </div>
                    </form>

                    <form onSubmit={this.handleSelectSubmit} noValidate>
                        <div className="food-container2">
                            <div className="results-box">
                                    <h1>Searched: {this.state.foodquery}</h1>
                                    <label for="food">Related Options:</label>
                                    <select name="selectDropdown" id="selectDropdown">
                                        <option value="initial">---</option>
                                    </select>
                                        <button type="submit" className="enter-select-button">Select</button>
                                    <br></br>
                                    <h2>Food Item:
                                        <label for="food"> {this.state.foodItem}</label>
                                    </h2>
                                    <h2>Brand Owner:
                                        <label for="food"> {this.state.brand}</label>
                                    </h2>
                                    <h2>Description:
                                        <label for="food"> {this.state.descript}</label>
                                    </h2>
                                    <h2>Ingredients:
                                        <label for="food"> {this.state.ingred}</label>
                                    </h2>
                                    <br></br>

                                    <table className="table1">
                                        <h2>Nutritional Facts about {this.state.foodItem}</h2>

                                        <tr>
                                            <th> </th>
                                            <th>Amount</th>
                                        </tr>
                                        <tr>
                                            <td>Calories (Energy)</td>
                                            <td>{this.state.ene} {this.state.eneUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Fat</td>
                                            <td>{this.state.tfat} {this.state.tfatUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Saturates</td>
                                            <td>{this.state.sat} {this.state.satUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Carbohydrates</td>
                                            <td>{this.state.carbo} {this.state.carboUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Sugars</td>
                                            <td>{this.state.tsugars} {this.state.tsugarsUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Protein</td>
                                            <td>{this.state.prot} {this.state.protUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Sodium</td>
                                            <td>{this.state.sodium} {this.state.sodiumUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Calcium</td>
                                            <td>{this.state.cal} {this.state.calUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Potassium</td>
                                            <td>{this.state.pot} {this.state.potUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Iron</td>
                                            <td>{this.state.iro} {this.state.iroUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Zinc</td>
                                            <td>{this.state.zin} {this.state.zinUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Vitamin A</td>
                                            <td>{this.state.vitA} {this.state.vitAUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Vitamin B12</td>
                                            <td>{this.state.vitB} {this.state.vitBUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Vitamin C</td>
                                            <td>{this.state.vitC} {this.state.vitCUnits}</td>
                                        </tr>
                                        <tr>
                                            <td>Vitamin D</td>
                                            <td>{this.state.vitD} {this.state.vitDUnits}</td>
                                        </tr>
                                        <br></br>
                                    </table>
                                    <br></br>
                                    <br></br>
                            </div>
                        </div>
                    </form>
                </div>

                <div class="footer">
                    <a href="#Home">
                        <Link to="/Home">Home</Link>
                    </a>
                    <a href="#AboutUs">
                        <Link to="/About">About Us</Link>
                    </a>
                    <a href="#ContactUs">
                        <Link to="/Contact">Contact Us</Link>
                    </a>
                    <div className="fooder-right">
                        <p>Nutrition Manager Deluxe&trade;</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default Dictionary;
