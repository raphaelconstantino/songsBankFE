import React, { Component, PropTypes } from 'react';
import GendersForm from './GendersForm';
import CustomDialog from '../CustomDialog';
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
		setMsgSuccess : PropTypes.func.isRequired,
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

		if (this.props.obj)
		{
		    HttpService.put("v1/genders/" + this.props.obj._id, oData)
		      .then(response => {
					this.props.setMsgSuccess(`Gender ${oData.name} updated succesfully.`);
					this.props.refreshTable(response);
					this.setState({ name : "", errorMsg : {} });
				}); 
		} else
		{
			HttpService.post("v1/genders", oData)
				.then(response => {
					this.props.setMsgSuccess(`Gender ${oData.name} added succesfully.`);
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
			<CustomDialog title="Insert Gender" sendData={this.sendData} button={this.props.button}>
				 <GendersForm refreshTable={this.props.refreshTable} name={this.state.name} setName={this.setName} errorMsg={this.state.errorMsg} />
			</CustomDialog>
	    );
	}
}