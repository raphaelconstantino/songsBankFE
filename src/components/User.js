import React, { Component } from 'react';

export default class User extends Component {
	render () {
		return (
           <li className="">
                <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                <i className="material-icons">person</i>
                <p className="hidden-lg hidden-md">Profile</p>
                    <div className="ripple-container"></div>
                </a>
            </li>
		);
	}
}