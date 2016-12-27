import React, { Component } from 'react';

export default class CustomSelect extends Component {

	render () {

		return (

			<div className="form-group">
			    <label>{this.props.label}</label>
			    <select value={this.props.value} className="form-control" name={this.props.name} onChange={this.props.change}>
			    	<option value="">Select</option>
			    	{
			    		this.props.list.map(function(obj) {
			    			return <option key={obj._id} value={obj._id}>{obj.name}</option>
			    		})

			    	}
			    </select>
			    <span></span>
			</div>

		);

	}

}				