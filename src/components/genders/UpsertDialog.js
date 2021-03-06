import React, { Component, PropTypes } from 'react';
import GendersForm from './GendersForm';
import CustomDialog from '../CustomDialog';

export default class UpsertDialog extends Component {
	
	constructor () {
		super();
		this.state = { name : "", errorMsg : {} };

		this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);
		this.setName = this.setName.bind(this);

	}

	static propTypes = {
		insertGender : PropTypes.func.isRequired,
		obj : PropTypes.object
	}
		
	
	validate () {

		let error = {};
		let bInvalid = false;
		
		if (this.state.name === "")
		{
			error.name = { msg : "Please insert a valid Song Name" };
			bInvalid = true;
		}
		
		this.setState({ errorMsg : error})

		return bInvalid;
	}

	sendData (e) {

		if ( this.validate() )
		{
			return false;
		}

		let oData = {name : this.state.name};

		this.props.insertGender("v1/genders", oData);

		return true;

	}

	setName(event) {
		this.setState({name:event.target.value});
	}
 

	render() {
		return (
			<CustomDialog title="Insert Gender" sendData={this.sendData} button={this.props.button}>
				 <GendersForm  name={this.state.name} setName={this.setName} errorMsg={this.state.errorMsg} />
			</CustomDialog>
	    );
	}
}