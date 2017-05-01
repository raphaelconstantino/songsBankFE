import React, { Component, PropTypes } from 'react';
import HttpService from '../../util/HttpService';

export default class FormSearch extends Component {
	
    constructor () {
        super();
        this.state = { searchVal : "" };

    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    }    

    setSearchVal (e) {
        this.setState({searchVal : e.target.value})
    }

    fnSearch (e) {
        e.preventDefault();
        HttpService.get("v1/song/name/" + this.state.searchVal)
        .then((response) => {
            if (response.length)
            {
                this.context.router.push(`/songDetail?id=${response[0]._id}`);
            } else {
                this.context.router.push(`/songs?songName=Song ${this.state.searchVal} not found.`);
            } 
        });
        
    }
    
    render () {
		return (
            <form className="navbar-form navbar-right" role="search" onSubmit={this.fnSearch.bind(this)}>
                <div className="form-group  is-empty">
                    <input type="text" className="form-control" placeholder="Search" value={this.state.searchVal} onChange={this.setSearchVal.bind(this) }/>
                    <span className="material-input"></span>
                <span className="material-input"></span></div>
                <button type="submit" className="btn btn-white btn-round btn-just-icon">
                    <i className="material-icons">search</i><div className="ripple-container"></div>
                </button>
            </form>
		);
	}
}