import React, { Component } from 'react';
import NavLink from './NavLink.js';

export default class Menu extends Component {

  constructor () {
		super();
		this.state = { text : "Dashboard", icon : "dashboard" };
    this.clickMenu = this.clickMenu.bind(this);
	}

	clickMenu = (text, icon) => {
     return function () {
      this.setState({text: text, icon : icon});
     }.bind(this)
	};  

  render() {
    
    return (
      <div className="sidebar" data-color="blue" data-image="../img/sidebar-1.jpg">

        <div className="logo">
          <a href="/" className="simple-text">
            Songs Bank
          </a>
        </div>

        <div className="sidebar-wrapper">
          <div className="nav-container">
            <ul className="nav">
                <NavLink onClick={this.clickMenu("Dashboard", "dashboard")} to="/dashboard">
                  <i className="material-icons">dashboard</i> <p>Dashboard</p>
                </NavLink>
                <NavLink onClick={this.clickMenu("Songs", "music_note")} to="/songs">
                  <i className="material-icons">music_note</i> <p>Songs</p>
                </NavLink>
                <NavLink onClick={this.clickMenu("Genders", "style")} to="/genders">                
                  <i className="material-icons">style</i><p>Genders</p>
                </NavLink>
                <NavLink onClick={this.clickMenu("Instruments", "content_paste")}  to="/instruments">                
                  <i className="material-icons">content_paste</i><p>Instruments</p>
                </NavLink>
            </ul>
            
            <div className={"moving-tab moving-" + this.state.text} >
                <i className="material-icons">{this.state.icon}</i>
                <p>{this.state.text}</p>
            </div>  

          </div>         

        </div> 

        <div className="sidebar-background"></div>

      </div>
    );
  }
}