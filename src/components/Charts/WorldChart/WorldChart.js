import React,{Fragment} from "react";
import {Line} from "react-chartjs-2";
import './WorldChart.css';

const WorldChart = (props) => {

    /**
     *
     * @returns {{datasets: []}}
     */
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

    /**
     *
     * @returns {{legend: {labels: {fontColor: string}}, scales: {yAxes: [{ticks: {callback: function(*): *, fontColor: string}, gridLines: {display: boolean}}], xAxes: [{ticks: {maxTicksLimit: number, fontColor: string}, gridLines: {display: boolean}}]}}}
     */
    function modifyOptions() {
        return  {
            legend: {
                labels: {
                    fontColor: "white",
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        maxTicksLimit: 10,
                        fontColor: "white"
                    },
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        callback: function (label) {
                            let labelString = label;
                            if(label > 999 && label <= 999999){
                                labelString = label/1000+'K';
                            }else if(label >= 1000000){
                                labelString = label/1000000+'M';
                            }
                            return labelString;
                        }
                    },
                    gridLines: {
                        display: false
                    }
                }]
            }
        };
    }

    return (
        <Fragment>
            <h2 style={{color:"white"}}>Worldwide Statistics</h2>
            <div id="world_chart_container">
                <Line
                    data={prepareChartData()}
                    options={modifyOptions()}
                />
            </div>
        </Fragment>
    );
};

export default WorldChart;