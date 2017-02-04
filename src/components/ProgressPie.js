/*https://github.com/joshjg/react-canvas-knob*/

import React, { Component, PropTypes } from 'react';
import Knob from 'react-canvas-knob';

export default class ProgressPie extends Component {

  static propTypes = {
    percentage : PropTypes.number.isRequired,
    width : PropTypes.number.isRequired,
    height : PropTypes.number.isRequired
  }

  handleChange () {
    return;
  }

  render() {
    return (
        <Knob 
          value={this.props.percentage} 
          onChange={this.handleChange} 
          width={this.props.width} 
          height={this.props.height}
          readOnly={true}/>  
    );
  }
}