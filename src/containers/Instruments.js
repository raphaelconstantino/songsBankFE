import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import InstrumentTable from '../components/instruments/InstrumentTable';
import UpsertDialog from '../components/instruments/UpsertDialog';
import RaisedButton from 'material-ui/RaisedButton';
import MessageBox from '../components/MessageBox';
import Loading from '../components/Loading';
import TopNavBar from '../components/header/TopNavBar';
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

	render () {
		const { dispatch, instruments, deleteInstruments, insertIntrument } = this.props;
		
		return (
			
			<div className="main-panel" id="page-wrapper">

				<TopNavBar dispatch={dispatch} title="Instruments List" url="/instruments"/>

				<Card>

					<CardHeader title="Instruments List" category="List of instruments" />
					
					<Loading isFetching={instruments.isFetching} />

					{!instruments.isFetching &&
						<div className="card-content table-responsive">

							<MessageBox message={instruments.message} />

							<div className="margin-vert">	
								<UpsertDialog insertIntrument={insertIntrument} button={ <RaisedButton label="Insert Instrument" primary={true}/> } />
							</div>	
							<div>
								<InstrumentTable deleteInstruments={deleteInstruments} instrumments={instruments.response} />    
							</div> 
						</div>	
					}

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