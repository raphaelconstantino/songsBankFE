import React, { Component } from 'react';
import SongsUtil from '../songs/SongsUtil'
import DashboardTopPlayed from './DashboardTopPlayed'
import DashboardCardStats from './DashboardCardStats'
import PieChart from '../../components/PieChart'
//import BarChart from '../../components/BarChart'
import HttpService from '../../util/HttpService';
import TopNavBar from '../../components/TopNavBar';
import CardHeader from '../../components/CardHeader';
import Content from '../../components/Content';

export default class DashboardBox extends Component {

	constructor () {
		super();
		this.state = { gendersCount : [], instrummentCount : [], statusCount : [], topSongs : []};
	}

	componentDidMount() {
		
		HttpService.get("v1/topPlayed")
			.then(response => this.setState({topSongs : response}));

		HttpService.get("v1/statusCount")
			.then(response => this.setState({statusCount : response}));

		HttpService.get("v1/gendersCount")
			.then(response => this.setState({gendersCount : response}));

		HttpService.get("v1/instrummentCount")
			.then(response => this.setState({instrummentCount : response}));

	}

	fnTotalSongs () {
		return this.state.statusCount.reduce((a, b) => (a + b.count), 0 )
	}

	fnTotalLearned () {
		let arr = this.state.statusCount.filter((obj) => (obj._id === "2") )
		if (arr.length)
		{
			return arr[0].count;
		}

	}

	fnConvertToPieGraphObj (obj, objName) {
		return obj.map((o, i) => { return {name : o[objName].name, y : o.total} });
	}

	fnConvertToBarGraphObj (obj) {
		return obj.map((o, i) => { return {name : SongsUtil.getStatusLabel(o._id), y : o.count} });
	}

	fnCreateCardVal () {
		return (
			<h3 className="title">{this.fnTotalLearned() }/{ this.fnTotalSongs() }<small>songs</small></h3>
		)
	}

    render () {

		return (
			<div className="main-panel" id="page-wrapper">

				<TopNavBar title="Dashboard" url="/dashboard" />

				<Content>

					<div className="col-md-3">
						
							<DashboardCardStats 
								color="orange" 
								icon="content_copy" 
								title="Learned Songs" 
								text={this.fnCreateCardVal()} />

							<DashboardCardStats 
								color="green" 
								icon="store" 
								title="Played Songs" 
								text={(<h3 className="title">231x</h3>)} />								

					</div>

					<DashboardTopPlayed topSongs={this.state.topSongs} />

					<div className="col-md-4">
						<div className="card">	
							<CardHeader title="Status" category="Number of Status" color="purple"/>
							{/*<BarChart data={this.fnConvertToBarGraphObj(this.state.statusCount)} name="Status"></BarChart>*/}
							<PieChart data={this.fnConvertToBarGraphObj(this.state.statusCount)} name="Status"></PieChart>																	
						</div>	
					</div>

					<div className="col-md-4">
						<div className="card">
							<CardHeader title="Genders" category="Number of Genders" color="red"/>
							<PieChart data={this.fnConvertToPieGraphObj(this.state.gendersCount, 'genders')} name="Genders"></PieChart>																	
						</div>
					</div>

					<div className="col-md-4">
						<div className="card">
							<CardHeader title="Instruments" category="Number of Instruments" color="orange"/>
							<PieChart data={this.fnConvertToPieGraphObj(this.state.instrummentCount, 'instrumments')} name="Instrumments"></PieChart>
						</div>
					</div>

				</Content>

	        </div>
		);
	}

}