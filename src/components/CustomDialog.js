import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class CustomDialog extends Component {

	constructor () {
		super();
		this.state = { open : false };

	}

	static propTypes = {
		title : PropTypes.string.isRequired,
		sendData : PropTypes.func.isRequired,
	}

	handleOpen = () => {
		this.setState({open: true});
	};

	handleSubmit = () => {
		if (this.props.sendData())
		{
			this.setState({open: false});
		}
		
	};

	handleCancel = () => {
		this.setState({open: false});	
	};
	
	render() {
	    const actions = [
	      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleCancel} />,
	      <FlatButton label="Submit" primary={true} keyboardFocused={true} onTouchTap={this.handleSubmit} />,
	    ];

	    return (
	    	<span onTouchTap={this.handleOpen}>
				{this.props.button}
		        <Dialog title={this.props.title} actions={actions} modal={false} open={this.state.open} autoScrollBodyContent={true} >
					 {this.props.children}
		        </Dialog>
		    </span>    
	    );
	}
}