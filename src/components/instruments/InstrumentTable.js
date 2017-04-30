import React, { Component, PropTypes } from 'react';
import {TableHeaderColumn} from 'react-bootstrap-table';
import CustomTable from '../../components/CustomTable';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class InstrumentTable extends Component {

	static propTypes = {
		instrumments : PropTypes.array.isRequired
	}

	deleteInstrument (_id, name) {

		this.props.deleteInstruments("v1/instrumments/" + _id);

	}

	createButtons (cell, row, obj) {
		return (
			  <DropdownButton bsSize="small"  bsStyle={"primary"} title={"Actions"} key={0} id={`dropdown-basic-${0}`}>
				<MenuItem eventKey="1" onClick={this.deleteInstrument.bind(this, row._id, row.name)} >Delete</MenuItem>
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