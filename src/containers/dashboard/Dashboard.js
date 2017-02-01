/* https://github.com/kirjs/react-highcharts */
import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import HttpService from '../../util/HttpService';

export default class DashboardBox extends Component {

	constructor () {
		super();
		this.state = { gendersCount : []};
	}

	componentDidMount() {
		
		HttpService.get("v1/gendersCount")
			.then(response => this.setState({gendersCount : response}));

	}

	fnConvertToGraphObj () {
		return this.state.gendersCount.map((o, i) => { return {name : o._id, y : o.total} });
	}

    render () {
		const config = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Songs Genders'
            },
            tooltip: {
                pointFormat: '<b>{point.y}</b> songs: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Genders',
                colorByPoint: true,
                data: this.fnConvertToGraphObj()
            }]
        }

		return (
			<div>
				<h2>Dashboard</h2>
				<ReactHighcharts config={config}></ReactHighcharts>
	        </div>
		);
	}

}