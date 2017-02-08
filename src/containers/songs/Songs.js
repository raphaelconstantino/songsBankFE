import React, { Component } from 'react';
import HttpService from '../../util/HttpService';
import SongsTable from './SongsTable';
import SongsFilter from './SongsFilter';
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

	componentDidMount() {

		HttpService.get("v1/songs")
			.then(response => this.setState({songs : response}));

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
		console.log(this.state);
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
			<div>
				<h2>Songs</h2>	
				<div className="margin-vert">	
					<Link to="/insertSong"><RaisedButton label="Insert Song" primary={true} /></Link>
				</div>
				{this.fnCreateMessage()}	
				
				<div>
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
				
				<div>
	                <SongsTable 
		                songs={this.state.songs}
		                refreshTable={this.refreshTable} 
						setMsgSuccess={this.setMsgSuccess} />    
	            </div>    
	        </div>
		);
	}

}
