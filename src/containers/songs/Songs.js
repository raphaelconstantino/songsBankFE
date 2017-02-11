import React, { Component } from 'react';
import HttpService from '../../util/HttpService';
import SongsTable from './SongsTable';
import SongsFilter from './SongsFilter';
import TopNavBar from '../../components/TopNavBar';
import Card from '../../components/Card';
import CardHeader from '../../components/CardHeader';
import RaisedButton from 'material-ui/RaisedButton';
import { Alert } from 'react-bootstrap';
import SongsUtil from './SongsUtil';
import {Link} from 'react-router'

export default class SongsBox extends Component {
	
	constructor () {
		super();
		this.state = { songs : [], gendersList : [], genders : "", instrummentsList : [], instrumments : "",  complexityList : [], complexity : "", statusList : [], status : "", msgSuccess : ""};
		this.refreshTable = this.refreshTable.bind(this);
		this.setMsgSuccess = this.setMsgSuccess.bind(this);
		this.setField = this.setField.bind(this);
		this.reloadTable = this.reloadTable.bind(this);
	}

	setField (fieldName, e)
	{
		let field = {};
		field[fieldName] = e.target.value ;
		this.setState(field);
	}

	fetchSongsList (param = "") {
		
		HttpService.get("v1/songs" + param)
			.then(response => this.setState({songs : response}));
	}

	componentDidMount() {

		this.fetchSongsList();

		HttpService.get("v1/genders")
			.then(response => this.setState({gendersList : response}));

		HttpService.get("v1/instrumments")
			.then(response => this.setState({instrummentsList : response}));

		let listComplexity = [
			{_id : 1, name : "1"},
			{_id : 2, name : "2"},
			{_id : 3, name : "3"},
			{_id : 4, name : "4"},
			{_id : 5, name : "5"},
			{_id : 6, name : "6"},
			{_id : 7, name : "7"},
			{_id : 8, name : "8"},
			{_id : 9, name : "9"},
			{_id : 10, name : "10"}
		];

		this.setState({complexityList : listComplexity});

		this.setState({statusList : SongsUtil.getStatus()});

		this.setState({msgSuccess : this.props.location.query.songName});
	} 

	reloadTable () {
		
		var query = "?";
		
		if (this.state.status)
		{
			query += "status=" + this.state.status + "&";
		}		

		if (this.state.genders)
		{
			query += "genders=" + this.state.genders + "&";
		}		
		
		if (this.state.instrumments)
		{
			query += "instrumments=" + this.state.instrumments + "&";
		}		
	
		if (this.state.complexity)
		{
			query += "complexity=" + this.state.complexity + "&";
		}		

		this.fetchSongsList(query);
	}

	refreshTable (response) {
		this.setState({songs : response});
	}

	setMsgSuccess (val) {
		this.setState({msgSuccess : val});
	}

	fnCreateMessage () {
		if (this.state.msgSuccess)
		{	
			return (<Alert bsStyle="success">
				{this.state.msgSuccess}
			</Alert>);
		}

		return "";	
		
	}

	render () {

		return (
			<div className="main-panel" id="page-wrapper">
				
				<TopNavBar title="Songs List" url="/songs" />

				<Card>
					
					<CardHeader title="Songs Table" category="All songs list" />

					<div className="card-content table-responsive">

						<div className="margin-vert">	
							<Link to="/insertSong"><RaisedButton label="Insert Song" primary={true} /></Link>
						</div>
						
						{this.fnCreateMessage()}

						<SongsFilter 
							instrummentsList={this.state.instrummentsList} 
							instrumments={this.state.instrumments} 
							gendersList={this.state.gendersList} 
							genders={this.state.genders} 
							statusList={this.state.statusList}
							status={this.state.status}
							complexityList={this.state.complexityList}
							complexity={this.state.complexity} 
							setField={this.setField} 
							reloadTable={this.reloadTable} />
					</div>	

					<SongsTable 
						songs={this.state.songs}
						refreshTable={this.refreshTable} 
						setMsgSuccess={this.setMsgSuccess} />  

				</Card>	

	        </div>
		);
	}

}
