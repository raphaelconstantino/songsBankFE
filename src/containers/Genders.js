import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GendersTable from '../components/genders/GendersTable';
import UpsertDialog from '../components/genders/UpsertDialog';
import RaisedButton from 'material-ui/RaisedButton';
import { Alert } from 'react-bootstrap';
import TopNavBar from '../components/TopNavBar';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import { fetchGenders, deleteGenders, insertGender } from '../actions/gendersActionCreator';

class GendersBox extends Component {
	
	static propTypes = {
		dispatch: PropTypes.func,
		genders : PropTypes.object
	}

	componentDidMount() {
		const { fetchGenders } = this.props;
		fetchGenders();
	} 

	fnLoading (isFetching) {
		if (isFetching)
		{
			return (<div className="loading"></div>);
		}
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
		const { dispatch, genders, deleteGenders, insertGender } = this.props;
		return (

			<div className="main-panel" id="page-wrapper">
				
				<TopNavBar dispatch={dispatch} title="Gender List" url="/genders"/>

				<Card>

					<CardHeader title="Genders List" category="List of genders" />

					{this.fnLoading(genders.isFetching)}

					{!genders.isFetching &&

						<div className="card-content table-responsive">
							{this.fnCreateMessage(genders.message)}	
							<div className="margin-vert">	
								<UpsertDialog insertGender={insertGender} button={ <RaisedButton label="Insert Gender" primary={true}/> } />
							</div>	
							<div>
								<GendersTable deleteGenders={deleteGenders} genders={genders.response} />    
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

    deleteGenders : (url) => {
      dispatch(deleteGenders(url));
    },

	fetchGenders : () => {
		dispatch(fetchGenders());
	},

	insertGender : (url, oData) => {
		dispatch(insertGender(url, oData));
	} 

  }
}

function mapStateToProps(state) {

  const { genders } = state;

  return {
    genders
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GendersBox)