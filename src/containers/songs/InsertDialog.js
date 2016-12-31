import React, { Component } from 'react';
import SongsForm from './SongsForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import HttpService from '../../util/HttpService';

export default class InsertDialog extends Component {
	
	constructor () {
		super();
		this.state = { name : "", artist : "", status : "", complexity : "", genders: "", instrumments: "", description : "", open : false, errorMsg : {} };

		this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);
		this.setField = this.setField.bind(this);

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

		let oData = {name : this.state.name, description : this.state.description, lastReview : new Date(), artist : this.state.artist, status:this.state.status, complexity : this.state.complexity, genders : this.state.genders, instrumments : this.state.instrumments}

		HttpService.post("v1/songs", oData)
			.then(response => {
				this.props.refreshTable(response);
				this.setState({ name : "", errorMsg : {} });
			});				


		return true;

	}

	setField (fieldName, e)
	{
		let field = {};
		field[fieldName] = e.target.value ;
		this.setState(field);
	}


	handleOpen = () => {
		this.setState({open: true});
	};

	handleSubmit = () => {
		if (this.sendData())
		{
			this.setState({open: false});	
		}
		
	};

	handleCancel = () => {
		this.setState({open: false});	
	}

	render() {
	    const actions = [
	      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleCancel} />,
	      <FlatButton label="Submit" primary={true} keyboardFocused={true} onTouchTap={this.handleSubmit} />,
	    ];

	    return (
	      <div>
	        <RaisedButton label="Insert Song" primary={true} onTouchTap={this.handleOpen} />
	        <Dialog title="Insert Song" actions={actions} modal={false} open={this.state.open} autoScrollBodyContent={true}>
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
	        </Dialog>
	      </div>
	    );
	}
}

InsertDialog.propTypes = {
    refreshTable : React.PropTypes.func.isRequired,
    genders : React.PropTypes.array.isRequired,
    instrumments : React.PropTypes.array.isRequired,
    complexity : React.PropTypes.array.isRequired,
    status : React.PropTypes.array.isRequired,
};