import React, { Component } from 'react';
import Content from './Content';

export default class Card extends Component {
	render () {
		return (
			<Content>
				<div className="col-md-12">
					<div className="card">
						{this.props.children}
					</div>
				</div>
			</Content>
		);
	}
}