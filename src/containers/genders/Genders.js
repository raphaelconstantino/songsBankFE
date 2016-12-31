import React, { Component } from 'react';
import GendersTable from './GendersTable';
import InsertDialog from './InsertDialog';
import BreadCrumb from '../../components/BreadCrumb';
import HttpService from '../../util/HttpService';

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
				<InsertDialog refreshTable={this.refreshTable}/>
				<div>
	                <GendersTable genders={this.state.genders} refreshTable={this.refreshTable} />    
	            </div>    
	        </div>
		);
	}

}
