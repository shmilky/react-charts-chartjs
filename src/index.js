// import React, {PropTypes} from 'react';
// import ReactDOM from 'react-dom';
// import Chart from 'chart.js';
var React = require('react');
var PropTypes= React.PropTypes;
// import ReactDOM from 'react-dom';
var Chart = require('chart.js');

var createChartClassByType = function(chartType) {
    return React.createClass({
        displayName: 'LineChart',

        propTypes: {
            chartId: PropTypes.string.isRequired,
            chartData: PropTypes.object.isRequired,
            legend: PropTypes.object,
            options: PropTypes.object,
            redraw: PropTypes.bool
        },

        getDefaultProps() {
            return {
                redraw: false
            };
        },

        componentWillMount() {
            this.chart_instance = undefined;
        },

        componentDidMount() {
            this.renderChart();
        },

        componentDidUpdate() {
            if (this.props.redraw) {
                this.chart_instance.destroy();
                this.renderChart();
            } else {
                this.updateChart();
            }
        },

        componentWillUnmount() {
            this.chart_instance.destroy();
        },

        updateChart() {
            const {chartData, chartOptions} = this.props;

            if (!this.chart_instance) return;

            if (chartOptions) {
                Chart.helpers.configMerge(this.chart_instance.options, chartOptions);
            }

            this.chart_instance.data.datasets = chartData.datasets;
            this.chart_instance.data.labels = chartData.labels;


            this.chart_instance.update();
        },

        renderChart() {
            const {chartData, chartId, chartOptions, globalConfig} = this.props;

            Object.assign(Chart.defaults.global, globalConfig);

            var ctx = document.getElementById(chartId).getContext("2d");
            this.chart_instance = new Chart(ctx, {
                type: chartType,
                data: chartData,
                options: chartOptions
            });
        },

        render() {
            return React.createElement('canvas', { style: { width: '100%', height: '100%' }, id: this.props.chartId });
        }
    });
};

module.exports.LineChart = createChartClassByType('line');

module.exports.PieChart = createChartClassByType('pie');

module.exports.DoughnutChart = createChartClassByType('doughnut');
