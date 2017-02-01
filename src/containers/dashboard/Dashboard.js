/* https://github.com/reactjs/react-chartjs */
import React, { Component } from 'react';
import {Pie} from 'react-chartjs';
import HttpService from '../../util/HttpService';

export default class DashboardBox extends Component {

	constructor () {
		super();
		this.state = { gendersCount : []};
	}

	componentDidMount() {
		
		HttpService.get("v1/gendersCount")
			.then(response => this.setState({gendersCount : response}));

	}

	fnConvertToGraphObj () {
		return this.state.gendersCount.map((o, i) => { return {label : o._id, value : o.total} });
	}

    render () {

		var data = this.fnConvertToGraphObj();


		return (
			<div>
				<h2>Dashboard</h2>
				<div className="col-md-3">
					<h3>Genders</h3>
					<Pie data={data} options={null} width="600" height="250"/>
				</div>
				<div className="col-md-3">
					<h3>Instrumments</h3>
					<Pie data={data} options={null} width="600" height="250"/>
				</div>
				<div className="col-md-3">
					<h3>Status</h3>
					<Pie data={data} options={null} width="600" height="250"/>
				</div>						
	        </div>
		);
	}

}