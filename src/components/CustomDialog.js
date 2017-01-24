import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class CustomDialog extends Component {

	static propTypes = {
		title : PropTypes.string.isRequired,
		handleCancel : PropTypes.func.isRequired,
		handleSubmit : PropTypes.func.isRequired,
		open : PropTypes.bool.isRequired 
	}

	render() {
	    const actions = [
	      <FlatButton label="Cancel" primary={true} onTouchTap={this.props.handleCancel} />,
	      <FlatButton label="Submit" primary={true} keyboardFocused={true} onTouchTap={this.props.handleSubmit} />,
	    ];

	    return (
	    	<div>
		        <Dialog title={this.props.title} actions={actions} modal={false} open={this.props.open} autoScrollBodyContent={true} >
					 {this.props.children}
		        </Dialog>
		    </div>    
	    );
	}
}