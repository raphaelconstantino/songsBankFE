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
        percent: this.props.percentage
      });      
    }

    render() {
        return (
          <div>
            <div>
                <div className="col-md-8" id={this.props.id}></div>
            </div>
          </div>
        );
    }
}