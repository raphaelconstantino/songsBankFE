import React, { Component, PropTypes } from 'react';

export default class CardHeader extends Component {
	
  static propTypes = {
    title : PropTypes.string.isRequired,
    category : PropTypes.string.isRequired,
  }

    render () {
		return (
          <div className="card-header" data-background-color="blue">
            <h4 className="title">{this.props.title}</h4>
            <p className="category">{this.props.category}</p>
        </div>          

		);
	}
}