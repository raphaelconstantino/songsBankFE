import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../components/CustomInput';
import BreadCrumb from '../components/BreadCrumb';

export class InstrumentForm extends Component {
	
	constructor () {
		super();
		this.state = { name : "", errorMsg : {} };

		this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);
		this.setName = this.setName.bind(this);

	}

	validate () {

		var error = {};
		var bInvalid = false;
		
		if (this.state.name === "")
		{
			error.name = { msg : "Please insert a valid Instrument Name" };
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
			url : "https://songs-bank-be.herokuapp.com/v1/instrumments",
			contentType: 'application/json',
			dataType:'json',
			type:'post',
			data: JSON.stringify({name:this.state.name}),
			success: function(response) {
				this.props.refreshTable(response);
				this.setState({ name : "", errorMsg : {} });
			}.bind(this),
			error: function(response) {
				console.log("erro");
			}
		});  

	}

	setName(evento) {
		this.setState({name:evento.target.value});
	}  

	render () {
		return (
	        <div className="row">
                <div className="col-lg-6">
                
                    <form role="form" onSubmit={this.sendData}>

                        <CustomInput label="Song Name*" type="text" name="name" value={this.state.name} change={this.setName} error={this.state.errorMsg} />
                       
                        <button type="submit" className="btn btn-default">Submit Button</button>

                  </form>      

                </div>
            </div>

		);

	}

}	


export class InstrumentTable extends Component {

	deleteInstrument (_id) {

		$.ajax({
			url : "https://songs-bank-be.herokuapp.com/v1/instrumments/" + _id,
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
                        <h2>Instruments Table</h2>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Instrument</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {
                                      this.props.instrumments.map(function (instrument) {
                                        return (
                                          <tr key={instrument._id}>
                                            <td>{instrument.name}</td>
                                            <td><button type="button" className="btn btn-danger btn-sm" onClick={this.deleteInstrument.bind(this, instrument._id)} >Delete</button></td>
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

export default class GendersBox extends Component {
	
	constructor () {
		super();
		this.state = { instrumments : []};
		this.refreshTable = this.refreshTable.bind(this);
	}

	componentDidMount() {
		$.ajax({
		    url : "https://songs-bank-be.herokuapp.com/v1/instrumments",
		    dataType : 'json',
		    success : function(response) {
		      this.setState({instrumments : response});
		    }.bind(this)
		});
	} 

	refreshTable (response) {
		this.setState({instrumments : response});
	}	

	render () {
		return (
			<div>
				<BreadCrumb label="Instruments"/>
				<div>
				    <InstrumentForm refreshTable={this.refreshTable} />
	                <InstrumentTable instrumments={this.state.instrumments} refreshTable={this.refreshTable} />    
	            </div>    
	        </div>
		);
	}

}
