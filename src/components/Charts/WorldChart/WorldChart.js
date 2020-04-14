import React,{Component} from "react";
import {Line} from "react-chartjs-2";
import './WorldChart.css';

const data = {
    datasets: []
};

const chartOptions = {
    responsive: true,
    scales: {
        xAxes: [{
            afterTickToLabelConversion: function(data){
                const xLabels = data.ticks;
                xLabels.forEach(function (labels, i) {
                    if (i % 2 === 1){
                        xLabels[i] = '';
                    }
                });
            }
        }]
    }
};

class WorldChart extends Component{

    render() {
        if(Object.keys(this.props.worldStats).length > 0 && data.datasets.length < 3){
            const {xTime, yConfirmed, yDeaths, yRecovered} = this.props.getChartData(this.props.worldStats.stats);
            data.labels = xTime;
            data.datasets.push({
                label: 'World Confirmed Cases',
                borderColor: ['red'],
                data: yConfirmed,
                fill: false
            });
            data.datasets.push({
                label: 'World Death Cases',
                borderColor: ['black'],
                data: yDeaths,
                fill: false
            });
            data.datasets.push({
                label: 'World Recovered Cases',
                borderColor: ['green'],
                data: yRecovered,
                fill: false
            });
        }

        return (
            <div id="world_chart_container">
                <h2>Worldwide statistics</h2>
                <Line
                    data={data}
                    options={chartOptions}
                />
            </div>
        );
    }
}

export default WorldChart;