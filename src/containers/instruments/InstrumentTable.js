import React, { Component, PropTypes } from 'react';
import {TableHeaderColumn} from 'react-bootstrap-table';
import CustomTable from '../../components/CustomTable';
import HttpService from '../../util/HttpService';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class InstrumentTable extends Component {

	static propTypes = {
		refreshTable : PropTypes.func.isRequired,
		instrumments : PropTypes.array.isRequired
	}

	deleteInstrument (_id) {

		HttpService.del("v1/instrumments/" + _id)
		  .then(response => this.props.refreshTable(response) ); 

	}

	createButtons (cell, row, obj) {
		return (
			  <DropdownButton bsStyle={"primary"} title={"Actions"} key={0} id={`dropdown-basic-${0}`}>
					 <MenuItem eventKey="1" onClick={this.deleteInstrument.bind(this, row._id)} >Delete</MenuItem>
				</DropdownButton>	
			);  
	}  

	render () {

	    return (
	      <CustomTable list={this.props.instrumments}>
	        <TableHeaderColumn dataField='name'>Gender Name</TableHeaderColumn>
	        <TableHeaderColumn dataFormat={this.createButtons.bind(this)}></TableHeaderColumn>
	      </CustomTable>    
	    );


	}

}