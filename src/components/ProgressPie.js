/*https://github.com/pguso/jquery-plugin-circliful*/

import React, { Component } from 'react';

export default class ProgressPie extends Component {

    componentDidMount () {
      var idVal = this.props.id;
      window.$("#" + idVal).circliful({
        animationStep: 15,
        foregroundBorderWidth: 10,
        backgroundBorderWidth: 15,
        fillColor : "#dcdcdc",
        fontColor : "#333",
        percent: 75
      });      
    }

    render() {
        return (
          <div className="row">
            <div className="col-lg-10">
                <div id={this.props.id}></div>
            </div>
          </div>
        );
    }
}