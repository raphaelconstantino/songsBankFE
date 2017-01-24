import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import {TableHeaderColumn} from 'react-bootstrap-table';
import UpsertDialog from './UpsertDialog';
import ProgressPie from '../../components/ProgressPie';
import CustomTable from '../../components/CustomTable';
import HttpService from '../../util/HttpService';

export default class SongsTable extends Component {

	static propTypes = {
		refreshTable : PropTypes.func.isRequired,
		songs : PropTypes.array.isRequired,
		instrumments : PropTypes.array.isRequired,
		genders : PropTypes.array.isRequired,
		status : PropTypes.array.isRequired,
		complexity : PropTypes.array.isRequired
	}

	deleteSong (_id) {

    	HttpService.del("v1/songs/" + _id)
     	 .then(response => this.props.refreshTable(response) ); 

	}

	reviewSong (obj) {
		
		//let oData = {name : obj.name, description : obj.description, lastReview : "2016-12-29T01:18:50.200Z", artist : obj.artist, status : obj.status, complexity : obj.complexity, genders : obj.genders, instrumments : obj.instrumments};
		let oData = {name : obj.name, description : obj.description, lastReview : new Date(), artist : obj.artist, status : obj.status, complexity : obj.complexity, genders : obj.genders, instrumments : obj.instrumments};

		HttpService.put("v1/songs/" + obj._id, oData)
			.then(response => this.props.refreshTable(response));	

	}

    createButtons (cell, row) {
        return (<div>
                    <button type="button" className="btn btn-success btn-sm" onClick={this.reviewSong.bind(this, row)} >Review</button>
                    <UpsertDialog 
                    	refreshTable={this.props.refreshTable} 
						instrumments={this.props.instrumments} 
						genders={this.props.genders} 
						status={this.props.status}
						complexity={this.props.complexity}
                    	obj={row}
		                button={<button label="Edit" type="button" className="btn btn-info btn-sm">Edit</button>} />
	                <div>
	                  <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteSong.bind(this, row._id)} >Delete</button>
	                </div>	
                </div>)
    }

    createProgressPie (cell, row) {
        return <ProgressPie id={row._id} percentage={this.getPercentage(this.daysRemaining(row.lastReview))}/> 
    }

    getGenders (cell, row) {
        return (row.genders ? row.genders.name : "")
    }

    getInstrumments (cell, row) {
        return (row.instrumments ? row.instrumments.name : "")
    }    

	daysRemaining (date) {
	    let eventdate = moment(date);
	    let todaysdate = moment();
	    return eventdate.diff(todaysdate, 'days');
	}

	getPercentage (val) {
		
		let total = 100;
		let iPos = val * -1;
		let iDif = 4;
		let iResult = 0;

		if (iPos > 7)
		{
			iDif = 7;
		} else if (iPos > 4)
		{
			iDif = 5;
		}

		let finalVal = val * iDif;
		
		iResult = (total + finalVal);

		if (iResult < 0)
		{
			iResult = 0;
		}

		return iResult;
	}

	render () {
		return (

			<div id="songs-table">
	            <CustomTable list={this.props.songs}>
	                <TableHeaderColumn className="song-chart" dataFormat={this.createProgressPie.bind(this)}></TableHeaderColumn>
	                <TableHeaderColumn dataField='name' filter={{type: 'TextFilter', defaultValue: ''}} dataSort={ true }>Song</TableHeaderColumn>
	                <TableHeaderColumn dataField='artist' filter={{type: 'TextFilter', defaultValue: ''}} dataSort={ true }>Artist</TableHeaderColumn>
	                <TableHeaderColumn dataFormat={this.getGenders}>Gender</TableHeaderColumn>
	                <TableHeaderColumn dataField="complexity" dataSort={ true }>Complexity</TableHeaderColumn>
	                <TableHeaderColumn dataField="status" dataSort={ true }>Status</TableHeaderColumn>
	                <TableHeaderColumn dataField="description">Description</TableHeaderColumn>
	                <TableHeaderColumn dataFormat={this.getInstrumments}>Instrumment</TableHeaderColumn>
	                <TableHeaderColumn dataFormat={this.createButtons.bind(this)}></TableHeaderColumn>
	            </CustomTable>   
	        </div>         

		);

	}

}