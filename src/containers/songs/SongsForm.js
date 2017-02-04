import React, { Component, PropTypes } from 'react';
import CustomInput from '../../components/CustomInput';
import CustomSelect from '../../components/CustomSelect';

export default class SongsForm extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		artist: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		listStatus : PropTypes.array.isRequired,
		description : PropTypes.string.isRequired,
		complexity : PropTypes.string.isRequired,
		listComplexity : PropTypes.array.isRequired,
		genders : PropTypes.string.isRequired,
		listGenders : PropTypes.array.isRequired,
		instrumments : PropTypes.string.isRequired,
		listInstrumments : PropTypes.array.isRequired,
		setField : PropTypes.func.isRequired,
		errorMsg : PropTypes.object,
		sendData : PropTypes.func.isRequired
	}

	render () {
		return (
	        <div className="row">
                <div className="col-lg-12">
                
                    <form role="form" onSubmit={this.props.sendData}>

                        <CustomInput label="Song Name*" type="text" name="name" value={this.props.name} change={this.props.setField.bind(this, "name")} error={this.props.errorMsg} />
                        <CustomInput label="Artist Name*" type="text" name="artist" value={this.props.artist} change={this.props.setField.bind(this, "artist")} error={this.props.errorMsg} />
                        <CustomSelect label="Status*" value={this.props.status} name="status" change={this.props.setField.bind(this, "status")} list={this.props.listStatus} error={this.props.errorMsg}/>
                        <CustomInput label="Description" type="text" name="description" value={this.props.description} change={this.props.setField.bind(this, "description")} />
						<CustomSelect label="Complexity" value={this.props.complexity} name="complexity" change={this.props.setField.bind(this, "complexity")} list={this.props.listComplexity} />
						<CustomSelect label="Gender" value={this.props.genders} name="genders" change={this.props.setField.bind(this, "genders")} list={this.props.listGenders} />
						<CustomSelect label="Instrument" value={this.props.instrumments} name="instrumments" change={this.props.setField.bind(this, "instrumments")} list={this.props.listInstrumments} />
						<button className="btn btn-info" type="submit">Submit</button>
                  </form>      

                </div>
            </div>

		);

	}

}