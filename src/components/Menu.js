import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router'

export default class Menu extends Component {

  render() {
    return (
      <div>
        <Drawer open={this.props.open}>
            <MenuItem onTouchTap={this.props.handleToggle}><Link to="/dashboard"><i className="fa fa-fw fa-table"></i> Dashboard</Link></MenuItem>
            <MenuItem onTouchTap={this.props.handleToggle}><Link to="/songs"><i className="fa fa-fw fa-table"></i> Songs</Link></MenuItem>
            <MenuItem onTouchTap={this.props.handleToggle}><Link to="/genders"><i className="fa fa-fw fa-table"></i> Genders</Link></MenuItem>
            <MenuItem onTouchTap={this.props.handleToggle}><Link to="/instruments"><i className="fa fa-fw fa-table"></i> Instruments</Link></MenuItem>     
            <MenuItem onTouchTap={this.props.handleToggle}>Fechar</MenuItem>     
        </Drawer>
      </div>
    );
  }
}