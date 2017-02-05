import React, { Component } from 'react';
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import HttpService from '../../util/HttpService';

export default class DashboardBox extends Component {

	constructor () {
		super();
		this.state = { gendersCount : [], instrummentCount : []};
	}

	componentDidMount() {
		
		HttpService.get("v1/gendersCount")
			.then(response => this.setState({gendersCount : response}));

		HttpService.get("v1/instrummentCount")
			.then(response => this.setState({instrummentCount : response}));

	}

	fnConvertToPieGraphObj (obj, objName) {
		return obj.map((o, i) => { return {name : o[objName].name, y : o.total} });
	}

	fnConvertToBarGraphObj (obj, objName) {
		return obj.map((o, i) => { return {name : o[objName].name, data : [o.total]} });
	}

    render () {

		return (
			<div>
				<h2>Dashboard</h2>
				<div className="row">
					<div className="col-md-6">
						<PieChart data={this.fnConvertToPieGraphObj(this.state.gendersCount, 'genders')} name="Genders"></PieChart>
					</div>	
					<div className="col-md-6">
						<PieChart data={this.fnConvertToPieGraphObj(this.state.instrummentCount, 'instrumments')} name="Instrumments"></PieChart>
					</div>						
				</div>	
				
				<div className="row">
					<div className="col-md-6">
						<BarChart data={this.fnConvertToBarGraphObj(this.state.gendersCount, 'genders')} name="Genders"></BarChart>
					</div>	
				</div>	

	        </div>
		);
	}

}