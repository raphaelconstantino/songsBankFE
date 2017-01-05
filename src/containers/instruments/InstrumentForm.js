import React, { Component, PropTypes } from 'react';
import CustomInput from '../../components/CustomInput';

export default class InstrumentForm extends Component {
	
	static propTypes = {
		name: PropTypes.string.isRequired,
		setName : PropTypes.func.isRequired,
		errorMsg : PropTypes.object
	}	
	
	render () {
		return (
	        <div className="row">
                <div className="col-lg-6">
                
                    <form role="form">

                        <CustomInput label="Instrument Name*" type="text" name="name" value={this.props.name} change={this.props.setName} error={this.props.errorMsg} />

                  </form>      

                </div>
            </div>

		);

	}

}	