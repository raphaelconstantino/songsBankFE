import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class CustomDialog extends Component {

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

CustomDialog.propTypes = {
    title : React.PropTypes.string.isRequired,
  	handleCancel : React.PropTypes.func.isRequired,
  	handleSubmit : React.PropTypes.func.isRequired,
  	open : React.PropTypes.bool.isRequired 
};