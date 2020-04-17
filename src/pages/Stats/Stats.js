import React, {Component, Fragment} from "react";
import axios from 'axios';
import Loader from 'react-loader-spinner';
import WorldMap from "../../components/WorldMap/WorldMap";
import WorldChart from "../../components/Charts/WorldChart/WorldChart"
import CountriesStatsPopup from "../../components/CountriesStatsPopup/CountriesStatsPopup";

const apiUrl = "http://localhost:8080";
const confirmedColor = 'red';
const deathsColor = 'black';
const recoveredColor = 'green';

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
            },
            gridLines: {
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false
            }
        }]
    }
};

class Stats extends Component{

    state = {
        loadingData: true,
        totalWorldStats : {},
        countryStats : [],
        countriesSelected: [],
        compareMode: false,
        isModalOpen: false
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

    /**
     *
     * @param array
     * @param indexLookup
     * @param keyToRemove
     * @param alternativeKey
     * @returns {*}
     */
    getRowFromObject = (array, indexLookup,keyToRemove, alternativeKey) =>{
        return array.filter(function (array) {
            return (array[indexLookup] === keyToRemove || array[indexLookup] === alternativeKey);
        });
    };

    /**
     * set clicked countries from map
     * @param country
     */
    setSelectedCountries = (country) =>{
        if(this.state.compareMode){
            if(this.state.countriesSelected.indexOf(country) === -1){
                this.setState({
                    countriesSelected: [...this.state.countriesSelected, country]
                });
            }
        }else{
            this.setState({
                countriesSelected: [country],
                isModalOpen: true
            });
        }
    };

    setCompareMode = () =>{
        this.setState({
            compareMode: !this.state.compareMode,
            countriesSelected: []
        })
    };

    closeCurrentModal = () => {
        this.setState({
            isModalOpen: false,
            countriesSelected: []
        })
    };

    render() {
        return (
            <Fragment>
                <CountriesStatsPopup
                    modalOpen={this.state.isModalOpen}
                    countriesSelected={this.state.countriesSelected}
                    countryStats = {this.state.countryStats}
                    worldStats = {this.state.totalWorldStats}
                    getRowFromObject = {this.getRowFromObject}
                    getChartData = {this.getChartData}
                    onCloseModal={this.closeCurrentModal}
                    confirmedColor={confirmedColor}
                    deathsColor={deathsColor}
                    recoveredColor={recoveredColor}
                    chartOptions={chartOptions}
                />
                {this.state.loadingData ? (
                    <Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />
                ) : <WorldMap
                    country_stats = {this.state.countryStats}
                    getRowFromObject = {this.getRowFromObject}
                    setClickedCountry = {this.setSelectedCountries}
                    compareMode = {this.state.compareMode}
                    setCompareMode = {this.setCompareMode}
                />
                }
                {this.state.loadingData ? (
                    <Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />
                ) : <WorldChart
                    worldStats = {this.state.totalWorldStats}
                    getChartData = {this.getChartData}
                    confirmedColor={confirmedColor}
                    deathsColor={deathsColor}
                    recoveredColor={recoveredColor}
                    chartOptions={chartOptions}
                />
                }
            </Fragment>
        )
    }
}

export default Stats;