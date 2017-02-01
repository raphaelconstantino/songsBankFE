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

	fnConvertToPieGraphObj (obj) {
		return this.state.gendersCount.map((o, i) => { return {name : o[obj].name, y : o.total} });
	}

	fnConvertToBarGraphObj (obj) {
		return this.state.gendersCount.map((o, i) => { return {name : o[obj].name, data : [o.total]} });
	}

    render () {

		return (
			<div>
				<h2>Dashboard</h2>
				<div className="col-md-6">
					<BarChart data={this.fnConvertToBarGraphObj('genders')} name="Genders"></BarChart>
				</div>	
				<div className="col-md-6">
					<PieChart data={this.fnConvertToPieGraphObj('genders')} name="Genders"></PieChart>
				</div>	
	        </div>
		);
	}

}