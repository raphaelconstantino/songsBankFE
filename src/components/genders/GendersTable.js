import React, { Component, PropTypes } from 'react';
import {TableHeaderColumn} from 'react-bootstrap-table';
import CustomTable from '../CustomTable';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class GendersTable extends Component {

	static propTypes = {
		genders : PropTypes.array.isRequired,
		deleteGenders : PropTypes.func.isRequired
	}

	deleteGender (_id, name) {
		this.props.deleteGenders("v1/genders/" + _id);
	}

	createButtons (cell, row, obj) {
		return (<DropdownButton bsSize="small"  bsStyle={"primary"} title={"Actions"} key={0} id={`dropdown-basic-${0}`}>
					<MenuItem eventKey="1" onClick={this.deleteGender.bind(this, row._id, row.name)} >Delete</MenuItem>
				</DropdownButton>	
			)
	}

	render () {
		return (

	      <CustomTable list={this.props.genders}>
	        <TableHeaderColumn dataField='name'>Gender Name</TableHeaderColumn>
	        <TableHeaderColumn dataFormat={this.createButtons.bind(this)}></TableHeaderColumn>
	      </CustomTable>		

		);

	}

}	