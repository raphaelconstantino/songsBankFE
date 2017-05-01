import React, { Component } from 'react';

export default class NavBarToggle extends Component {
	
    navToggle (e) {
        let bodyClass = document.querySelector('html').classList;
        if (bodyClass.contains("nav-open"))
        {
            bodyClass.remove("nav-open");
        } else {
            bodyClass.add("nav-open");
        }            
        
    }
    
    render () {
		return (
            <button onClick={this.navToggle} type="button" className="navbar-toggle" data-toggle="collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
		);
	}
}