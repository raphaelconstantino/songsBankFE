import React, { Component } from 'react';
import HttpService from '../../util/HttpService';
import InstrumentTable from './InstrumentTable';
import UpsertDialog from './UpsertDialog';
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
				<h2>Instruments</h2>
				<div className="margin-vert">	
					<UpsertDialog refreshTable={this.refreshTable} button={ <RaisedButton label="Insert Instrument" primary={true}/> } />
				</div>	
				<div>
	                <InstrumentTable instrumments={this.state.instrumments} refreshTable={this.refreshTable} />    
	            </div>    
	        </div>
		);
	}

}
