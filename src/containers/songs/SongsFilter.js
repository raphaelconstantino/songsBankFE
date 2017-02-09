import React, { Component, PropTypes } from 'react';
import CustomSelect from '../../components/CustomSelect';

export default class SongsFilter extends Component {

	static propTypes = {
		instrummentsList : PropTypes.array.isRequired,
		instrumments : PropTypes.string.isRequired,
		gendersList : PropTypes.array.isRequired,
		genders : PropTypes.string.isRequired,
		statusList : PropTypes.array.isRequired,
		status : PropTypes.string.isRequired,
		complexityList : PropTypes.array.isRequired,
		complexity : PropTypes.string.isRequired,
        setField : PropTypes.func.isRequired,
        reloadTable : PropTypes.func.isRequired,
    }

    render () {
        return (
            <div>

                <CustomSelect className="col-md-2" label="Status" value={this.props.status} name="status" change={this.props.setField.bind(this, "status")} list={this.props.statusList}/>
                <CustomSelect className="col-md-3" label="Genders" value={this.props.genders} name="genders" change={this.props.setField.bind(this, "genders")} list={this.props.gendersList}/>
                <CustomSelect className="col-md-3" label="Instrumments" value={this.props.instrumments} name="instrumments" change={this.props.setField.bind(this, "instrumments")} list={this.props.instrummentsList}/>
                <CustomSelect className="col-md-2" label="Complexity" value={this.props.complexity} name="complexity" change={this.props.setField.bind(this, "complexity")} list={this.props.complexityList}/>
                
                <div className="col-md-2 form-group btn-filter">	
                     <button className="btn btn-info" onClick={this.props.reloadTable.bind(this)}>Go</button>
                </div>


            </div>
        );
    }

}