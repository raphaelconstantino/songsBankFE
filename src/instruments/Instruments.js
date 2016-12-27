import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from '../components/CustomInput';
import BreadCrumb from '../components/BreadCrumb';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


export class InstrumentForm extends Component {
	
	render () {
		return (
	        <div className="row">
                <div className="col-lg-6">
                
                    <form role="form">

                        <CustomInput label="Instrument Name*" type="text" name="name" value={this.props.name} change={this.props.setName} error={this.props.errorMsg} />

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

export class InsertDialog extends Component {
	
	constructor () {
		super();
		this.state = { name : "", open : false, errorMsg : {} };

		this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);
		this.setName = this.setName.bind(this);

	}

	validate () {

		var error = {};
		var bInvalid = false;
		
		if (this.state.name === "")
		{
			error.name = { msg : "Please insert a valid Name" };
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

		return true;

	}

	setName(evento) {
		this.setState({name:evento.target.value});
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
	        <RaisedButton label="Insert Instrument" primary={true} onTouchTap={this.handleOpen} />
	        <Dialog title="Insert Instrument" actions={actions} modal={false} open={this.state.open} >
				<InstrumentForm refreshTable={this.props.refreshTable} name={this.state.name} setName={this.setName} errorMsg={this.state.errorMsg} />
	        </Dialog>
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
				<InsertDialog refreshTable={this.refreshTable}/>
				<div>
	                <InstrumentTable instrumments={this.state.instrumments} refreshTable={this.refreshTable} />    
	            </div>    
	        </div>
		);
	}

}
