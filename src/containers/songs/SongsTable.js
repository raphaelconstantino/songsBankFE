import React, { Component, PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import {Link} from 'react-router';
import {TableHeaderColumn} from 'react-bootstrap-table';
import ProgressPie from '../../components/ProgressPie';
import CustomTable from '../../components/CustomTable';
import HttpService from '../../util/HttpService';
import Util from '../../util/Util';
import SongsUtil from './SongsUtil';


export default class SongsTable extends Component {

	static propTypes = {
		refreshTable : PropTypes.func.isRequired,
		setMsgSuccess : PropTypes.func.isRequired,
		songs : PropTypes.array.isRequired
	}

	fnCreateReviewButton (row) {
		if (row.status === "2")
		{
			return (<MenuItem eventKey="1" onClick={this.reviewSong.bind(this, row._id, row.reviewCount)} >Review</MenuItem>);
		}

		return "";	
	}

	fnCreatePracticeButton (row) {
		if (row.status === "1")
		{
			return (<MenuItem eventKey="1" onClick={this.reviewSong.bind(this, row)} >Practice</MenuItem>);
		}

		return "";	
	}

	fnCreateLearnedButton (row) {
		if (row.status !== "2")
		{
			return (<MenuItem eventKey="1" onClick={this.markLearned.bind(this, row._id)} >Mark as Learned</MenuItem>)
		}
		
		return "";
	}
	
	deleteSong (_id, name) {

    	HttpService.del("v1/songs/" + _id)
     	 .then(response => {
			  this.props.setMsgSuccess(`Song ${name} deleted succesfully.`);
			  return this.props.refreshTable(response) 
			}); 

	}

	markLearned (id) {

		HttpService.put("v1/songs/" + id, {status : "2"})
			.then(response => {
				this.props.setMsgSuccess(`Song ${response.name} marked as learned succesfully.`);
				return this.props.refreshTable(response) 
			});	

	}
	
	reviewSong (id, reviewCount) {

		if (reviewCount === null || reviewCount === undefined)
		{
			reviewCount = 0;
		}

		var obj = {};
		obj.lastReview = new Date();
		obj.reviewCount = ++reviewCount;

		HttpService.put("v1/songs/" + id, obj)
			.then(response => {
				this.props.setMsgSuccess(`Song ${response.name} reviwed succesfully.`);
				return this.props.refreshTable(response) 
			});	

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
				{this.fnCreatePracticeButton(row)}
				{this.fnCreateLearnedButton(row)}
				 <MenuItem divider />
				<MenuItem eventKey="1" onClick={this.deleteSong.bind(this, row._id, row.name)} >Delete</MenuItem>
			  </DropdownButton>	
			);          

    }

    createProgressPie (cell, row) {
        
    	if (row.status !== "2")
    	{
    		return;
    	}

        return <ProgressPie height={50} width={50} id={row._id} percentage={SongsUtil.getPercentage(SongsUtil.daysRemaining(row.lastReview))}/> 
    }

    fnStatus (row, rowIdx) {


		if ( (row.status === "2") && SongsUtil.getPercentage(SongsUtil.daysRemaining(row.lastReview)) < 50)
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
        return (SongsUtil.getStatusLabel(row.status))
    }

	render () {
		return (
			<div id="songs-table">
				<CustomTable list={this.props.songs} trClassName={ this.fnStatus.bind(this) }>
					<TableHeaderColumn columnClassName="song-chart" dataFormat={this.createProgressPie.bind(this)} ></TableHeaderColumn>
					<TableHeaderColumn dataFormat={this.createDetailLink.bind(this)}>Song</TableHeaderColumn>
					<TableHeaderColumn dataField='artist'>Artist</TableHeaderColumn>
					<TableHeaderColumn className={Util.fnGetHideSmClass} columnClassName={ Util.fnGetHideSmClass } dataFormat={this.getGenders} >Gender</TableHeaderColumn>
					<TableHeaderColumn className={Util.fnGetHideSmClass} columnClassName={ Util.fnGetHideSmClass("colLvl") } dataField="complexity">Lvl</TableHeaderColumn>
					<TableHeaderColumn dataFormat={this.getStatus.bind(this)}>Status</TableHeaderColumn>
					<TableHeaderColumn className={Util.fnGetHideSmClass} columnClassName={ Util.fnGetHideSmClass } dataFormat={this.getInstrumments} >Instrumment</TableHeaderColumn>
					<TableHeaderColumn dataFormat={this.createButtons.bind(this)} ></TableHeaderColumn>
				</CustomTable>   
			</div>         
		);

	}

}