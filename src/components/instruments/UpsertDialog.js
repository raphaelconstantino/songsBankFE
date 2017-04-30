import React, { Component, PropTypes } from 'react';
import InstrumentForm from './InstrumentForm';
import CustomDialog from '../../components/CustomDialog';

export default class UpsertDialog extends Component {
	
	constructor () {
		super();
		this.state = { name : "", errorMsg : {} };

		this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);
		this.setName = this.setName.bind(this);

	}
	
	static propTypes = {
		insertIntrument : PropTypes.func.isRequired,
		obj : PropTypes.object
	}

	validate () {

		let error = {};
		let bInvalid = false;
		
		if (this.state.name === "")
		{
			error.name = { msg : "Please insert a valid Name" };
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

		this.props.insertIntrument("v1/instrumments", oData);

		return true;

	}

	setName(evento) {
		this.setState({name:evento.target.value});
	}  

	render() {
		return (
			<CustomDialog title="Insert Instrument" sendData={this.sendData} button={this.props.button}>
				 <InstrumentForm name={this.state.name} setName={this.setName} errorMsg={this.state.errorMsg} />
			</CustomDialog>				
	    );
	}

}	