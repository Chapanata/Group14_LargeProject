import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showName: false,
            showEmail: false,
            showPass: false
        }
    }
    
    state = {
        weight: "0",
        gender: "Choose Gender",
        feet: "0",
        inches: "0",
        buttonText: "0",
        BMI: "0",
        isInEditMode: false,
        buttonMode: false,
        buttonText: false,
        
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
                <input className="bio-inputs" type="text" onChange={this.updateWeight}/>
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
                <input className="bio-inputs" type="text" onChange={this.updateFeet}/>
            
            : <div className="feet">
                {this.state.feet};
            </div>
                
        }
        Feet 
        {
            this.state.isInEditMode
            ? 
                <input className="bio-inputs" type="text" onChange={this.updateInches}/>
            
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
                <input className="bio-inputs" type="text" onChange={this.updateBMI} />
              
              
            : <div>
                {this.state.BMI}
              </div>

        } 
        </h3>
        <button type="button" class="saveStats" onClick={this.changeEditMode}>Save Changes</button>
        </div>
    }
    
    showNameFields() {
        this.setState({
            showName: true
        })
    }

    showEmailFields() {
        this.setState({
            showEmail: true
        })
    }

    showPassFields() {
        this.setState({
            showPass: true
        })
    }

    hideNameFields() {
        this.setState({
            showName: false
        })
    }

    hideEmailFields() {
        this.setState({
            showEmail: false
        })
    }

    hidePassFields() {
        this.setState({
            showPass: false
        })
    }

    render() {
        return(
        <div className="page">
            <div className="box">
                <div className="nav-bar">
                    <Link to="/Overview" >Overview</Link>
                    <Link to="/Dictionary">Food Dictionary</Link>
                    <Link to="/Daily">Daily Intake</Link>
                    <div className="nav-right">
                        <Link to="/Settings" className="active">Settings</Link>
                        <Link to="/Home">Log Out</Link>
                    </div>

                </div>
                <div className="highlight-bar"></div>

                    <div className = "inner-container"> 
                        <form id="my-settings">
                            <h1>Account Settings</h1>
                            <div className="name-box">
                                <h2>Change Name:</h2>
                                <button type="button" class="name" onClick={()=>this.showNameFields()}>Change</button>
                                {
                                    this.state.showName
                                    // If true show name field
                                    ?<div className="change-name">
                                        <input type="text" name="full-name" placeholder="Enter New Full Name" required></input>
                                        <input type="text" name="full-name" placeholder="Confirm Full Name" required></input>
                                        <button type="button" class="save" onClick={()=>this.hideNameFields()}>Save Changes</button>
                                    </div>
                                    // Else hide name field
                                    :null
                                }
                                
                            </div>

                            <div className="email-box">
                                <h2>Change E-Mail Address:</h2>
                                <button type="button" class="name" onClick={()=>this.showEmailFields()}>Change</button>
                                {
                                    this.state.showEmail
                                    // If true show email fields
                                    ?<div className="change-email">
                                        <input type="email" name="email" placeholder="Enter New E-Mail Address" required></input>
                                        <input type="email" name="email" placeholder="Confirm E-Mail Address" required></input>
                                        <button type="button" class="save" onClick={()=>this.hideEmailFields()}>Save Changes</button>
                                    </div>
                                    // Else hide email fields
                                    :null
                                }
                            </div>

                            <div className="pass-box">
                                <h2>Change Password:</h2>
                                <button type="button" class="name" onClick={()=>this.showPassFields()}>Change</button>
                                {
                                    this.state.showPass
                                    // If true show password fields
                                    ?<div className="change-pass">
                                        <input type="password" name="password" placeholder="Enter New Password" required></input>
                                        <input type="password" name="password" placeholder="Confirm Password" required></input>
                                        <button type="button" class="save" onClick={()=>this.hidePassFields()}>Save Changes</button>
                                    </div>
                                    // Else hide password fields
                                    :null
                                }
                            </div>
                        </form>
                    </div>  
            </div>

            <div className="user-stats">
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
        </div>
        )
    }
}

/*
{" "}
                                    {reactStringReplace(content, /(\d+)/g, (match, i) => ( <span key={i} style={{ color: 'red' }}>{match}</span>))}
                                    {" "}!*/
export default Settings;
