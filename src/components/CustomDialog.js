import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class CustomDialog extends Component {
	
	constructor () {
		super();
		this.state = { open : false };

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
	}

	render() {
	    const actions = [
	      <FlatButton label="Cancel" primary={true} onTouchTap={this.handleCancel} />,
	      <FlatButton label="Submit" primary={true} keyboardFocused={true} onTouchTap={this.handleSubmit} />,
	    ];

	    return (
	      <div>
	        <RaisedButton label={this.props.label} primary={true} onTouchTap={this.handleOpen} />
	        <Dialog title={this.props.label} actions={actions} modal={false} open={this.state.open} >
				 {this.props.children}
	        </Dialog>
	      </div>
	    );
	}
}

CustomDialog.propTypes = {
    refreshTable : React.PropTypes.func.isRequired,
    label : React.PropTypes.string.isRequired,
    sendData : React.PropTypes.func.isRequired
};