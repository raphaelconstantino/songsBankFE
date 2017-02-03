import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import {TableHeaderColumn} from 'react-bootstrap-table';
import ProgressPie from '../../components/ProgressPie';
import CustomTable from '../../components/CustomTable';
import HttpService from '../../util/HttpService';
import Util from '../../util/Util';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import {Link} from 'react-router'


export default class SongsTable extends Component {

	static propTypes = {
		refreshTable : PropTypes.func.isRequired,
		songs : PropTypes.array.isRequired,
		instrumments : PropTypes.array.isRequired,
		genders : PropTypes.array.isRequired,
		status : PropTypes.array.isRequired,
		complexity : PropTypes.array.isRequired
	}

	fnCreateReviewButton (row) {
		if (row.status === "2")
		{
			return (<MenuItem eventKey="1" onClick={this.reviewSong.bind(this, row)} >Review</MenuItem>);
		}

		return "";	
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
		
		let oData = {name : obj.name, description : obj.description, lastReview : obj.lastReview, artist : obj.artist, status : "2", complexity : obj.complexity, genders : obj.genders, instrumments : obj.instrumments};

		HttpService.put("v1/songs/" + obj._id, oData)
			.then(response => this.props.refreshTable(response));	

	}
	
	reviewSong (obj) {
		
		let reviewCount = obj.reviewCount;

		if (reviewCount === null || reviewCount === undefined)
		{
			reviewCount = 0;
		}

		//let oData = {name : obj.name, description : obj.description, lastReview : "2017-01-15T01:18:50.200Z", artist : obj.artist, status : obj.status, complexity : obj.complexity, genders : obj.genders, instrumments : obj.instrumments, reviewCount : ++reviewCount};
		let oData = {name : obj.name, description : obj.description, lastReview : new Date(), artist : obj.artist, status : obj.status, complexity : obj.complexity, genders : obj.genders, instrumments : obj.instrumments};

		HttpService.put("v1/songs/" + obj._id, oData)
			.then(response => this.props.refreshTable(response));	

	}

	createDetailLink (cell, row) {
		return (
			<Link to={"/songDetail?id=" + row._id}>{row.name}</Link>
		)
	}

    createButtons (cell, row) {
		return (
			  <DropdownButton bsSize="small" bsStyle={"primary"} title={"Actions"} key={0} id={`dropdown-basic-${0}`}>
				<li><Link to={"/songDetail?id=" + row._id}>Detail</Link></li>
				<li><Link to={"/insertSong?id=" + row._id}>Edit</Link></li>
				{this.fnCreateReviewButton(row)}
				{this.fnCreateLearnedButton(row)}
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

    fnStatus (row, rowIdx) {


		if ( (row.status === "2" || row.status ===  "1") && this.getPercentage(this.daysRemaining(row.lastReview)) < 50)
    	{
			return 'danger';
    	}
    	
    	if (row.status === "2")
    	{
    		return 'success';
    	}

    	if (row.status ===  "1"){
    		return 'warning';
    	}

		return "";
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
		
		this.props.status.map((o, i) => obj[o._id] = o.name);

		return obj;
	}

	render () {
		return (

			<div id="songs-table">
	            <CustomTable list={this.props.songs} trClassName={ this.fnStatus.bind(this) }>
	                <TableHeaderColumn columnClassName="song-chart" dataFormat={this.createProgressPie.bind(this)} ></TableHeaderColumn>
					<TableHeaderColumn dataFormat={this.createDetailLink.bind(this)} filter={{type: 'TextFilter', defaultValue: ''}} dataSort={ true } >Song</TableHeaderColumn>
	                <TableHeaderColumn dataField='artist' filter={{type: 'TextFilter', defaultValue: ''}} dataSort={ true } >Artist</TableHeaderColumn>
	                <TableHeaderColumn className={Util.fnGetHideSmClass} columnClassName={ Util.fnGetHideSmClass } dataFormat={this.getGenders} >Gender</TableHeaderColumn>
					<TableHeaderColumn className={Util.fnGetHideSmClass} columnClassName={ Util.fnGetHideSmClass("colLvl") } dataField="complexity" dataSort={ true } >Lvl</TableHeaderColumn>
					<TableHeaderColumn dataField='status' dataFormat={this.getStatus.bind(this)} dataSort={ true } filter={{ type: 'SelectFilter', options: this.fnConvertStatus() } }>Status</TableHeaderColumn>
	                <TableHeaderColumn className={Util.fnGetHideSmClass} columnClassName={ Util.fnGetHideSmClass } dataFormat={this.getInstrumments} >Instrumment</TableHeaderColumn>
	                <TableHeaderColumn dataFormat={this.createButtons.bind(this)} ></TableHeaderColumn>
	            </CustomTable>   
	        </div>         

		);

	}

}