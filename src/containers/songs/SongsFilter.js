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

                <h4>Filters</h4>

                <CustomSelect label="Status" value={this.props.status} name="status" change={this.props.setField.bind(this, "status")} list={this.props.statusList}/>
                <button onClick={this.props.reloadTable.bind(this)}>Go</button>


            </div>
        );
    }

}