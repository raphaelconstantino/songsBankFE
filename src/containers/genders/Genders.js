import React, { Component } from 'react';
import GendersTable from './GendersTable';
import UpsertDialog from './UpsertDialog';
import BreadCrumb from '../../components/BreadCrumb';
import HttpService from '../../util/HttpService';
import RaisedButton from 'material-ui/RaisedButton';

export default class GendersBox extends Component {
	
	constructor () {
		super();
		this.state = { genders : []};
		this.refreshTable = this.refreshTable.bind(this);
	}

	componentDidMount() {
		
		HttpService.get("v1/genders")
			.then(response => this.setState({genders : response}));

	} 

	refreshTable (response) {
		this.setState({genders : response});
	}

	render () {
		return (
			<div>
				<BreadCrumb label="Genders"/>
				<UpsertDialog refreshTable={this.refreshTable} button={ <RaisedButton label="Insert Gender" primary={true}/> }/>
				<div>
	                <GendersTable genders={this.state.genders} refreshTable={this.refreshTable} />    
	            </div>    
	        </div>
		);
	}

}
