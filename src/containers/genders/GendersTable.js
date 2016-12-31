import React, { Component } from 'react';
import HttpService from '../../util/HttpService';

export default class GendersTable extends Component {

	deleteGender (_id) {

    HttpService.del("v1/genders/" + _id)
      .then(response => this.props.refreshTable(response) ); 

	}

	render () {

		return (

      <div className="row">
          <div className="col-lg-12">
              <h2>Gender Table</h2>
              <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                      <thead>
                          <tr>
                              <th>Gender</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                         {
                            this.props.genders.map(function (gender) {
                              return (
                                <tr key={gender._id}>
                                  <td>{gender.name}</td>
                                  <td><button type="button" className="btn btn-danger btn-sm" onClick={this.deleteGender.bind(this, gender._id)} >Delete</button></td>
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

GendersTable.propTypes = {
    refreshTable : React.PropTypes.func.isRequired,
};