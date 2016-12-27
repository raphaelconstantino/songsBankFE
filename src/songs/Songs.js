import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../components/CustomInput';
import CustomSelect from '../components/CustomSelect';
import BreadCrumb from '../components/BreadCrumb';


export class SongsForm extends Component {
	
	constructor () {
		super();
		this.state = { name : "", artist : "", status : "", genders: "", instrumments: "", description : "", errorMsg : {} };

		this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);

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

	sendData (e) {

		e.preventDefault();

		if ( this.validate() )
		{
			return;
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

	}

	setField (fieldName, e)
	{
		var field = {};
		field[fieldName] = e.target.value ;
		this.setState(field);
	} 

	render () {
		return (
	        <div className="row">
                <div className="col-lg-6">
                
                    <form role="form" onSubmit={this.sendData}>

                        <CustomInput label="Song Name*" type="text" name="name" value={this.state.name} change={this.setField.bind(this, "name")} error={this.state.errorMsg} />
                        <CustomInput label="Artist Name*" type="text" name="artist" value={this.state.artist} change={this.setField.bind(this, "artist")} error={this.state.errorMsg} />
                        <CustomInput label="Status*" type="text" name="status" value={this.state.status} change={this.setField.bind(this, "status")} error={this.state.errorMsg} />
                        <CustomInput label="Description" type="text" name="description" value={this.state.description} change={this.setField.bind(this, "description")} />
						<CustomSelect label="Gender" value={this.state.genders} name="genders" change={this.setField.bind(this, "genders")} list={this.props.genders} />
						<CustomSelect label="Instrument" value={this.state.instrumments} name="instrumments" change={this.setField.bind(this, "instrumments")} list={this.props.instrumments} />
                        
                        <button type="submit" className="btn btn-default">Submit Button</button>

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

	render () {

		return (

                <div className="row">
                    <div className="col-lg-12">
                        <h2>Songs Table</h2>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Song</th>
                                        <th>Artist</th>
                                        <th>Gender</th>
                                        <th>Status</th>
                                        <th>Review Lvl</th>
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
                                            <td>{song.name}</td>
                                            <td>{song.artist}</td>
                                            <td>{song.genders ? song.genders.name : "" }</td>
                                            <td>{song.status}</td>
                                            <td>{song.lastReview}</td>
                                            <td>{song.description}</td>
                                            <td>{song.instrumments ? song.instrumments.name : "" }</td>
                                            <td><button type="button" className="btn btn-danger btn-sm" onClick={this.deleteSong.bind(this, song._id)} >Delete</button></td>
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
				<div>
				    <SongsForm instrumments={this.state.instrumments} genders={this.state.genders} refreshTable={this.refreshTable} />
	                <SongsTable songs={this.state.songs} refreshTable={this.refreshTable} />    
	            </div>    
	        </div>
		);
	}

}
