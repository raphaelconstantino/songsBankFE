import React, { Component, PropTypes } from 'react';
import SongsForm from './SongsForm';
import SongsUtil from './SongsUtil';
import HttpService from '../../util/HttpService';

export default class InsertSongBox extends Component {
	
	constructor () {
		super();
		this.state = { 
            gendersList : [], 
            instrummentsList : [], 
            complexityList : [], 
            statusList : [],
            name : "", 
            artist : "", 
            status : "", 
            complexity : "", 
            genders: "", 
            instrumments: "", 
            description : "", 
            errorMsg : {}
        };

        this.sendData = this.sendData.bind(this);
		this.validate = this.validate.bind(this);
		this.setField = this.setField.bind(this);
	}

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
		name: PropTypes.string
    }

	validate () {

		let error = {};
		let bInvalid = false;
		
		if (this.state.name === "")
		{
			error.name = { msg : "Please insert a valid Song Name" };
			bInvalid = true;
		}
		if (this.state.artist === "")
		{
			error.artist = { msg : "Please insert a valid Artist" };
			bInvalid = true;
		}
		if (this.state.status === "")
		{
			error.status = { msg : "Please insert a valid Status"} ;
			bInvalid = true;
		}

		this.setState({ errorMsg : error})

		return bInvalid;
	}

	sendData (e) {
        
        e.preventDefault();    

		if ( this.validate() )
		{
			return false;
		}

		let oData = {name : this.state.name, description : this.state.description, artist : this.state.artist, status:this.state.status, complexity : this.state.complexity, genders : this.state.genders, instrumments : this.state.instrumments}

		if (this.props.location.query.id)
		{
			oData.lastReview = this.state.lastReview;
		    HttpService.put("v1/songs/" + this.props.location.query.id, oData)
		      .then(response => {
					this.context.router.push('/songs');
				}); 
		} else
		{
			oData.lastReview = new Date();
			HttpService.post("v1/songs", oData)
				.then(response => {
					this.context.router.push('/songs');
				});
		}						


		return true;

	}

	setField (fieldName, e)
	{
		let field = {};
		field[fieldName] = e.target.value ;
		this.setState(field);
	}     

	componentDidMount() {

        if (this.props.location.query.id)
        {
		    HttpService.get("v1/songs/" + this.props.location.query.id)
			    .then(response => {
                    for (var o in response)
                    {
                        if (response.hasOwnProperty(o))
                        {
                            var obj = {}
                            obj[o] = response[o]
                            this.setState(obj); 
                        }       
                    }
                    
                });
        }                

		HttpService.get("v1/genders")
			.then(response => this.setState({gendersList : response}));

		HttpService.get("v1/instrumments")
			.then(response => this.setState({instrummentsList : response}));

		let listComplexity = [
			{_id : 1, name : "1"},
			{_id : 2, name : "2"},
			{_id : 3, name : "3"},
			{_id : 4, name : "4"},
			{_id : 5, name : "5"},
			{_id : 6, name : "6"},
			{_id : 7, name : "7"},
			{_id : 8, name : "8"},
			{_id : 9, name : "9"},
			{_id : 10, name : "10"}
		];

		this.setState({complexityList : listComplexity});

		this.setState({statusList : SongsUtil.getStatus()});            

	} 

	render () {
		return (
			<div>
				<h2>Insert Song</h2>
				<SongsForm 
					name={this.state.name} 
					artist={this.state.artist}
					genders={this.state.genders}
					listGenders={this.state.gendersList}
					complexity={this.state.complexity} 
					listComplexity={this.state.complexityList}
					status={this.state.status}
					listStatus={this.state.statusList}
					description={this.state.description}
					instrumments={this.state.instrumments}
					listInstrumments={this.state.instrummentsList}
					setField={this.setField} 
					errorMsg={this.state.errorMsg} 
                    sendData={this.sendData}/>
	        </div>
		);
	}

}
