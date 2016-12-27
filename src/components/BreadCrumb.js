import React, { Component } from 'react';

export default class BreadCrumb extends Component {
	render () {
		return (
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">
                        {this.props.label}
                    </h1>
                    <ol className="breadcrumb">
                        <li>
                            <i className="fa fa-dashboard"></i>  <a href="index.html">Dashboard</a>
                        </li>
                        <li className="active">
                            <i className="fa fa-table"></i> {this.props.label}
                        </li>
                    </ol>
                </div>
            </div>
		);
	}
}