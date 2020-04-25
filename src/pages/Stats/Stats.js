import React, {Component, Fragment} from "react";
import axios from 'axios';
import Loader from 'react-loader-spinner';
import WorldMap from "../../components/WorldMap/WorldMap";
import WorldChart from "../../components/Charts/WorldChart/WorldChart"
import CountriesStatsPopup from "../../components/Charts/CountriesStatsPopup/CountriesStatsPopup";
import CountriesList from "../../components/CountriesList/CountriesList";
import './Stats.css';

const apiUrl = "http://localhost:8080";
const confirmedColor = 'red';
const deathsColor = 'black';
const recoveredColor = 'green';

const chartOptions = {
    scales: {
        xAxes: [{
            ticks: {
                maxTicksLimit: 10
            },
            gridLines: {
                display: false
            }
        }],
        yAxes: [{
            ticks: {
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

class Stats extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loadingData: true,
            totalWorldStats : {},
            countryStats : [],
            countriesSelected: [],
            compareMode: false,
            isModalOpen: false,
            width: window.innerWidth
        };
    }

    componentDidMount() {
        try{
            this.getData().catch(err => {throw new Error('Failed to get data');});
            window.addEventListener('resize', this.handleWindowSizeChange)
        }catch (e) {
            //dialog box cant get fresh data
            //get from local storage
            throw new Error('Failed to get data');
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange)
    }

    handleWindowSizeChange = () => {
        this.setState({width: window.innerWidth})
    };

    getData = async () => {
        const response = await axios(apiUrl+'/coronawatch/stats');
        const data = response.data;
        this.setState({
            loadingData: false,
            totalWorldStats: data.world_stats[0],
            countryStats: data.country_stats
        });
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
     * set clicked countries from map or list
     * @param country
     */
    setSelectedCountries = (country) =>{
        if(this.state.compareMode){
            //if a country is clicked again, remove from array
            if(this.state.countriesSelected.indexOf(country) > -1){
                const countriesSelectedCopy = [...this.state.countriesSelected];
                countriesSelectedCopy.splice(countriesSelectedCopy.indexOf(country),1);
                this.setState({
                    countriesSelected: countriesSelectedCopy
                })
            }else{
                //else add to array of selected countries
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
        });
    };

    closeCurrentModal = () => {
        this.setState({isModalOpen: false});
    };

    showCompareResults = () => {
        if(
            this.state.countriesSelected.length > 1 &&
            this.state.compareMode
        ){
            this.setState({
                isModalOpen: true
            });
        }
    }

    /**
     * when toggling checkbox to compare countries
     * clear countries that are selected already
     * @param comparedCountryElement
     * @param list
     */
    clearSelectedCountriesForCompare = (comparedCountryElement, list = false) => {
        const selectedCountries = document.querySelectorAll(comparedCountryElement);
        Object.entries(selectedCountries).forEach((object) => {
            if(!list){
                object[1].style.fill = object[1].getAttribute('statcolor');
            }else{
                object[1].classList.remove('selected-country');
            }
            object[1].removeAttribute('compare');
        });
         this.setCompareMode();
    }

    render() {
        //hide map in small screens
        const {width} = this.state;
        const countriesContent = (width <= 850) ?
            <CountriesList
                countryStats = {this.state.countryStats}
                setClickedCountry = {this.setSelectedCountries}
                selectedCountries = {this.state.countriesSelected}
                compareMode = {this.state.compareMode}
                clearSelectedCountriesForCompare = {this.clearSelectedCountriesForCompare}
                showCompareResults = {this.showCompareResults}
                confirmedColor={confirmedColor}
                deathsColor={deathsColor}
                recoveredColor={recoveredColor}
            /> :
            <WorldMap
                countryStats = {this.state.countryStats}
                getRowFromObject = {this.getRowFromObject}
                selectedCountries = {this.state.countriesSelected}
                setClickedCountry = {this.setSelectedCountries}
                compareMode = {this.state.compareMode}
                clearSelectedCountriesForCompare = {this.clearSelectedCountriesForCompare}
                showCompareResults = {this.showCompareResults}
            />
        ;

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
                ) :
                    <div className="stats-container">
                        <div className="stats-child">
                            {countriesContent}
                        </div>
                        <div className="stats-child">
                            <WorldChart
                                worldStats = {this.state.totalWorldStats}
                                getChartData = {this.getChartData}
                                confirmedColor={confirmedColor}
                                deathsColor={deathsColor}
                                recoveredColor={recoveredColor}
                                chartOptions={chartOptions}
                            />
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}

export default Stats;