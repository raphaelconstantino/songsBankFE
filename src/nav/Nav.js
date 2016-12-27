import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Nav extends Component {

	render () {
		
		return (

	      <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
	      
	            <div className="navbar-header">
	                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
	                    <span className="sr-only">Toggle navigation</span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                    <span className="icon-bar"></span>
	                </button>
	                <Link className="navbar-brand" to="/">Songs Bank</Link>
	            </div>
	            
	            <div className="collapse navbar-collapse navbar-ex1-collapse">
	                <ul className="nav navbar-nav side-nav">
	                    
	                    <li className="active">
	                        <Link to="/dashboard"><i className="fa fa-fw fa-table"></i> Dashboard</Link>
	                        <Link to="/songs"><i className="fa fa-fw fa-table"></i> Songs</Link>
	                        <Link to="/genders"><i className="fa fa-fw fa-table"></i> Genders</Link>
	                        <Link to="/instruments"><i className="fa fa-fw fa-table"></i> Instruments</Link>
	                    </li>
	                    
	                    
	                </ul>
	            </div>
	           
	        </nav>

		);
	}

}