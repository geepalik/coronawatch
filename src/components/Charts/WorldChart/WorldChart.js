import React from "react";
import {Line} from "react-chartjs-2";
import './WorldChart.css';

const WorldChart = (props) => {

    function prepareChartData(){
        const data = {
            datasets: []
        };
        if(Object.keys(props.worldStats).length > 0){
            const {xTime, yConfirmed, yDeaths, yRecovered} = props.getChartData(props.worldStats.stats);
            data.labels = xTime;
            data.datasets.push({
                label: 'World Confirmed Cases',
                borderColor: props.confirmedColor,
                data: yConfirmed,
                fill: false
            });
            data.datasets.push({
                label: 'World Death Cases',
                borderColor: props.deathsColor,
                data: yDeaths,
                fill: false
            });
            data.datasets.push({
                label: 'World Recovered Cases',
                borderColor: props.recoveredColor,
                data: yRecovered,
                fill: false
            });
        }
        return data;
    }

    return (
        <div id="world_chart_container">
            <h2>Worldwide Statistics</h2>
            <Line
                data={prepareChartData()}
                options={props.chartOptions}
            />
        </div>
    );
};

export default WorldChart;