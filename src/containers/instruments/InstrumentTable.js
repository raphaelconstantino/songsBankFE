import React, { Component } from 'react';
import {TableHeaderColumn} from 'react-bootstrap-table';
import CustomTable from '../../components/CustomTable';
import UpsertDialog from './UpsertDialog';
import HttpService from '../../util/HttpService';

export default class InstrumentTable extends Component {

	deleteInstrument (_id) {

    HttpService.del("v1/instrumments/" + _id)
      .then(response => this.props.refreshTable(response) ); 

	}

  createButtons (cell, row, obj) {
    return (<div>
              <UpsertDialog 
                refreshTable={this.props.refreshTable} 
                obj={row} 
                button={<button label="Edit" type="button" className="btn btn-info btn-sm">Edit</button>}/>
                <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteInstrument.bind(this, row._id)} >Delete</button>
            </div>);  
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

InstrumentTable.propTypes = {
    refreshTable : React.PropTypes.func.isRequired,
    instrumments : React.PropTypes.array.isRequired
};