import React, { Component, PropTypes } from 'react';
import InstrumentForm from './InstrumentForm';
import CustomDialog from '../../components/CustomDialog';
import HttpService from '../../util/HttpService';

export default class UpsertDialog extends Component {
	
	constructor () {
		super();
		this.state = { name : "", errorMsg : {} };

		this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);
		this.setName = this.setName.bind(this);

	}
	
	static propTypes = {
		refreshTable : PropTypes.func.isRequired,
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

		if (this.props.obj)
		{
		    HttpService.put("v1/instrumments/" + this.props.obj._id, oData)
		      .then(response => {
					this.props.refreshTable(response);
					this.setState({ name : "", errorMsg : {} });
				}); 
		} else
		{
			HttpService.post("v1/instrumments", oData)
				.then(response => {
					this.props.refreshTable(response);
					this.setState({ name : "", errorMsg : {} });
				});		
		}		

		return true;

	}

	setName(evento) {
		this.setState({name:evento.target.value});
	}  

	render() {
		return (
			<CustomDialog title="Insert Instrument" sendData={this.sendData} button={this.props.button}>
				 <InstrumentForm refreshTable={this.props.refreshTable} name={this.state.name} setName={this.setName} errorMsg={this.state.errorMsg} />
			</CustomDialog>			
		
	    );
	}

}	