import React, { Component } from 'react';
import {browserHistory} from  'react-router';
import HttpService from '../../util/HttpService';
import '../../css/login.css';

export default class Login extends Component {

    constructor(props){
        super(props);        
        this.state = {msg:this.props.location.query.msg};
    }

    envia(event){
        event.preventDefault();

        HttpService.post("authenticate", {login: this.login.value, password: this.senha.value})
        .then(response => {
                localStorage.setItem('auth-token', response['x-access-token']);
                browserHistory.push('/');
            });


    }

    render(){
        return (
            <div className="login-box">
                <h1 className="header-logo">Song Bank</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input) => this.login = input}/>
                    <input type="password" ref={(input) => this.senha = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        );
    }
}