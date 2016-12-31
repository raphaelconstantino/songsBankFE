import React, { Component } from 'react';
import HttpService from '../../util/HttpService';
import InsertDialog from './InsertDialog';
import InstrumentTable from './InstrumentTable';
import BreadCrumb from '../../components/BreadCrumb';

export default class GendersBox extends Component {
	
	constructor () {
		super();
		this.state = { instrumments : []};
		this.refreshTable = this.refreshTable.bind(this);
	}

	componentDidMount() {
		
		HttpService.get("v1/instrumments")
			.then(response => this.setState({instrumments : response}));
	} 

	refreshTable (response) {
		this.setState({instrumments : response});
	}	

	render () {
		return (
			<div>
				<BreadCrumb label="Instruments"/>
				<InsertDialog refreshTable={this.refreshTable}/>
				<div>
	                <InstrumentTable instrumments={this.state.instrumments} refreshTable={this.refreshTable} />    
	            </div>    
	        </div>
		);
	}

}
