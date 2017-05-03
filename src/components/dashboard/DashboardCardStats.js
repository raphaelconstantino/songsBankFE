import React, { Component, PropTypes } from 'react';

export default class DashboardCardStats extends Component {

    static propTypes = {
		color: PropTypes.string.isRequired,
        icon : PropTypes.string.isRequired,
        title : PropTypes.string.isRequired,
        text : PropTypes.object.isRequired,
        desc : PropTypes.object
    }

    render () {
        return (
            <div className="card card-stats">
                <div className="card-header" data-background-color={this.props.color}>
                    <i className="material-icons">{this.props.icon}</i>
                </div>
                <div className="card-content">
                    <p className="category">{this.props.title}</p>
                    {this.props.text}
                </div>
                <div className="card-footer">
                    {this.props.desc}
                </div>
            </div>
        );
    }    
    
}