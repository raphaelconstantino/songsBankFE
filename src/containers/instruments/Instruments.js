import React, { Component } from 'react';
import HttpService from '../../util/HttpService';
import InstrumentTable from './InstrumentTable';
import UpsertDialog from './UpsertDialog';
import BreadCrumb from '../../components/BreadCrumb';
import RaisedButton from 'material-ui/RaisedButton';

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
				<UpsertDialog refreshTable={this.refreshTable} button={ <RaisedButton label="Insert Instrument" primary={true}/> } />
				<div>
	                <InstrumentTable instrumments={this.state.instrumments} refreshTable={this.refreshTable} />    
	            </div>    
	        </div>
		);
	}

}
