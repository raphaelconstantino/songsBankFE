import React, { Component } from 'react';

export default class Content extends Component {
	render () {
		return (
          	<div className="content">
				<div className="container-fluid">
					<div className="row">
                        {this.props.children}
                    </div>
                 </div>
             </div>           
		);
	}
}