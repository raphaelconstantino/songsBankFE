import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InstrumentTable from '../components/instruments/InstrumentTable';
import UpsertDialog from '../components/instruments/UpsertDialog';
import RaisedButton from 'material-ui/RaisedButton';
import { Alert } from 'react-bootstrap';
import TopNavBar from '../components/TopNavBar';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import { fetchInstruments, deleteInstruments } from '../actions/instrumentsActionCreator';


class InstrumentsBox extends Component {
	
	static propTypes = {
		dispatch: PropTypes.func,
		instruments : PropTypes.object
	}

	constructor () {
		super();
		this.state = { instrumments : [], msgSuccess : ""};
		this.refreshTable = this.refreshTable.bind(this);
		this.setMsgSuccess = this.setMsgSuccess.bind(this);
	}

	componentDidMount() {
		const { fetchInstruments } = this.props;
		fetchInstruments();
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
		const { dispatch, instruments, deleteInstruments } = this.props;
		return (
			<div className="main-panel" id="page-wrapper">

				<TopNavBar dispatch={dispatch} title="Instruments List" url="/instruments"/>

				<Card>

					<CardHeader title="Instruments List" category="List of instruments" />

						<div className="card-content table-responsive">
							{this.fnCreateMessage()}	
							<div className="margin-vert">	
								<UpsertDialog refreshTable={this.refreshTable} button={ <RaisedButton label="Insert Instrument" primary={true}/> } setMsgSuccess={this.setMsgSuccess}/>
							</div>	
							<div>
								<InstrumentTable deleteInstruments={deleteInstruments} instrumments={instruments.response} refreshTable={this.refreshTable} setMsgSuccess={this.setMsgSuccess}/>    
							</div> 
						</div>	
				</Card>
	        </div>
		);
	}

}

const mapDispatchToProps = (dispatch) => {
  return {

    deleteInstruments : (url) => {
      dispatch(deleteInstruments(url));
    },

	fetchInstruments : preLoaded => {
		dispatch(fetchInstruments());
	}	

  }
}


// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { instruments } = state;

  return {
    instruments
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentsBox)