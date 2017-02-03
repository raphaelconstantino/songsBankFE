import React, { Component } from 'react';
import HttpService from '../../util/HttpService';
import {Link} from 'react-router'

export default class SongDetailBox extends Component {

	constructor () {
		super();

        this.state = { song : {} };
    }

	componentDidMount() {

        if (this.props.location.query.id)
        {
		    HttpService.get("v1/songs/" + this.props.location.query.id)
			    .then(response => this.setState({ song : response }));
        }                
    }

    render () {

		return (
            <div className="row">

				<div className="margin-vert">	
					<Link to="/songs">Back to List</Link>
				</div>	

                <h2>{this.state.song.name}</h2>
                <h4>{this.state.song.artist}</h4>

            </div>    

		);
	}


}