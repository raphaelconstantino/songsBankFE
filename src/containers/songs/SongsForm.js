import React, { Component } from 'react';
import CustomInput from '../../components/CustomInput';
import CustomSelect from '../../components/CustomSelect';

export default class SongsForm extends Component {

	render () {
		return (
	        <div className="row">
                <div className="col-lg-12">
                
                    <form role="form">

                        <CustomInput label="Song Name*" type="text" name="name" value={this.props.name} change={this.props.setField.bind(this, "name")} error={this.props.errorMsg} />
                        <CustomInput label="Artist Name*" type="text" name="artist" value={this.props.artist} change={this.props.setField.bind(this, "artist")} error={this.props.errorMsg} />
                        <CustomSelect label="Status*" value={this.props.status} name="status" change={this.props.setField.bind(this, "status")} list={this.props.listStatus} error={this.props.errorMsg}/>
                        <CustomInput label="Description" type="text" name="description" value={this.props.description} change={this.props.setField.bind(this, "description")} />
						<CustomSelect label="Complexity" value={this.props.complexity} name="complexity" change={this.props.setField.bind(this, "complexity")} list={this.props.listComplexity} />
						<CustomSelect label="Gender" value={this.props.genders} name="genders" change={this.props.setField.bind(this, "genders")} list={this.props.listGenders} />
						<CustomSelect label="Instrument" value={this.props.instrumments} name="instrumments" change={this.props.setField.bind(this, "instrumments")} list={this.props.listInstrumments} />

                  </form>      

                </div>
            </div>

		);

	}

}

SongsForm.propTypes = {
    name: React.PropTypes.string.isRequired,
    artist: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    listStatus : React.PropTypes.array.isRequired,
    description : React.PropTypes.string.isRequired,
    complexity : React.PropTypes.string.isRequired,
    listComplexity : React.PropTypes.array.isRequired,
    genders : React.PropTypes.string.isRequired,
    listGenders : React.PropTypes.array.isRequired,
    instrumments : React.PropTypes.string.isRequired,
    listInstrumments : React.PropTypes.array.isRequired,
    setField : React.PropTypes.func.isRequired,
    errorMsg : React.PropTypes.object
};