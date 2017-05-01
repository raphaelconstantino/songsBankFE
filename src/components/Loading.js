import React, { Component } from 'react';

export default class Loading extends Component {
	
    render () {
		const { isFetching } = this.props;
        return (
            <div>
                {isFetching &&
                    <div className="loading"></div>
                }
            </div>    
		);
	}
}