import React, { Component } from 'react';
import moment from 'moment';
import ProgressPie from '../../components/ProgressPie';
import HttpService from '../../util/HttpService';

export default class SongsTable extends Component {

	deleteSong (_id) {

    	HttpService.del("v1/songs/" + _id)
     	 .then(response => this.props.refreshTable(response) ); 

	}

	reviewSong (obj) {
		
		//let oData = {name : obj.name, description : obj.description, lastReview : "2016-12-25T01:18:50.200Z", artist : obj.artist, status : obj.status, complexity : obj.complexity, genders : obj.genders, instrumments : obj.instrumments};
		let oData = {name : obj.name, description : obj.description, lastReview : new Date(), artist : obj.artist, status : obj.status, complexity : obj.complexity, genders : obj.genders, instrumments : obj.instrumments};

		HttpService.put("v1/songs/" + obj._id, oData)
			.then(response => this.props.refreshTable(response));	

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
                                        <th>Complexity</th>
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
                                            <td>{song.complexity}</td>
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

SongsTable.propTypes = {
    refreshTable : React.PropTypes.func.isRequired,
    songs : React.PropTypes.array.isRequired	
};