import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Login extends Component {

  static propTypes = {
    auth : PropTypes.object.isRequired,
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  }

  btnLabel (isFetching) {
    if (isFetching)
    {
      return "Processing...";
    }

    return "Login";
  }

  render() {
    const { errorMessage, auth } = this.props

    return (
      <div>
        <input type='text' ref='username' className="form-control" placeholder='Username'/>
        <input type='password' ref='password' className="form-control" placeholder='Password'/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          {this.btnLabel(auth.isFetching)}
        </button>

        {errorMessage &&
          <p>{errorMessage}</p>
        }
      </div>
    )
  }

  handleClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }
}