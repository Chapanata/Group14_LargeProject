import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component'
import {CircularProgressbar, buildstyles} from 'react-circular-progressbar';
import { Search, LocationOn, Notifications } from '@material-ui/icons';
import logo from './../../Resources/spoonfork_only.png';
import axios from 'axios';
import { Info, AddIcon } from '@material-ui/icons';

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

class Daily extends Component {

    constructor(props) {
        super(props);
         var date = new Date();
      var currentDate = date.toISOString().slice(0,10);
                this.state = {
            sessiontoken: 2,
            foodquery: null,
            returnedname: null,
            jsonResponse: null,
            foodItem: '--',
            brand: '--',
            descript: '--',
            ingred: '--',
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
            date: currentDate
        }
        
    }
    componentDidMount() {
    // setDate();
        var listItems = document.getElementById("list_items");
            listItems.style.display = "none";
        // Fetch from DB onto Activity
        // Auto Change the Progress Bars
    }

       handleSearchSubmit = e => {
        e.preventDefault();
          var listItems = document.getElementById("list_items");
            listItems.style.display = "block";
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
            if ( response.data.foods.length > 0)
            {
                this.setState({
                    returnedname: response.data.foods[0].description,
                    jsonResponse: response.data,
                })

                var selectDropdown = document.getElementById("list_items");

                if (selectDropdown.hasChildNodes())
                {
                    selectDropdown.innerHTML = '';
                }

                for (var i = 0; i < response.data.foods.length; i++) {

                var option = document.createElement("div");
                option.className = "food_item";
                option.setAttribute('data-foodID' , response.data.foods[i].fdcId);
                option.setAttribute('data-foodname' , response.data.foods[i].description);
                //option.innerHTML += '<svg class="MuiSvgIcon-root refSheetbtn" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>';
                if (response.data.foods[i].dataType == "Branded")
                {
                    option.innerHTML += "<div class='brand_title'>" + '<svg class="MuiSvgIcon-root addActbtn" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg> ' + response.data.foods[i].brandOwner + "</div>";
                     option.innerHTML += "<div class='item_descr'>" + response.data.foods[i].description + "</div>";
                }
                else
                {
                     option.innerHTML += "<div class='item_descr'>" + '<svg class="MuiSvgIcon-root addActbtn" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg> ' + response.data.foods[i].description + "</div>";
                }

                option.innerHTML += "</div>";
                option.addEventListener("click",function(){
                    alert("Food ID: " + this.dataset.foodid);
                    alert("Food ID: " + this.dataset.foodname);
                     /*var json = JSON.stringify({
                        id: parseInt(this.dataset.foodid)
                      });
                    console.log(json); */
                    //confirm({ description: 'This action is permanent!' });
                 //   confirm({ description: 'This action is permanent!' });
                    var favDrink = prompt("How many " + this.dataset.foodname + " would you like to add?");
                    if (favDrink === "")
                    {

                    }
                    else if (favDrink)
                    {
                        if (parseInt(favDrink) == 0)
                        {

                        }
                        else
                        {
                            alert("Added " + favDrink + " " + this.dataset.foodname + " to your daily intake!");
                        }

                    }
                    else
                    {

                    }

                });
                selectDropdown.appendChild(option);
            }
            }else
            {
                 var selectDropdown = document.getElementById("list_items");
                 selectDropdown.innerHTML = "<p>No Items Found</p>";
            }

        })
    }
        handleChange = e => {
        e.preventDefault();
        this.setState ({foodquery: e.target.value});
    }
        showReference = e => {
// Get the modal
var modal = document.getElementById("myModal");

  modal.style.display = "block";


        }
        hideReference = e => {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
        }
        showAct = e => {
            var dt_val = document.getElementById("activityDate");
            var formCont = document.getElementById("inputformContainer");
            var listItems = document.getElementById("list_items");
            listItems.style.display = "none";

        }

    render() {
        return(
        <div className="page">
                <div className="nav-bar">
                    <img src={logo} className="logo"/>
                    <a href="#Dictionary">
                        <Link to="/Dictionary">Food Dictionary</Link>
                    </a>
                    <a href="#Daily" className="active">
                        <Link to="/Daily" >Daily Intake</Link>
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

                    <div className="init-container">
                        <div className="square-container1" >

                            <h2 className="intake_header">Daily Intake <Info className="refSheetbtn" onClick={this.showReference}></Info></h2>
                            <br></br>
                            <h4 className="intake_header">Select Date</h4>
                            <input id="activityDate" type="date" className="intake_input" placeholder="Select Date" value={this.state.date}  />


                                <div className="food-container1">
                                   <h4 className="intake_header">Input Food</h4>

                            <input type="text" className="intake_input" placeholder="Input Food" value={this.state.foodquery}
                                        onChange={ this.handleChange } />
                            <br></br>
                                        <button type="submit" className="input-food-button" onClick={this.handleSearchSubmit}>Search</button>
                                </div>

                            <div id="myModal" className="modal">


                              <div className="modal-content">
                                <span className="close" onClick={this.hideReference}>&times;</span>
                                 <DataTable
                                    title="Reference Intakes (RI) for Adults"
                                    columns={columns}
                                    data={data}
                                />
                              </div>

                            </div>
                            <br></br>
                           <div id="list_items"></div>
                            <br></br>
                            <br></br>

                        </div>

                        <div className="square-container2">
                            <div class="grid-container1">
                                <div class="grid-item">
                                    <CircularProgressbar 
                                    value={percentage} 
                                    text={`${percentage}%`} />
                                    Energy
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
                    <p>Nutrition Manager Deluxe TM</p>
                </div>
            </div>
                    
        </div>
        )
    }
}

export default Daily;
