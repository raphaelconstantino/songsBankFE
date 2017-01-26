import React, { Component, PropTypes } from 'react';
import {TableHeaderColumn} from 'react-bootstrap-table';
import CustomTable from '../../components/CustomTable';
import HttpService from '../../util/HttpService';
import UpsertDialog from './UpsertDialog';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class GendersTable extends Component {

	static propTypes = {
		refreshTable : PropTypes.func.isRequired,
		genders : PropTypes.array.isRequired
	}

	deleteGender (_id) {

		HttpService.del("v1/genders/" + _id)
		  .then(response => this.props.refreshTable(response) ); 

	}

	createButtons (cell, row, obj) {
		return (<DropdownButton bsStyle={"primary"} title={"Actions"} key={0} id={`dropdown-basic-${0}`}>
					<UpsertDialog 
						refreshTable={this.props.refreshTable} 
						obj={row} 
						button={<a role="menuitem" tabindex="-1" href="#">Edit</a>}/>
					<MenuItem eventKey="1" onClick={this.deleteGender.bind(this, row._id)} >Delete</MenuItem>
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