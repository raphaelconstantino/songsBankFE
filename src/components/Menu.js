import React, { Component } from 'react';
import NavLink from './NavLink.js';

export default class Menu extends Component {

  render() {
    
    return (
      <div className="sidebar" data-color="blue" data-image="../img/sidebar-1.jpg">

        <div className="logo">
          <a href="/" className="simple-text">
            Songs Bank
          </a>
        </div>

        <div className="sidebar-wrapper">
          <ul className="nav">
              <NavLink to="/dashboard">
                <i className="material-icons">dashboard</i> <p>Dashboard</p>
              </NavLink>
              <NavLink to="/songs">
                <i className="material-icons">dashboard</i> <p>Songs</p>
              </NavLink>
              <NavLink to="/genders">                
                <i className="material-icons">dashboard</i><p>Genders</p>
              </NavLink>
              <NavLink to="/instruments">                
                <i className="material-icons">dashboard</i><p>Instruments</p>
              </NavLink>
          </ul>
        </div> 

        <div className="sidebar-background"></div>

      </div>
    );
  }
}