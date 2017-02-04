import React, { Component } from 'react';
import moment from 'moment';
import ProgressPie from '../../components/ProgressPie';
import HttpService from '../../util/HttpService';
import {Link} from 'react-router';
import SongsUtil from './SongsUtil';

export default class SongDetailBox extends Component {

	constructor () {
		super();

        this.state = { song : {} };
    }

	componentDidMount() {

        if (this.props.location.query.id)
        {
		    HttpService.get("v1/songs/" + this.props.location.query.id)
			    .then(response => this.setState({ song : response }));
        }                
    }

    render () {

		return (
            <div className="row">

				<div className="margin-vert">	
					<Link to="/songs">Back to List</Link>
				</div>	

                <div className="row">
                    <div className="col-md-6">
                        <div className="margin-vert-down">
                            <h2>{this.state.song.name}</h2>
                            <h4 className="text-info">{this.state.song.artist}</h4>
                        </div>    

                        <dl id="detail-items" className="margin-vert dl-horizontal">
                            <dt>Instrumment: </dt>
                            <dd>{this.state.song.instrumments ? this.state.song.instrumments.name : ""}</dd>
                            <dt>Gender: </dt>
                            <dd>{this.state.song.genders ? this.state.song.genders.name : ""}</dd>
                            <dt>Status: </dt>
                            <dd>{SongsUtil.getStatusLabel(this.state.song.status)}</dd>
                            <dt>Complexity ( 1- 10): </dt>
                            <dd>{this.state.song.complexity}</dd>
                            <dt>Last Review: </dt>
                            <dd>{moment(this.state.song.lastReview, "YYYYMMDD").fromNow()}</dd>
                            <dt>Review Count: </dt>
                            <dd>{this.state.song.reviewCount ? this.state.song.reviewCount : "0"}</dd> 
                            <dt>Description: </dt>
                            <dd>{this.state.song.description}</dd>                                                                    
                        </dl>  
                    </div>
                    
                    <div className="col-md-2 padding-vert">
                    </div>

                    <div className="col-md-4 padding-vert">
                        <ProgressPie className="" height={200} width={200} id={this.state.song._id} percentage={SongsUtil.getPercentage(SongsUtil.daysRemaining(this.state.song.lastReview))}/> 
                    </div>                          
                </div>

                <div className="padding-vert">
                    <div className="col-md-6">
                        <h4>Lyrics</h4>
                        <pre dangerouslySetInnerHTML={{__html: (this.state.song.lyrics ? this.state.song.lyrics.replace(/\n/ig, '<br/>') : "")}}></pre>
                    </div>
                    
                    <div className="col-md-2 padding-vert">
                    </div>

                    <div className="col-md-4 padding-vert pull-right">
                        <iframe width="300" height="200"src={this.state.song.video} frameBorder="0" allowFullScreen></iframe>
                    </div>
                </div>

            </div>    

		);
	}


}