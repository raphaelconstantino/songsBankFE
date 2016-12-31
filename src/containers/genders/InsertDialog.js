import React, { Component } from 'react';
import GendersForm from './GendersForm';
import CustomDialog from '../../components/CustomDialog';
import HttpService from '../../util/HttpService';

export default class InsertDialog extends Component {
	
	constructor () {
		super();
		this.state = { name : "", errorMsg : {} };

		this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);
		this.setName = this.setName.bind(this);

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

		HttpService.post("v1/genders", {name:this.state.name})
			.then(response => {
				this.props.refreshTable(response);
				this.setState({ name : "", errorMsg : {} });
			});		

		return true;

	}

	setName(evento) {
		this.setState({name:evento.target.value});
	}  

	render() {
		return (
			<CustomDialog refreshTable={this.props.refreshTable} label="Insert Gender" sendData={this.sendData}>
				<GendersForm refreshTable={this.props.refreshTable} name={this.state.name} setName={this.setName} errorMsg={this.state.errorMsg} />
		    </CustomDialog>
	    );
	}
}

InsertDialog.propTypes = {
    refreshTable : React.PropTypes.func.isRequired,
};