/* https://github.com/kirjs/react-highcharts */

import React, { Component, PropTypes } from 'react';
import ReactHighcharts from 'react-highcharts';

export default class BarChart extends Component {
	
	static propTypes = {
		data : PropTypes.array.isRequired,
        name : PropTypes.string.isRequired
	}

    fnGetConfig () {
        return {
            chart: {
                type: 'column'
            },
            title: false,
            xAxis: {
                categories: [this.props.name],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Songs (number)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' songs'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: this.props.data
        }
    }

    render () {
		return (
           <ReactHighcharts config={this.fnGetConfig()}></ReactHighcharts>
		);
	}
}