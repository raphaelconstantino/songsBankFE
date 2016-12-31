import React, { Component } from 'react';
import HttpService from '../../util/HttpService';

export default class InstrumentTable extends Component {

	deleteInstrument (_id) {

    HttpService.del("v1/instrumments/" + _id)
      .then(response => this.props.refreshTable(response) ); 

	}

	render () {

		return (

                <div className="row">
                    <div className="col-lg-12">
                        <h2>Instruments Table</h2>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Instrument</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {
                                      this.props.instrumments.map(function (instrument) {
                                        return (
                                          <tr key={instrument._id}>
                                            <td>{instrument.name}</td>
                                            <td><button type="button" className="btn btn-danger btn-sm" onClick={this.deleteInstrument.bind(this, instrument._id)} >Delete</button></td>
                                          </tr>
                                        );
                                      }.bind(this))
                                   }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>		

		);

	}

}

InstrumentTable.propTypes = {
    refreshTable : React.PropTypes.func.isRequired,
};