/* https://github.com/kirjs/react-highcharts */

import React, { Component, PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';

export default class PieChart extends Component {
	
	static propTypes = {
		data : PropTypes.array.isRequired,
        name : PropTypes.string.isRequired
	}

    fnGetConfig () {
        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: false,
            tooltip: {
                pointFormat: '<b>{point.y}</b> songs: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
						enabled: false,
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: this.props.name,
                colorByPoint: true,
                data: this.props.data
            }]
        }
    }

    render () {
		return (
           <ReactHighcharts config={this.fnGetConfig()}></ReactHighcharts>
		);
	}
}