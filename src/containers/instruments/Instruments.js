import React, { Component } from 'react';
import HttpService from '../../util/HttpService';
import InstrumentTable from './InstrumentTable';
import UpsertDialog from './UpsertDialog';
import RaisedButton from 'material-ui/RaisedButton';
import { Alert } from 'react-bootstrap';
import TopNavBar from '../../components/TopNavBar';
import Card from '../../components/Card';
import CardHeader from '../../components/CardHeader';

export default class GendersBox extends Component {
	
	constructor () {
		super();
		this.state = { instrumments : [], msgSuccess : ""};
		this.refreshTable = this.refreshTable.bind(this);
		this.setMsgSuccess = this.setMsgSuccess.bind(this);
	}

	componentDidMount() {
		
		HttpService.get("v1/instrumments")
			.then(response => this.setState({instrumments : response}));
	} 

	setMsgSuccess (val) {
		this.setState({msgSuccess : val});
	}

	refreshTable (response) {
		this.setState({instrumments : response});
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

				<TopNavBar title="Instruments List" url="/instruments"/>

				<Card>

					<CardHeader title="Instruments List" category="List of instruments" />

						<div className="card-content table-responsive">
							{this.fnCreateMessage()}	
							<div className="margin-vert">	
								<UpsertDialog refreshTable={this.refreshTable} button={ <RaisedButton label="Insert Instrument" primary={true}/> } setMsgSuccess={this.setMsgSuccess}/>
							</div>	
							<div>
								<InstrumentTable instrumments={this.state.instrumments} refreshTable={this.refreshTable} setMsgSuccess={this.setMsgSuccess}/>    
							</div> 
						</div>	
				</Card>
	        </div>
		);
	}

}
