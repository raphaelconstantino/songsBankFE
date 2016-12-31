import React, { Component } from 'react';
import InstrumentForm from './InstrumentForm';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import HttpService from '../../util/HttpService';

export default class InsertDialog extends Component {
	
	constructor () {
		super();
		this.state = { name : "", open : false, errorMsg : {} };

		this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);
		this.setName = this.setName.bind(this);

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

	sendData () {

		if ( this.validate() )
		{
			return false;
		}

		HttpService.post("v1/instrumments", {name:this.state.name})
			.then(response => {
				this.props.refreshTable(response);
				this.setState({ name : "", errorMsg : {} });
			});	

		return true;

	}

	setName(evento) {
		this.setState({name:evento.target.value});
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
	        <RaisedButton label="Insert Instrument" primary={true} onTouchTap={this.handleOpen} />
	        <Dialog title="Insert Instrument" actions={actions} modal={false} open={this.state.open} >
				<InstrumentForm refreshTable={this.props.refreshTable} name={this.state.name} setName={this.setName} errorMsg={this.state.errorMsg} />
	        </Dialog>
	      </div>
	    );
	}
}	

InsertDialog.propTypes = {
    refreshTable : React.PropTypes.func.isRequired,
};