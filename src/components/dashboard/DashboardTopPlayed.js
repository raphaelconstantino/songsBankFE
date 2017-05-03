import React, { Component, PropTypes } from 'react';
import SongsUtil from '../../containers/songs/SongsUtil';
import CardHeader from '../CardHeader';

export default class DashboardTopPlayed extends Component {

    static propTypes = {
		topSongs: PropTypes.array.isRequired
    }

    render () {
        return (
            <div className="col-md-9">
                <div className="card">
                    <CardHeader title="Top Played" category="Most played Songs" color="blue" />
                    <table className="table table-hover">
                        <thead className="text-info">
                            <tr>
                                <th>Song</th>
                                <th>Artist</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.topSongs.map((o) => <tr key={o._id}><td>{o.name}</td><td>{o.artist}</td><td>{SongsUtil.getStatusLabel(o.status)}</td></tr>)}
                        </tbody>
                    </table>
                </div>	
            </div>	
        );
    }     

}