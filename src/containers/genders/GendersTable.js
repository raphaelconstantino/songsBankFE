import React, { Component } from 'react';
import {TableHeaderColumn} from 'react-bootstrap-table';
import CustomTable from '../../components/CustomTable';
import UpsertDialog from './UpsertDialog';
import HttpService from '../../util/HttpService';

export default class GendersTable extends Component {

	deleteGender (_id) {

    HttpService.del("v1/genders/" + _id)
      .then(response => this.props.refreshTable(response) ); 

	}

  createButtons (cell, row, obj) {
    return (<div className="btn-group">
              <UpsertDialog 
                refreshTable={this.props.refreshTable} 
                obj={row} 
                button={<button label="Edit" type="button" className="btn btn-info btn-sm">Edit</button>}/>
                <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteGender.bind(this, row._id)} >Delete</button>
            </div>)
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

GendersTable.propTypes = {
    refreshTable : React.PropTypes.func.isRequired,
    genders : React.PropTypes.array.isRequired
};