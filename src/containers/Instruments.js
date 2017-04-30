import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InstrumentTable from '../components/instruments/InstrumentTable';
import UpsertDialog from '../components/instruments/UpsertDialog';
import RaisedButton from 'material-ui/RaisedButton';
import { Alert } from 'react-bootstrap';
import TopNavBar from '../components/TopNavBar';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import { fetchInstruments, deleteInstruments, insertIntrument } from '../actions/instrumentsActionCreator';


class InstrumentsBox extends Component {
	
	static propTypes = {
		dispatch: PropTypes.func,
		instruments : PropTypes.object
	}

	componentDidMount() {
		const { fetchInstruments } = this.props;
		fetchInstruments();
	} 

	fnCreateMessage (message) {
		if (message)
		{	
			return (<Alert bsStyle={message.status}>
				{message.text}
			</Alert>);
		}

		return "";	
		
	}	

	render () {
		const { dispatch, instruments, deleteInstruments, insertIntrument } = this.props;
		return (
			<div className="main-panel" id="page-wrapper">

				<TopNavBar dispatch={dispatch} title="Instruments List" url="/instruments"/>

				<Card>

					<CardHeader title="Instruments List" category="List of instruments" />

						<div className="card-content table-responsive">
							{this.fnCreateMessage(instruments.message)}	
							<div className="margin-vert">	
								<UpsertDialog insertIntrument={insertIntrument} button={ <RaisedButton label="Insert Instrument" primary={true}/> } />
							</div>	
							<div>
								<InstrumentTable deleteInstruments={deleteInstruments} instrumments={instruments.response} />    
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

	fetchInstruments : () => {
		dispatch(fetchInstruments());
	},

	insertIntrument : (url, oData) => {
		dispatch(insertIntrument(url, oData));
	} 

  }
}

function mapStateToProps(state) {

  const { instruments } = state;

  return {
    instruments
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstrumentsBox)