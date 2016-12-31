import React, { Component } from 'react';
import CustomInput from '../../components/CustomInput';

export default class GendersForm extends Component {

	render () {
		return (
	        <div className="row">
                <div className="col-lg-6">
                
                    <form role="form">

                        <CustomInput label="Song Name*" type="text" name="name" value={this.props.name} change={this.props.setName} error={this.props.errorMsg} />

                  </form>      

                </div>
            </div>

		);

	}

}

GendersForm.propTypes = {
    name: React.PropTypes.string.isRequired,
    setName : React.PropTypes.func.isRequired,
    errorMsg : React.PropTypes.object
};


