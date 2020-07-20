import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Biometrics extends Component {
    
    constructor(props) {
        super(props);
        
    }

    state = {
        weight: "0",
        gender: "Choose Gender",
        feet: "0",
        inches: "0",
        buttonText: "0",
        BMI: "0",
        isInEditMode: false,
        buttonMode: false
    }
    changeEditMode = () => {
        this.setState({
            isInEditMode: !this.state.isInEditMode
        })
        console.log("This works");
        console.log("Weight:" + this.state.weight)
    }

    updateWeight = (e) => {
        this.setState({
            weight: e.target.value, 
        })  
    }

    updateGender = (e) => { 
        this.setState({
            gender: e.target.value,     
        })  
    }

    updateFeet = (e) => { 
        this.setState({
            feet: e.target.value,     
        })  
    }

    updateInches = (e) => { 
        this.setState({
            inches: e.target.value,     
        })  
    }

    updateBMI = (e) => { 
        this.setState({
            BMI: e.target.value,     
        })  
    }

    renderDefaultView = () => {
        return <div className="biogrid-container1">
        <h3>Weight: {this.state.weight} pounds</h3>
        <h3>Gender: {this.state.gender}</h3>
        <h3>Height: {this.state.feet} feet {this.state.inches} inches</h3>
        <h3>BMI: {this.state.BMI}</h3>
        </div>
        
    }

    renderEditView = () => {
        return <div class="biogrid-container1">
        <h3>Weight: 
        {
            this.state.isInEditMode 
            ? 
                <input type="text" onChange={this.updateWeight}/>
            : <div>
                {this.state.weight}
              </div>

        } pounds</h3>

        <h3>Gender:
        {
            this.state.isInEditMode
            ?
                <select name="genderChoice" onChange={this.updateGender}>
                    <option value="">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            
            : <div>
                {this.state.gender}
            </div>
        }

        </h3>

        <h3>Height:
        {
            this.state.isInEditMode
            ? 
                <input type="text" onChange={this.updateFeet}/>
            
            : <div className="feet">
                {this.state.feet};
            </div>
                
        }
        Feet 
        {
            this.state.isInEditMode
            ? 
                <input type="text" onChange={this.updateInches}/>
            
            : <div className="inches">
                {this.state.inches};
            </div>
                
        }
        Inches
        </h3>

        <h3>BMI: 
        {
            this.state.isInEditMode 
            ? 
                <input type="text" onChange={this.updateBMI} />
              
              
            : <div>
                {this.state.BMI}
              </div>

        } 
        </h3>
        <button type="button" class="saveStats" onClick={this.changeEditMode}>Save Changes</button>
        </div>
    }


    render() {

        return (
            <div className="page">
                <div className="nav-bar">

                    <Link to="/Main" >Overview</Link>
                    <Link to="#">Food</Link>
                    <Link to="/Biometrics" className="active">Biometrics</Link>
                    <Link to="/Settings">Settings</Link>
                    <div className="nav-right"><Link to="#">Log Out</Link></div>

                </div>
                <div className="highlight-bar"></div>
                    <div className="init-container">
                        <div className="bio-container1">
                            <h2>All Activity</h2>
                        </div>

                        <div className="bio-container2">
                        <h2>Your Statistics</h2>

                        {/* Will Contain Render Edits */}
                            <div class="biogrid-container1">
                                {
                                    this.state.isInEditMode 
                                    ? this.renderEditView()
                                    : this.renderDefaultView()

                                }
                            </div>

                            
                            <button type="button" class="changeStats" onClick={this.changeEditMode}>Make Changes</button>
                        </div>

                        <div className="bio-container3">
                            <h2>This Week's Activity</h2>
                        </div>     
                    </div>
            </div>







        )



    }
} 

export default Biometrics;
