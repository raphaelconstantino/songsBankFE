import React, { Component } from 'react';

export default class FormSearch extends Component {
	render () {
		return (
            <form className="navbar-form navbar-right" role="search">
                <div className="form-group  is-empty">
                    <input type="text" className="form-control" placeholder="Search" />
                    <span className="material-input"></span>
                <span className="material-input"></span></div>
                <button type="submit" className="btn btn-white btn-round btn-just-icon">
                    <i className="material-icons">search</i><div className="ripple-container"></div>
                </button>
            </form>
		);
	}
}