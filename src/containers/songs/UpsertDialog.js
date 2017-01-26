import React, { Component, PropTypes } from 'react';
import SongsForm from './SongsForm';
import CustomDialog from '../../components/CustomDialog';
import HttpService from '../../util/HttpService';

export default class UpsertDialog extends Component {
	
	constructor () {
		super();
		this.state = { name : "", artist : "", status : "", complexity : "", genders: "", instrumments: "", description : "", errorMsg : {} };

		this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);
		this.setField = this.setField.bind(this);

	}
	
	static propTypes = {
		refreshTable : PropTypes.func.isRequired,
		genders : PropTypes.array.isRequired,
		instrumments : PropTypes.array.isRequired,
		complexity : PropTypes.array.isRequired,
		status : PropTypes.array.isRequired,
	}
	
	validate () {

		let error = {};
		let bInvalid = false;
		
		if (this.state.name === "")
		{
			error.name = { msg : "Please insert a valid Song Name" };
			bInvalid = true;
		}
		if (this.state.artist === "")
		{
			error.artist = { msg : "Please insert a valid Artist" };
			bInvalid = true;
		}
		if (this.state.status === "")
		{
			error.status = { msg : "Please insert a valid Status"} ;
			bInvalid = true;
		}

		this.setState({ errorMsg : error})

		return bInvalid;
	}

	sendData () {

		if ( this.validate() )
		{
			return false;
		}

		let oData = {name : this.state.name, description : this.state.description, artist : this.state.artist, status:this.state.status, complexity : this.state.complexity, genders : this.state.genders, instrumments : this.state.instrumments}

		if (this.props.obj)
		{
			oData.lastReview = this.state.lastReview;
		    HttpService.put("v1/songs/" + this.props.obj._id, oData)
		      .then(response => {
					this.props.refreshTable(response);
					this.setState({ name : "", artist : "", status : "", complexity : "", genders: "", instrumments: "", description : "", errorMsg : {} });
				}); 
		} else
		{
			oData.lastReview = new Date();
			HttpService.post("v1/songs", oData)
				.then(response => {
					this.props.refreshTable(response);
					this.setState({name : "", artist : "", status : "", complexity : "", genders: "", instrumments: "", description : "", errorMsg : {} });
				});
		}						


		return true;

	}

	setField (fieldName, e)
	{
		let field = {};
		field[fieldName] = e.target.value ;
		this.setState(field);
	}

	render() {
		return (
			<CustomDialog title="Insert Song" sendData={this.sendData} button={this.props.button}>
				<SongsForm 
					refreshTable={this.props.refreshTable} 
					name={this.state.name} 
					artist={this.state.artist}
					genders={this.state.genders}
					listGenders={this.props.genders}
					complexity={this.state.complexity} 
					listComplexity={this.props.complexity}
					status={this.state.status}
					listStatus={this.props.status}
					description={this.state.description}
					instrumments={this.state.instrumments}
					listInstrumments={this.props.instrumments}
					setField={this.setField} 
					errorMsg={this.state.errorMsg} />
			</CustomDialog>
	    );
	}	

}