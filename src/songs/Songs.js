import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';
import CustomInput from '../components/CustomInput';
import CustomSelect from '../components/CustomSelect';
import BreadCrumb from '../components/BreadCrumb';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ProgressPie from '../components/ProgressPie';

export class SongsForm extends Component {

	render () {
		return (
	        <div className="row">
                <div className="col-lg-12">
                
                    <form role="form">

                        <CustomInput label="Song Name*" type="text" name="name" value={this.props.name} change={this.props.setField.bind(this, "name")} error={this.props.errorMsg} />
                        <CustomInput label="Artist Name*" type="text" name="artist" value={this.props.artist} change={this.props.setField.bind(this, "artist")} error={this.props.errorMsg} />
                        <CustomInput label="Status*" type="text" name="status" value={this.props.status} change={this.props.setField.bind(this, "status")} error={this.props.errorMsg} />
                        <CustomInput label="Description" type="text" name="description" value={this.props.description} change={this.props.setField.bind(this, "description")} />
						<CustomSelect label="Gender" value={this.props.genders} name="genders" change={this.props.setField.bind(this, "genders")} list={this.props.listGenders} />
						<CustomSelect label="Instrument" value={this.props.instrumments} name="instrumments" change={this.props.setField.bind(this, "instrumments")} list={this.props.listInstrumments} />

                  </form>      

                </div>
            </div>

		);

	}

}	


export class SongsTable extends Component {

	deleteSong (_id) {

		$.ajax({
			url : "https://songs-bank-be.herokuapp.com/v1/songs/" + _id,
			contentType: 'application/json',
			dataType:'json',
			type:'delete',
			success: function(response) {
				this.props.refreshTable(response);
			}.bind(this),
			error: function(response) {
				console.log("erro");
			}
		}); 
	}

	reviewSong (obj) {
		$.ajax({
			url : "https://songs-bank-be.herokuapp.com/v1/songs/" + obj._id,
			contentType: 'application/json',
			dataType:'json',
			type:'put',
			data: JSON.stringify({name : obj.name, description : obj.description, lastReview : new Date(), artist : obj.artist, status : obj.status, genders : obj.genders, instrumments : obj.instrumments}),
			success: function(response) {
				this.props.refreshTable(response);
			}.bind(this),
			error: function(response) {
				console.log("erro");
			}
		}); 
	} 

	daysRemaining (date) {
	    var eventdate = moment(date);
	    var todaysdate = moment();
	    return eventdate.diff(todaysdate, 'days');
	}

	getPercentage (val) {
		
		var total = 100;
		var iPos = val * -1;
		var iDif = 4;
		var iResult = 0;

		if (iPos > 7)
		{
			iDif = 7;
		} else if (iPos > 4)
		{
			iDif = 5;
		}

		val = val * iDif;
		
		iResult = (total + val);

		if (iResult < 0)
		{
			iResult = 0;
		}

		return iResult;
	}

	render () {

		return (

                <div className="row">
                    <div className="col-lg-12">
                        <h2>Songs Table</h2>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                    	<th>Mastery</th>
                                        <th>Song</th>
                                        <th>Artist</th>
                                        <th>Gender</th>
                                        <th>Status</th>
                                        <th>Description</th>
                                        <th>Instrumment</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {

                                      this.props.songs.map(function (song) {
                                        return (
                                          <tr key={song._id}>
                                          	<td>
                                          		<ProgressPie id={song._id} percentage={this.getPercentage(this.daysRemaining(song.lastReview))}/> 
                                          	</td>
                                            <td>{song.name}</td>
                                            <td>{song.artist}</td>
                                            <td>{song.genders ? song.genders.name : "" }</td>
                                            <td>{song.status}</td>
                                            <td>{song.description}</td>
                                            <td>{song.instrumments ? song.instrumments.name : "" }</td>
                                            <td>
                                            	<button type="button" className="btn btn-danger btn-sm" onClick={this.deleteSong.bind(this, song._id)} >Delete</button> 
                                            	&nbsp;
                                            	<button type="button" className="btn btn-info btn-sm" onClick={this.reviewSong.bind(this, song)} >Review</button>
                                            </td>
                                          </tr>
                                        );
                                      }.bind(this))
                                   }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>		

		);

	}

}	

export class InsertDialog extends Component {
	
	constructor () {
		super();
		this.state = { name : "", artist : "", status : "", genders: "", instrumments: "", description : "", open : false, errorMsg : {} };

		this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);
		this.setField = this.setField.bind(this);

	}

	validate () {

		var error = {};
		var bInvalid = false;
		
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

		$.ajax({
			url : "https://songs-bank-be.herokuapp.com/v1/songs",
			contentType: 'application/json',
			dataType:'json',
			type:'post',
			data: JSON.stringify({name : this.state.name, description : this.state.description, lastReview : new Date(), artist : this.state.artist, status:this.state.status, genders : this.state.genders, instrumments : this.state.instrumments}),
			success: function(response) {
				this.props.refreshTable(response);
				this.setState({ name : "", artist : "", status : "", genders : "", instrumments: "", description : "", errorMsg : {} });
			}.bind(this),
			error: function(response) {
				console.log("erro");
			}
		});  

		return true;

	}

	setField (fieldName, e)
	{
		var field = {};
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
	        <Dialog title="Insert Song" actions={actions} modal={false} open={this.state.open} >
				<SongsForm 
					refreshTable={this.props.refreshTable}
					listGenders={this.props.genders} 
					listInstrumments={this.props.instrumments} 
					name={this.state.name} 
					artist={this.state.artist}
					status={this.state.status}
					description={this.state.description}
					genders={this.state.genders}
					instrumments={this.state.instrumments}
					setField={this.setField} 
					errorMsg={this.state.errorMsg} />
	        </Dialog>
	      </div>
	    );
	}
}

export default class SongsBox extends Component {
	
	constructor () {
		super();
		this.state = { songs : [], genders : [], instrumments : []};
		this.refreshTable = this.refreshTable.bind(this);
	}

	componentDidMount() {
		
		$.ajax({
		    url : "https://songs-bank-be.herokuapp.com/v1/songs",
		    dataType : 'json',
		    success : function(response) {
		      this.setState({songs : response});
		    }.bind(this)
		});

		$.ajax({
		    url : "https://songs-bank-be.herokuapp.com/v1/genders",
		    dataType : 'json',
		    success : function(response) {
		      this.setState({genders : response});
		    }.bind(this)
		});		

		$.ajax({
		    url : "https://songs-bank-be.herokuapp.com/v1/instrumments",
		    dataType : 'json',
		    success : function(response) {
		      this.setState({instrumments : response});
		    }.bind(this)
		});				
	} 

	refreshTable (response) {
		this.setState({songs : response});
	}

	render () {



		return (
			<div>
				<BreadCrumb label="Songs"/>
				<InsertDialog refreshTable={this.refreshTable} instrumments={this.state.instrumments} genders={this.state.genders} />
				<div>
	                <SongsTable songs={this.state.songs} refreshTable={this.refreshTable} />    
	            </div>    
	        </div>
		);
	}

}
