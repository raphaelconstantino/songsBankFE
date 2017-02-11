import React, { Component } from 'react';
import GendersTable from './GendersTable';
import UpsertDialog from './UpsertDialog';
import HttpService from '../../util/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import { Alert } from 'react-bootstrap';
import TopNavBar from '../../components/TopNavBar';
import Card from '../../components/Card';
import CardHeader from '../../components/CardHeader';

export default class GendersBox extends Component {
	
	constructor () {
		super();
		this.state = { genders : [], msgSuccess : ""};
		this.refreshTable = this.refreshTable.bind(this);
		this.setMsgSuccess = this.setMsgSuccess.bind(this);
	}

	componentDidMount() {
		
		HttpService.get("v1/genders")
			.then(response => this.setState({genders : response}));

	} 

	setMsgSuccess (val) {
		this.setState({msgSuccess : val});
	}

	refreshTable (response) {
		this.setState({genders : response});
	}

	fnCreateMessage () {
		if (this.state.msgSuccess)
		{	
			return (<Alert bsStyle="success">
				{this.state.msgSuccess}
			</Alert>);
		}

		return "";	
		
	}	

	render () {
		return (
			<div className="main-panel" id="page-wrapper">
				
				<TopNavBar title="Gender List" url="/genders"/>

				<Card>

					<CardHeader title="Genders List" category="List of genders" />

					<div className="card-content table-responsive">
						{this.fnCreateMessage()}	
						<div className="margin-vert">	
							<UpsertDialog refreshTable={this.refreshTable} button={ <RaisedButton label="Insert Gender" primary={true}/> } setMsgSuccess={this.setMsgSuccess}/>
						</div>	
						<div>
							<GendersTable genders={this.state.genders} refreshTable={this.refreshTable} setMsgSuccess={this.setMsgSuccess}/>    
						</div>    
					</div>	

				</Card>
	        </div>
		);
	}

}
