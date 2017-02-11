import React, { Component } from 'react';
import SongsUtil from '../songs/SongsUtil'
import PieChart from '../../components/PieChart'
import BarChart from '../../components/BarChart'
import HttpService from '../../util/HttpService';
import TopNavBar from '../../components/TopNavBar';
import CardHeader from '../../components/CardHeader';
import Content from '../../components/Content';

export default class DashboardBox extends Component {

	constructor () {
		super();
		this.state = { gendersCount : [], instrummentCount : [], statusCount : []};
	}

	componentDidMount() {
		
		HttpService.get("v1/statusCount")
			.then(response => this.setState({statusCount : response}));

		HttpService.get("v1/gendersCount")
			.then(response => this.setState({gendersCount : response}));

		HttpService.get("v1/instrummentCount")
			.then(response => this.setState({instrummentCount : response}));

	}

	fnConvertToPieGraphObj (obj, objName) {
		return obj.map((o, i) => { return {name : o[objName].name, y : o.total} });
	}

	fnConvertToBarGraphObj (obj) {
		return obj.map((o, i) => { return {name : SongsUtil.getStatusLabel(o._id), data : [o.count]} });
	}

    render () {

		return (
			<div className="main-panel" id="page-wrapper">

				<TopNavBar title="Dashboard" url="/dashboard" />

				<Content>

					<div className="col-md-3">
						
						<div className="card card-stats">
								<div className="card-header" data-background-color="orange">
									<i className="material-icons">content_copy</i>
								</div>
								<div className="card-content">
									<p className="category">Learned Songs</p>
									<h3 className="title">35/50<small>songs</small></h3>
								</div>
								<div className="card-footer">
									<div className="stats">
										<i className="material-icons text-danger">warning</i> <a href="#pablo">Songs List</a>
									</div>
								</div>
							</div>

							<div className="card card-stats">
								<div className="card-header" data-background-color="green">
									<i className="material-icons">store</i>
								</div>
								<div className="card-content">
									<p className="category">Revenue</p>
									<h3 className="title">$34,245</h3>
								</div>
								<div className="card-footer">
									<div className="stats">
										<i className="material-icons">date_range</i> Last 24 Hours
									</div>
								</div>
							</div>
					</div>

					<div className="col-md-9">
						<div className="card">	
							<CardHeader title="Status" category="Number of Status" />
							<BarChart data={this.fnConvertToBarGraphObj(this.state.statusCount)} name="Status"></BarChart>
						</div>	
					</div>

					<div className="col-md-6">
						<div className="card">
							<CardHeader title="Genders" category="Number of Genders" />
							<PieChart data={this.fnConvertToPieGraphObj(this.state.gendersCount, 'genders')} name="Genders"></PieChart>																	
						</div>
					</div>

					<div className="col-md-6">
						<div className="card">
							<CardHeader title="Instruments" category="Number of Instruments" />
							<PieChart data={this.fnConvertToPieGraphObj(this.state.instrummentCount, 'instrumments')} name="Instrumments"></PieChart>
						</div>
					</div>

				</Content>

	        </div>
		);
	}

}