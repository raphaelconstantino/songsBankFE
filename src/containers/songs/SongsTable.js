import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import {TableHeaderColumn} from 'react-bootstrap-table';
import ProgressPie from '../../components/ProgressPie';
import CustomTable from '../../components/CustomTable';
import HttpService from '../../util/HttpService';
import UpsertDialog from './UpsertDialog';
import { DropdownButton, MenuItem } from 'react-bootstrap';


export default class SongsTable extends Component {

	static propTypes = {
		refreshTable : PropTypes.func.isRequired,
		songs : PropTypes.array.isRequired,
		instrumments : PropTypes.array.isRequired,
		genders : PropTypes.array.isRequired,
		status : PropTypes.array.isRequired,
		complexity : PropTypes.array.isRequired
	}

	fnCreateLearnedButton (row) {
		if (row.status !== "2")
		{
			return (<MenuItem eventKey="1" onClick={this.markLearned.bind(this, row)} >Mark as Learned</MenuItem>)
		}
		
		return "";
	}
	
	deleteSong (_id) {

    	HttpService.del("v1/songs/" + _id)
     	 .then(response => this.props.refreshTable(response) ); 

	}

	markLearned (obj) {
		
		let oData = {name : obj.name, description : obj.description, lastReview : obj.lastReview, artist : obj.artist, status : "Learned", complexity : obj.complexity, genders : obj.genders, instrumments : obj.instrumments};

		HttpService.put("v1/songs/" + obj._id, oData)
			.then(response => this.props.refreshTable(response));	

	}
	
	reviewSong (obj) {
		
		let oData = {name : obj.name, description : obj.description, lastReview : "2017-01-15T01:18:50.200Z", artist : obj.artist, status : obj.status, complexity : obj.complexity, genders : obj.genders, instrumments : obj.instrumments};
		//let oData = {name : obj.name, description : obj.description, lastReview : new Date(), artist : obj.artist, status : obj.status, complexity : obj.complexity, genders : obj.genders, instrumments : obj.instrumments};

		HttpService.put("v1/songs/" + obj._id, oData)
			.then(response => this.props.refreshTable(response));	

	}

    createButtons (cell, row) {
		return (
			  <DropdownButton bsSize="small" bsStyle={"primary"} title={"Actions"} key={0} id={`dropdown-basic-${0}`}>
				<UpsertDialog 
					refreshTable={this.props.refreshTable} 
					instrumments={this.props.instrumments} 
					genders={this.props.genders} 
					status={this.props.status}
					complexity={this.props.complexity}
					obj={row} 
					button={<a role="menuitem" href="#">Edit</a>}/>
				{this.fnCreateLearnedButton(row)}
				<MenuItem eventKey="1" onClick={this.reviewSong.bind(this, row)} >Review</MenuItem>
				<MenuItem eventKey="1" onClick={this.deleteSong.bind(this, row._id)} >Delete</MenuItem>
			  </DropdownButton>	
			);          

    }

    createProgressPie (cell, row) {
        
    	if (row.status !== "2")
    	{
    		return;
    	}

        return <ProgressPie id={row._id} percentage={this.getPercentage(this.daysRemaining(row.lastReview))}/> 
    }

    fnStatus (fieldValue, row, rowIdx, colIdx) {
		
		let sClass = "";

		if (colIdx === 1)
		{
			sClass = "colName";
		} else if (colIdx === 4)
		{
			sClass = "colLvl";
		}


		if ( (row.status === "2" || row.status ===  "1") && this.getPercentage(this.daysRemaining(row.lastReview)) < 50)
    	{
			return 'red-row ' + sClass;
    	}
    	
    	if (row.status === "2")
    	{
    		return 'green-row ' + sClass;
    	}

    	if (row.status ===  "1"){
    		return 'yellow-row ' + sClass;
    	}

		return sClass;
	}

    getGenders (cell, row) {
        return (row.genders ? row.genders.name : "")
    }

    getInstrumments (cell, row) {
        return (row.instrumments ? row.instrumments.name : "")
    }

	getStatus (cell, row) {
		return this.fnConvertStatus()[row.status];
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

	fnConvertStatus () {
		var obj = {};
		
		this.props.status.map(function(o, i) {
			return obj[o._id] = o.name;
			
		});

		return obj;
	}

	render () {
		return (

			<div id="songs-table">
	            <CustomTable list={this.props.songs}>
	                <TableHeaderColumn className="song-chart" dataFormat={this.createProgressPie.bind(this)} ></TableHeaderColumn>
					<TableHeaderColumn dataField='name' filter={{type: 'TextFilter', defaultValue: ''}} dataSort={ true } columnClassName={ this.fnStatus.bind(this) }>Song</TableHeaderColumn>
	                <TableHeaderColumn dataField='artist' filter={{type: 'TextFilter', defaultValue: ''}} dataSort={ true } columnClassName={ this.fnStatus.bind(this) }>Artist</TableHeaderColumn>
	                <TableHeaderColumn dataFormat={this.getGenders} columnClassName={ this.fnStatus.bind(this) }>Gender</TableHeaderColumn>
	                <TableHeaderColumn dataField="complexity" dataSort={ true } columnClassName={ this.fnStatus.bind(this) }>Lvl</TableHeaderColumn>
					<TableHeaderColumn dataField='status' dataFormat={this.getStatus.bind(this)} dataSort={ true } columnClassName={ this.fnStatus.bind(this) } filter={{ type: 'SelectFilter', options: this.fnConvertStatus() } }>Status</TableHeaderColumn>
	                <TableHeaderColumn dataFormat={this.getInstrumments} columnClassName={ this.fnStatus.bind(this) }>Instrumment</TableHeaderColumn>
	                <TableHeaderColumn dataFormat={this.createButtons.bind(this)} columnClassName={ this.fnStatus.bind(this) }></TableHeaderColumn>
	            </CustomTable>   
	        </div>         

		);

	}

}