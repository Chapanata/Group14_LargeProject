import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component'
import {CircularProgressbar, buildstyles} from 'react-circular-progressbar';
import { Search, LocationOn, Notifications } from '@material-ui/icons';
import logo from './../../Resources/spoonfork_only.png';
import axios from 'axios';
import { Info, AddIcon, RemoveCircle } from '@material-ui/icons';

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
            date: currentDate,
            name: 'N/A'
        }


    }


    componentDidMount() {
        // Hide List Items
        var listItems = document.getElementById("list_items");
        listItems.style.display = "none";

        // Init Token
        let token = window.localStorage.getItem('session-token');
        const tokenHeader = { 'auth-token': token };

        // Get & Set Name
        axios.get('https://nutrition-heroku.herokuapp.com//getName',
        {
            headers: tokenHeader
        })
        .then(response => {
            this.setState({
                name: response.data.name
            });
        })
        .catch(error => {
            console.log(error.response)
        });

        // Getting Current Date as default
        var formattedDate = new Date(this.state.date + " 0:00:00");

        var newformattedDate = ("0" + (formattedDate.getMonth() + 1)).slice(-2) + "/" +("0" + (formattedDate.getDate())).slice(-2) + "/" + formattedDate.getFullYear();

        var food_act_el = document.getElementById("food_activity");

        // Get Deficiencies & set onto progressbars
        axios.post('https://nutrition-heroku.herokuapp.com//getDeficiencies',
        {
            date: newformattedDate
        },
        {
            headers: tokenHeader
        })
        .then(response => {
            console.log(response.data);
            this.setState({
                ene: response.data.energy.toFixed(2) * 100,
                tfat : response.data.totalFat.toFixed(2) * 100,
                sat : response.data.saturates.toFixed(2) * 100,
                carbo : response.data.carbs.toFixed(2) * 100,
                tsugars : response.data.totalSugars.toFixed(2) * 100,
                prot : response.data.protein.toFixed(2) * 100,
                sodium : response.data.salt.toFixed(2) * 100,
            });
        })
        .catch(error => {
            console.log(error.response)
        });

        // Get Food Activity
        axios.post('https://nutrition-heroku.herokuapp.com//getFoods',
        {
            date: newformattedDate
        },
        {
            headers: tokenHeader
        })
        .then(response => {
            var food_act_el = document.getElementById("food_activity");
            food_act_el.innerHTML = "";
            console.log(response.data);
            for(var i = 0; i < response.data.length; i++)
            {
                var foodItem = document.createElement("div");
                foodItem.className= "fooditem";
                foodItem.setAttribute('data-id' , response.data[i]._id);
                foodItem.innerHTML += "<span class='food_title'>("+response.data[i].quantity+") "+ response.data[i].name +"<div class='removeFood'>"+'<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></svg>'+" </div></span><br><div class='food_cat'><span class='cat_title'>Calories</span><br>"+response.data[i].energy+"</div><div class='food_cat'><span class='cat_title'>Total Fat</span><br>"+response.data[i].totalFat+"</div><div class='food_cat'><span class='cat_title'>Saturates</span><br>"+response.data[i].saturates+"</div><div class='food_cat'><span class='cat_title'>Carbs</span><br>"+response.data[i].carbs+"</div><div class='food_cat'><span class='cat_title'>Sugar</span><br>"+response.data[i].totalSugars+"</div><div class='food_cat'><span class='cat_title'>Protein</span><br>"+response.data[i].protein+"</div><div class='food_cat'><span class='cat_title'>Sodium</span><br>"+response.data[i].salt+"</div>";

                foodItem.addEventListener("click",function(){
                    var qtyVal = window.confirm("Would you like to remove this item?");
                    if (qtyVal == true)
                    {


                            let token = window.localStorage.getItem('session-token');
                            const tokenHeader = { 'auth-token': token };
                            // Send to Server
                            var formattedDate = new Date(this.dataset.date + " 01:00:00");
                            var newformattedDate = ("0" + (formattedDate.getMonth() + 1)).slice(-2) + "/" +("0" + (formattedDate.getDate())).slice(-2) + "/" + formattedDate.getFullYear();
                            var newDtTime = ("0" + (formattedDate.getMonth() + 1)).slice(-2) + "/" +("0" + (formattedDate.getDate())).slice(-2) + "/" + formattedDate.getFullYear() + " 01:01:01" ;
                            var bformattedDate = new Date(newDtTime);
                            axios.post('https://nutrition-heroku.herokuapp.com//removeFood',
                            {
                                _id: this.dataset.id

                            },
                            {
                                headers: tokenHeader
                            })
                            .then(response => {
                                console.log(response.data);
                                console.log(newDtTime);
                                        // Get Deficiencies & set onto progressbars
                                axios.post('https://nutrition-heroku.herokuapp.com//getDeficiencies',
                                {
                                    date: newformattedDate
                                },
                                {
                                    headers: tokenHeader
                                })
                                .then(response => {
                                    console.log(response.data);
                                    this.setState({
                                        ene: response.data.energy.toFixed(2) * 100,
                                        tfat : response.data.totalFat.toFixed(2) * 100,
                                        sat : response.data.saturates.toFixed(2) * 100,
                                        carbo : response.data.carbs.toFixed(2) * 100,
                                        tsugars : response.data.totalSugars.toFixed(2) * 100,
                                        prot : response.data.protein.toFixed(2) * 100,
                                        sodium : response.data.salt.toFixed(2) * 100,
                                    });
                                })
                                .catch(error => {
                                    console.log(error.response);
                                });
                            })
                            .catch(error => {
                                console.log(error.response);
                            })

                    }

                })
                food_act_el.append(foodItem);
            }

        })
        .catch(error => {
            console.log(error.response)
        });
    }

    handleSearchSubmit = e => {
        e.preventDefault();
        var listItems = document.getElementById("list_items");
        listItems.style.display = "inline-block";

        // Food Search API
        axios.post('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=Uh00f59beCTOVOkHQvLjpO98kW6OL8aua0eiTqol&query='
        + [this.state.foodquery], {
            query: this.state.foodquery,
            apikey: null,
        })
        .then(response => {

            console.log(response.data)
            if (response.data.foods.length > 0)
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

                for (var i = 0; i < response.data.foods.length; i++)
                {

                    var foodItem = document.createElement("div");
                    foodItem.className = "food_item";
                    foodItem.setAttribute('data-foodID' , response.data.foods[i].fdcId);
                    foodItem.setAttribute('data-foodname' , response.data.foods[i].description);
                    foodItem.setAttribute('data-date' , this.state.date);
                    for (var j = 0; j < response.data.foods[i].foodNutrients.length; j++)
                    {
                            // Energy
                            if (response.data.foods[i].foodNutrients[j].nutrientId == '1008')
                            {
                                foodItem.setAttribute('data-nutrition_energy' , response.data.foods[i].foodNutrients[j].value);
                            }
                            // Total Fat
                            if (response.data.foods[i].foodNutrients[j].nutrientId == '1004')
                            {
                                foodItem.setAttribute('data-nutrition_totalfat' , response.data.foods[i].foodNutrients[j].value);
                            }
                            // Saturates
                            if (response.data.foods[i].foodNutrients[j].nutrientId == '1258')
                            {
                                foodItem.setAttribute('data-nutrition_saturates' , response.data.foods[i].foodNutrients[j].value);
                            }
                            // Carbohydrates
                            if (response.data.foods[i].foodNutrients[j].nutrientId == '1005')
                            {
                              foodItem.setAttribute('data-nutrition_carbs' , response.data.foods[i].foodNutrients[j].value);
                            }
                            // Total Sugars
                            if (response.data.foods[i].foodNutrients[j].nutrientId == '2000')
                            {
                               foodItem.setAttribute('data-nutrition_sugar' , response.data.foods[i].foodNutrients[j].value);
                            }
                            // Protein
                            if (response.data.foods[i].foodNutrients[j].nutrientId == '1003')
                            {
                                foodItem.setAttribute('data-nutrition_protein' , response.data.foods[i].foodNutrients[j].value);
                            }
                            // Sodium
                            if (response.data.foods[i].foodNutrients[j].nutrientId == '1093')
                            {
                               foodItem.setAttribute('data-nutrition_salt' , response.data.foods[i].foodNutrients[j].value);
                            }
                    }

                    if (response.data.foods[i].dataType == "Branded")
                    {
                        foodItem.innerHTML += "<div class='brand_title'>" + '<svg class="MuiSvgIcon-root addActbtn" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg> ' + response.data.foods[i].brandOwner + "</div>";
                        foodItem.innerHTML += "<div class='item_descr'>" + response.data.foods[i].description + "</div>";
                    }
                    else
                    {
                         foodItem.innerHTML += "<div class='item_descr'>" + '<svg class="MuiSvgIcon-root addActbtn" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg> ' + response.data.foods[i].description + "</div>";
                    }

                    foodItem.innerHTML += "</div>";
                    foodItem.addEventListener("click",function()
                    {
                        var qtyVal = prompt("How many " + this.dataset.foodname + " would you like to add?");
                        if (qtyVal === "")
                        {

                        }
                        else if (qtyVal)
                        {
                            if (parseInt(qtyVal) > 0)
                            {

                                alert("Added " + qtyVal + " " + this.dataset.foodname + " to your daily intake!");
                                let token = window.localStorage.getItem('session-token');
                                const tokenHeader = { 'auth-token': token };
                                // Send to Server
                                var formattedDate = new Date(this.dataset.date + " 01:00:00");
                                var newformattedDate = ("0" + (formattedDate.getMonth() + 1)).slice(-2) + "/" +("0" + (formattedDate.getDate())).slice(-2) + "/" + formattedDate.getFullYear();
                                var newDtTime = ("0" + (formattedDate.getMonth() + 1)).slice(-2) + "/" +("0" + (formattedDate.getDate())).slice(-2) + "/" + formattedDate.getFullYear() + " 01:01:01" ;
                                var food_act_el = document.getElementById("food_activity");
                                var bformattedDate = new Date(newDtTime);
                                axios.post('https://nutrition-heroku.herokuapp.com//addFood',
                                {
                                    foodId: this.dataset.foodid,
                                    energy: this.dataset.nutrition_energy,
                                    totalFat: this.dataset.nutrition_totalfat,
                                    saturates: this.dataset.nutrition_saturates,
                                    carbs: this.dataset.nutrition_carbs,
                                    totalSugars: this.dataset.nutrition_sugar,
                                    protein: this.dataset.nutrition_protein,
                                    salt: this.dataset.nutrition_salt,
                                    date: newDtTime.toString(),
                                    name: this.dataset.foodname,
                                    quantity: qtyVal

                                },
                                {
                                    headers: tokenHeader
                                })
                                .then(response => {
                                    console.log(response.data);
                                    console.log(newDtTime);
                                            // Get Deficiencies & set onto progressbars
                                    axios.post('https://nutrition-heroku.herokuapp.com//getDeficiencies',
                                    {
                                        date: newformattedDate
                                    },{
                                        headers: tokenHeader
                                    })
                                    .then(response => {
                                        console.log(response.data);
                                        this.setState({
                                            ene: response.data.energy.toFixed(2) * 100,
                                            tfat : response.data.totalFat.toFixed(2) * 100,
                                            sat : response.data.saturates.toFixed(2) * 100,
                                            carbo : response.data.carbs.toFixed(2) * 100,
                                            tsugars : response.data.totalSugars.toFixed(2) * 100,
                                            prot : response.data.protein.toFixed(2) * 100,
                                            sodium : response.data.salt.toFixed(2) * 100,
                                        });
                                    })
                                    .catch(error => {
                                        console.log(error.response);
                                    });

                                          // Get Food Activity
        axios.post('https://nutrition-heroku.herokuapp.com//getFoods',
        {
            date: newformattedDate
        },
        {
            headers: tokenHeader
        })
        .then(response => {
            console.log(response.data);
            var food_act_el = document.getElementById("food_activity");
            food_act_el.innerHTML = "";
            for(var i = 0; i < response.data.length; i++)
            {
                var foodItem = document.createElement("div");
                foodItem.className= "fooditem";
                foodItem.setAttribute('data-id' , response.data[i]._id);
                foodItem.innerHTML += "<span class='food_title'>("+response.data[i].quantity+") "+ response.data[i].name +"<div class='removeFood'>"+'<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></svg>'+" </div></span><br><div class='food_cat'><span class='cat_title'>Calories</span><br>"+response.data[i].energy+"</div><div class='food_cat'><span class='cat_title'>Total Fat</span><br>"+response.data[i].totalFat+"</div><div class='food_cat'><span class='cat_title'>Saturates</span><br>"+response.data[i].saturates+"</div><div class='food_cat'><span class='cat_title'>Carbs</span><br>"+response.data[i].carbs+"</div><div class='food_cat'><span class='cat_title'>Sugar</span><br>"+response.data[i].totalSugars+"</div><div class='food_cat'><span class='cat_title'>Protein</span><br>"+response.data[i].protein+"</div><div class='food_cat'><span class='cat_title'>Sodium</span><br>"+response.data[i].salt+"</div>";

                foodItem.addEventListener("click",function(){
                    var qtyVal = window.confirm("Would you like to remove this item?");
                    if (qtyVal == true)
                    {


                            let token = window.localStorage.getItem('session-token');
                            const tokenHeader = { 'auth-token': token };
                            // Send to Server
                            var formattedDate = new Date(this.dataset.date + " 01:00:00");
                            var newformattedDate = ("0" + (formattedDate.getMonth() + 1)).slice(-2) + "/" +("0" + (formattedDate.getDate())).slice(-2) + "/" + formattedDate.getFullYear();
                            var newDtTime = ("0" + (formattedDate.getMonth() + 1)).slice(-2) + "/" +("0" + (formattedDate.getDate())).slice(-2) + "/" + formattedDate.getFullYear() + " 01:01:01" ;

                            var bformattedDate = new Date(newDtTime);
                            axios.post('https://nutrition-heroku.herokuapp.com//removeFood',
                            {
                                _id: this.dataset.id

                            },
                            {
                                headers: tokenHeader
                            })
                            .then(response => {
                                console.log(response.data);
                                console.log(newDtTime);
                                        // Get Deficiencies & set onto progressbars
                                axios.post('https://nutrition-heroku.herokuapp.com//getDeficiencies',
                                {
                                    date: newformattedDate
                                },
                                {
                                    headers: tokenHeader
                                })
                                .then(response => {
                                    console.log(response.data);
                                    this.setState({
                                        ene: response.data.energy.toFixed(2) * 100,
                                        tfat : response.data.totalFat.toFixed(2) * 100,
                                        sat : response.data.saturates.toFixed(2) * 100,
                                        carbo : response.data.carbs.toFixed(2) * 100,
                                        tsugars : response.data.totalSugars.toFixed(2) * 100,
                                        prot : response.data.protein.toFixed(2) * 100,
                                        sodium : response.data.salt.toFixed(2) * 100,
                                    });
                                })
                                .catch(error => {
                                    console.log(error.response);
                                });
                            })
                            .catch(error => {
                                console.log(error.response);
                            })

                    }

                })
                food_act_el.append(foodItem);
            }

        })
        .catch(error => {
            console.log(error.response)
        });

                                })
                                .catch(error => {
                                    console.log(error.response);
                                })
                            }
                        }
                        else
                        {

                        }

                    });
                    selectDropdown.appendChild(foodItem);
                }
            }
            else
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
    handleChange2 = e => {
        e.preventDefault();
        let token = window.localStorage.getItem('session-token');
        const tokenHeader = { 'auth-token': token };

        this.setState ({date: e.target.value});
        var listItems = document.getElementById("list_items");

        this.state.foodquery = "";
        listItems.innerHTML = "";
        listItems.style.display = "none";
        var formattedDate = new Date(e.target.value + " 00:00:00");
        var newformattedDate = ("0" + (formattedDate.getMonth() + 1)).slice(-2) + "/" +("0" + (formattedDate.getDate())).slice(-2) + "/" + formattedDate.getFullYear();

        var food_act_el = document.getElementById("food_activity");
        console.log(newformattedDate.toString());
        console.log(formattedDate);
        // Get Deficiencies & set onto progressbars
        axios.post('https://nutrition-heroku.herokuapp.com//getDeficiencies',
        {
            date: newformattedDate
        },{
            headers: tokenHeader
        })
        .then(response => {
            console.log(response.data);
            this.setState({
                ene: response.data.energy.toFixed(2) * 100,
                tfat : response.data.totalFat.toFixed(2) * 100,
                sat : response.data.saturates.toFixed(2) * 100,
                carbo : response.data.carbs.toFixed(2) * 100,
                tsugars : response.data.totalSugars.toFixed(2) * 100,
                prot : response.data.protein.toFixed(2) * 100,
                sodium : response.data.salt.toFixed(2) * 100,
            });
            //console.log((response.data.energy).toFixed(2));
        })
        .catch(error => {
            console.log(error.response)
        });

        // Get Food Activity
        axios.post('https://nutrition-heroku.herokuapp.com//getFoods',
        {
            date: newformattedDate
        },
        {
            headers: tokenHeader
        })
        .then(response => {
            console.log(response.data);
            var food_act_el = document.getElementById("food_activity");
            food_act_el.innerHTML = "";
            for(var i = 0; i < response.data.length; i++)
            {
                var foodItem = document.createElement("div");
                foodItem.className= "fooditem";
                foodItem.setAttribute('data-id' , response.data[i]._id);
                foodItem.innerHTML += "<span class='food_title'>("+response.data[i].quantity+") "+ response.data[i].name +"<div class='removeFood'>"+'<svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></svg>'+" </div></span><br><div class='food_cat'><span class='cat_title'>Calories</span><br>"+response.data[i].energy+"</div><div class='food_cat'><span class='cat_title'>Total Fat</span><br>"+response.data[i].totalFat+"</div><div class='food_cat'><span class='cat_title'>Saturates</span><br>"+response.data[i].saturates+"</div><div class='food_cat'><span class='cat_title'>Carbs</span><br>"+response.data[i].carbs+"</div><div class='food_cat'><span class='cat_title'>Sugar</span><br>"+response.data[i].totalSugars+"</div><div class='food_cat'><span class='cat_title'>Protein</span><br>"+response.data[i].protein+"</div><div class='food_cat'><span class='cat_title'>Sodium</span><br>"+response.data[i].salt+"</div>";

                foodItem.addEventListener("click",function(){
                    var qtyVal = window.confirm("Would you like to remove this item?");
                    if (qtyVal == true)
                    {


                            let token = window.localStorage.getItem('session-token');
                            const tokenHeader = { 'auth-token': token };
                            // Send to Server
                            var formattedDate = new Date(this.dataset.date + " 01:00:00");
                            var newformattedDate = ("0" + (formattedDate.getMonth() + 1)).slice(-2) + "/" +("0" + (formattedDate.getDate())).slice(-2) + "/" + formattedDate.getFullYear();
                            var newDtTime = ("0" + (formattedDate.getMonth() + 1)).slice(-2) + "/" +("0" + (formattedDate.getDate())).slice(-2) + "/" + formattedDate.getFullYear() + " 01:01:01" ;
                            var bformattedDate = new Date(newDtTime);
                            axios.post('https://nutrition-heroku.herokuapp.com//removeFood',
                            {
                                _id: this.dataset.id

                            },
                            {
                                headers: tokenHeader
                            })
                            .then(response => {
                                console.log(response.data);
                                console.log(newDtTime);
                                        // Get Deficiencies & set onto progressbars
                                axios.post('https://nutrition-heroku.herokuapp.com//getDeficiencies',
                                {
                                    date: newformattedDate
                                },
                                {
                                    headers: tokenHeader
                                })
                                .then(response => {
                                    console.log(response.data);
                                    this.setState({
                                        ene: response.data.energy.toFixed(2) * 100,
                                        tfat : response.data.totalFat.toFixed(2) * 100,
                                        sat : response.data.saturates.toFixed(2) * 100,
                                        carbo : response.data.carbs.toFixed(2) * 100,
                                        tsugars : response.data.totalSugars.toFixed(2) * 100,
                                        prot : response.data.protein.toFixed(2) * 100,
                                        sodium : response.data.salt.toFixed(2) * 100,
                                    });
                                })
                                .catch(error => {
                                    console.log(error.response);
                                });
                            })
                            .catch(error => {
                                console.log(error.response);
                            })

                    }

                })
                food_act_el.append(foodItem);
            }

        })
        .catch(error => {
            console.log(error.response)
        });
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
                    <div className="init-container">
                        <div className="square-container1" >

                            <h2 className="intake_header">Welcome Back {this.state.name} <Info className="refSheetbtn" onClick={this.showReference}></Info></h2>
                            <br></br>
                            <div className="left_side">
                                <input id="activityDate" type="date" className="intake_input" placeholder="Select Date" onChange={ this.handleChange2 } value={this.state.date}  />
                            </div>

                            <br></br>
                            <RemoveCircle></RemoveCircle>
                           <div class="grid-container1">
                                <div class="grid-item"> <CircularProgressbar value={this.state.ene} text={this.state.ene + "%"}></CircularProgressbar>  Energy</div>
                                <div class="grid-item"> <CircularProgressbar value={this.state.tfat} text={this.state.tfat + "%"}></CircularProgressbar>  Total Fat</div>
                                <div class="grid-item"> <CircularProgressbar value={this.state.sat} text={this.state.sat + "%"}></CircularProgressbar>  Saturates</div>
                                <div class="grid-item"> <CircularProgressbar value={this.state.carbo} text={this.state.carbo + "%"}></CircularProgressbar>  Carbohydrates</div>
                                <div class="grid-item"> <CircularProgressbar value={this.state.tsugars} text={this.state.tsugars + "%"}></CircularProgressbar>  Total Sugars</div>
                                <div class="grid-item"> <CircularProgressbar value={this.state.prot} text={this.state.prot + "%"}></CircularProgressbar>  Protein</div>
                                <div class="grid-item"> <CircularProgressbar value={this.state.sodium} text={this.state.sodium + "%"}></CircularProgressbar>  Salt</div>

                            </div>

                            <h3 className="center_text">Food Activity</h3>
                            <div className="right_side">

                            <div id="food_activity"></div>
                            <h4 className="intake_header center_text">Input Food</h4>
                            <input type="text" id="foodIntakeInput" className="intake_input center_text" placeholder="Input Food" value={this.state.foodquery} onChange={ this.handleChange } />
                            <br></br>
                            <button type="submit" className="input-food-button" onClick={this.handleSearchSubmit}>Search</button>
                            <br></br>
                            <br></br>
                            <div id="list_items"></div>
                            <br></br>
                            <br></br>

                            </div>
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
                    <p>Nutrition Manager Deluxe&trade;</p>
                </div>
            </div>
                    
        </div>
        )
    }
}

export default Daily;
