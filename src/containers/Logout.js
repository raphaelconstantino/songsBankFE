import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Logout extends Component {

  static propTypes = {
    onLogoutClick: PropTypes.func.isRequired
  }

  render() {
    const { onLogoutClick } = this.props

    return (
      <button onClick={() => onLogoutClick()} className="btn btn-primary">
        <span className="glyphicon glyphicon-log-out"></span> Logout
      </button>
    )
  }

}