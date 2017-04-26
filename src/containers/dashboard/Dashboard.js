import React, { Component, PropTypes } from 'react';
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

	static propTypes = {
		dispatch: PropTypes.func,
	}

	constructor () {
		super();
		this.state = { gendersCount : [], instrummentCount : [], statusCount : [], topSongs : [], listPlayedByDate : []};
	}

	componentDidMount() {
		
		HttpService.get("v1/topPlayed")
			.then(response => this.setState({topSongs : response}));

		HttpService.get("v1/listPlayedByDate")
			.then(response => this.setState({listPlayedByDate : response}));

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

	fnCreateLearnedCardVal () {
		return (
			<h3 className="title">{this.fnTotalLearned() }/{ this.fnTotalSongs() }<small> songs</small></h3>
		)
	}

	fnCreateCountCardVal () {
		return (
			<h3 className="title">{this.state.listPlayedByDate} songs</h3>
		)
	}

	fnCreateCountDesc () {
		return (<div className="stats"><i className="material-icons">date_range</i> Last 30 Days</div>);
	}

    render () {
		const { dispatch } = this.props
		return (
			<div className="main-panel" id="page-wrapper">

				<TopNavBar dispatch={dispatch} title="Dashboard" url="/dashboard" />

				<Content>

					<div className="col-md-3">
						
							<DashboardCardStats 
								color="orange" 
								icon="content_copy" 
								title="Learned Songs" 
								text={this.fnCreateLearnedCardVal()} />

							<DashboardCardStats 
								color="green" 
								icon="assessment" 
								title="Played Songs" 
								text={this.fnCreateCountCardVal()} 
								desc={this.fnCreateCountDesc()} />								

					</div>

					<DashboardTopPlayed topSongs={this.state.topSongs} />
					
					<div className="row">
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
					</div>	

				</Content>

	        </div>
		);
	}

}