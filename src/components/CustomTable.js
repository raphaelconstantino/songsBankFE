/*http://allenfang.github.io/react-bootstrap-table/*/

import React, { Component } from 'react';
import {BootstrapTable} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export default class CustomTable extends Component {

	render () {

		return (

      <div className="row">
          <div className="col-lg-12">
              <div className="table-responsive">
                <BootstrapTable data={this.props.list} keyField='_id' striped hover>
                  {this.props.children}
                </BootstrapTable>
              </div>
          </div>

      </div>		

		);

	}

}	

CustomTable.propTypes = {
    list : React.PropTypes.array.isRequired
};