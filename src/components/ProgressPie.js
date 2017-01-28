/*https://github.com/joshjg/react-canvas-knob*/

import React, { Component } from 'react';
import Knob from 'react-canvas-knob';

export default class ProgressPie extends Component {

  handleChange () {
    return;
  }

  render() {
    return (
        <Knob 
          value={this.props.percentage} 
          onChange={this.handleChange} 
          width={50} 
          height={50}
          readOnly={true}/>  
    );
  }
}