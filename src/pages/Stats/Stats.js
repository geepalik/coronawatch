import React, {Component, Fragment} from "react";
import axios from 'axios';
import Loader from 'react-loader-spinner';
import WorldMap from "../../components/WorldMap/WorldMap";
import WorldChart from "../../components/Charts/WorldChart/WorldChart"

const apiUrl = "http://localhost:8080";

class Stats extends Component{

    state = {
        loadingData: true,
        totalWorldStats : {},
        countryStats : [],
    };

    componentDidMount() {
        try{
            this.getData().catch(err => {throw new Error('Failed to get data');});
        }catch (e) {
            //dialog box cant get fresh data
            //get from local storage
            throw new Error('Failed to get data');
        }
    }

    getData = async () => {
        const response = await axios(apiUrl+'/coronawatch/stats');
        const data = response.data;
        this.setState({loadingData: false});
        this.setState({totalWorldStats: data.world_stats[0]});
        this.setState({countryStats: data.country_stats});
    };

    /**
     * return dates (x axis) and stats (y axis) for charts
     * @param chartData
     * @returns {{yDeaths: [], yRecovered: [], xTime: [], yConfirmed: []}}
     */
    getChartData = (chartData) => {
        const xTime = [];
        const yConfirmed = [];
        const yDeaths = [];
        const yRecovered = [];

        chartData.forEach(row => {
            xTime.push(row.date);
            yConfirmed.push(row.confirmed);
            yDeaths.push(row.deaths);
            yRecovered.push(row.recovered);
        });
        return {xTime, yConfirmed, yDeaths, yRecovered};
    };

    render() {
        return (
            <Fragment>
                {this.state.loadingData ? (
                    <Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />
                ) : <WorldMap
                    country_stats = {this.state.countryStats}
                />
                }
                {this.state.loadingData ? (
                    <Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />
                ) : <WorldChart
                    worldStats = {this.state.totalWorldStats}
                    getChartData = {this.getChartData}
                />
                }
            </Fragment>
        )
    }
}

export default Stats;