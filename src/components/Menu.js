import React, { Component } from 'react';
import NavLink from './header/NavLink.js';

export default class Menu extends Component {

  constructor () {
		super();
		this.state = { text : "Dashboard", icon : "dashboard" };
    this.clickMenu = this.clickMenu.bind(this);
	}

	clickMenu = (pathName) => {
     return function () {
        this.mapIcons(pathName);
     }.bind(this)
	};

  mapIcons (pathName) {
    if (pathName === "dashboard")
    {
      this.setState({text: "Dashboard", icon : "dashboard"});
    }

    if (pathName === "songs")
    {
      this.setState({text: "Songs", icon : "music_note"});
    }

    if (pathName === "genders")
    {
      this.setState({text: "Genders", icon : "style"});
    }
 
    if (pathName === "instruments")
    {
      this.setState({text: "Instruments", icon : "content_paste"});
    }
  }

  componentWillMount () {
    var pathName = this.props.pathName.split("/");
    
    if (pathName.length < 1) {
      return;  
    }

    pathName = pathName[1];

    this.mapIcons(pathName);

  }
  

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
                <NavLink onClick={this.clickMenu("dashboard")} to="/dashboard">
                  <i className="material-icons">dashboard</i> <p>Dashboard</p>
                </NavLink>
                <NavLink onClick={this.clickMenu("songs")} to="/songs">
                  <i className="material-icons">music_note</i> <p>Songs</p>
                </NavLink>
                <NavLink onClick={this.clickMenu("genders")} to="/genders">                
                  <i className="material-icons">style</i><p>Genders</p>
                </NavLink>
                <NavLink onClick={this.clickMenu("instruments")}  to="/instruments">                
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