import React, { Component } from 'react';
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
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

	fnConvertToPieGraphObj () {
		return this.state.gendersCount.map((o, i) => { return {name : o._id, y : o.total} });
	}

	fnConvertToBarGraphObj () {
		return this.state.gendersCount.map((o, i) => { return {name : o._id, data : [o.total]} });
	}

    render () {

		return (
			<div>
				<h2>Dashboard</h2>
				<div className="col-md-6">
					<BarChart data={this.fnConvertToBarGraphObj()} name="Genders"></BarChart>
				</div>	
				<div className="col-md-4">
					<PieChart data={this.fnConvertToPieGraphObj()} name="Genders"></PieChart>
				</div>	
	        </div>
		);
	}

}