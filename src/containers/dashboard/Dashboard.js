import React, { Component } from 'react';
import SongsUtil from '../songs/SongsUtil'
import PieChart from '../../components/PieChart'
//import BarChart from '../../components/BarChart'
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
									<h3 className="title">{this.fnTotalLearned() }/{ this.fnTotalSongs() }<small>songs</small></h3>
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
									<p className="category">Played Songs</p>
									<h3 className="title">231x</h3>
								</div>
								<div className="card-footer">
									<div className="stats">
										<i className="material-icons">date_range</i> Last 30 days
									</div>
								</div>
							</div>
					</div>

					<div className="col-md-9">
						<div className="card">
							<CardHeader title="Top Played" category="Most played Songs" color="blue"/>
							<table className="table table-hover">
                                <thead className="text-info">
                                    <tr>
                                        <th>Song</th>
                                        <th>Artist</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Love of My Life</td>
                                        <td>Queen</td>
                                        <td>Learned</td>
                                    </tr>
                                    <tr>
                                        <td>Let Her Go</td>
                                        <td>The Lumineers</td>
                                        <td>Learned</td>
                                    </tr>
                                    <tr>
                                        <td>Norwegean Woord</td>
                                        <td>The Beatles</td>
                                        <td>Learned</td>
                                    </tr>
                                    <tr>
                                        <td>Longe de Você</td>
                                        <td>Charlie Brown Jr.</td>
                                        <td>Learned</td>
                                    </tr>
                                    <tr>
                                        <td>New Slang</td>
                                        <td>The Shings</td>
                                        <td>Learning</td>
                                    </tr>
                                    <tr>
                                        <td>Quero ser Feliz Também</td>
                                        <td>Natiruts</td>
                                        <td>Learned</td>
                                    </tr>																																				                                   																	
                                </tbody>
                            </table>
						</div>	
					</div>	

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