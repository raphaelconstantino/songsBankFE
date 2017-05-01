import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import GendersTable from '../components/genders/GendersTable';
import UpsertDialog from '../components/genders/UpsertDialog';
import RaisedButton from 'material-ui/RaisedButton';
import TopNavBar from '../components/header/TopNavBar';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import MessageBox from '../components/MessageBox';
import Loading from '../components/Loading';
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

	render () {
		const { dispatch, genders, deleteGenders, insertGender } = this.props;
		return (

			<div className="main-panel" id="page-wrapper">
				
				<TopNavBar dispatch={dispatch} title="Gender List" url="/genders"/>

				<Card>

					<CardHeader title="Genders List" category="List of genders" />

					<Loading isFetching={genders.isFetching} />

					{!genders.isFetching &&

						<div className="card-content table-responsive">
							
							<MessageBox message={genders.message} />

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