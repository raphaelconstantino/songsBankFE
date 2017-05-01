import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

export default class MessageBox extends Component {
	
    render () {
		const { message } = this.props;
        return (
            <div>
                {message &&
                    <Alert bsStyle={message.status}>
                        {message.text}
                    </Alert>
                }
            </div>    
		);
	}
}