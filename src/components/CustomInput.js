import React, { Component } from 'react';

export default class CustomInput extends Component {

	render () {

		return (

            <div className="form-group">
                <label>{this.props.label}</label>
                <input type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.change} className="form-control" />
                <span>{this.props.error && this.props.error[this.props.name] ? this.props.error[this.props.name].msg : "" }</span>
            </div>

		);

	}

}	