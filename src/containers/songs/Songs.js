import React, { Component } from 'react';
import HttpService from '../../util/HttpService';
import SongsTable from './SongsTable';
import UpsertDialog from './UpsertDialog';
import BreadCrumb from '../../components/BreadCrumb';
import RaisedButton from 'material-ui/RaisedButton';

export default class SongsBox extends Component {
	
	constructor () {
		super();
		this.state = { songs : [], genders : [], instrumments : [], complexity : [], status : []};
		this.refreshTable = this.refreshTable.bind(this);
	}

	componentDidMount() {

		HttpService.get("v1/songs")
			.then(response => this.setState({songs : response}));

		HttpService.get("v1/genders")
			.then(response => this.setState({genders : response}));

		HttpService.get("v1/instrumments")
			.then(response => this.setState({instrumments : response}));

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

		this.setState({complexity : listComplexity});

		let listStatus = [
			{_id : "To Learn", name : "To Learn"},
			{_id : "Learning", name : "Learning"},
			{_id : "Learned", name : "Learned"}
		];

		this.setState({status : listStatus});
	} 

	refreshTable (response) {
		this.setState({songs : response});
	}

	render () {

		return (
			<div>
				<BreadCrumb label="Songs"/>
				<UpsertDialog 
					refreshTable={this.refreshTable} 
					instrumments={this.state.instrumments} 
					genders={this.state.genders} 
					status={this.state.status}
					complexity={this.state.complexity} 
					button={ <RaisedButton label="Insert Song" primary={true}/> } />
				<div>
	                <SongsTable 
		                songs={this.state.songs}
		                refreshTable={this.refreshTable} 
						instrumments={this.state.instrumments} 
						genders={this.state.genders} 
						status={this.state.status}
						complexity={this.state.complexity} />    
	            </div>    
	        </div>
		);
	}

}
