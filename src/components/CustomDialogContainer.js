import React, { Component } from 'react';
import CustomDialog from './CustomDialog';

export default class CustomDialogContainer extends Component {
	
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
	};	

	render() {

	    return (
	      <span>
	        <span onTouchTap={this.handleOpen}>{this.props.button}</span>
		    <div style={{"display" : "none"}} >    
		        <CustomDialog open={this.state.open} title={this.props.label} handleCancel={this.handleCancel} handleSubmit={this.handleSubmit}>
					 {this.props.children}
		        </CustomDialog>
		    </div>    
	      </span>
	    );
	}
}

CustomDialogContainer.propTypes = {
    label : React.PropTypes.string.isRequired,
    sendData : React.PropTypes.func.isRequired
};