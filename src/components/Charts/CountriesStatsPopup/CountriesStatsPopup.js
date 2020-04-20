import React, {Component, Fragment} from "react";
import {Line} from "react-chartjs-2";
import Modal from "../../Modal/Modal";
import Backdrop from "../../Backdrop/Backdrop";

import './CountriesStatsPopup.css';

class CountriesStatsPopup extends Component{

    constructor(props) {
        super(props);
        this.state = {
            modalClassName : 'modal',
            singleChartData : {datasets: []},
            multipleChartsData : {
                'Confirmed' : {
                    labels : '',
                    datasets: []
                },
                'Deaths' : {
                    labels : '',
                    datasets: []
                },
                'Recovered' : {
                    labels : '',
                    datasets: []
                }
            }
        }
    }

    /**
     * create charts for single clicked country and country compare
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(
            this.props.modalOpen &&
            this.props.countriesSelected.length > 0
        ){
            if(
                this.props.countriesSelected.length === 1 &&
                prevProps.countriesSelected !== this.props.countriesSelected
            ){
                const countryName = this.props.countriesSelected[0];
                this.setState({
                    singleChartData: this.prepareSingleChart(countryName),
                    modalClassName: 'modal'
                })
            }else if(
                this.props.countriesSelected.length > 1 &&
                this.state.multipleChartsData.Confirmed.datasets.length === 0
            ){
                this.setState({
                    multipleChartsData: this.prepareMultipleCharts(this.props.countriesSelected),
                    modalClassName: 'modal_multi'
                })
            }
        }
    }

    /**
     * 16777215 == ffffff in decimal
     * @returns {string}
     */
    getRandomColor = () =>{
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    /**
     * render charts for multiple selected countries (compare mode)
     * @param selectedCountries
     * @returns {{Recovered: {datasets: [], labels: string}, Deaths: {datasets: [], labels: string}, Confirmed: {datasets: [], labels: string}}}
     */
    prepareMultipleCharts = (selectedCountries) =>{
        const multiCharts = {
            'Confirmed' : {
                labels : '',
                datasets: []
            },
            'Deaths' : {
                labels : '',
                datasets: []
            },
            'Recovered' : {
                labels : '',
                datasets: []
            }
        };

        selectedCountries.forEach(countryName => {
            const countryData = this.props.getRowFromObject(this.props.countryStats,'country',countryName);
            const {xTime, yConfirmed, yDeaths, yRecovered} = this.props.getChartData(countryData[0].stats);

            multiCharts.Confirmed.labels = xTime;
            multiCharts.Confirmed.datasets.push(
                {
                    label: countryName+' Confirmed Cases',
                    borderColor: this.getRandomColor(),
                    data: yConfirmed,
                    fill: false
                }
            );

            multiCharts.Deaths.labels = xTime;
            multiCharts.Deaths.datasets.push({
                label: countryName+' Death Cases',
                borderColor: this.getRandomColor(),
                data: yDeaths,
                fill: false
            });

            multiCharts.Recovered.labels = xTime;
            multiCharts.Recovered.datasets.push({
                label: countryName+' Recovered Cases',
                borderColor: this.getRandomColor(),
                data: yRecovered,
                fill: false
            });
        });
        return multiCharts;
    }

    /**
     * render chart
     * @param countryName
     */
    prepareSingleChart = (countryName) =>{
        const countryData = this.props.getRowFromObject(this.props.countryStats,'country',countryName);
        const {xTime, yConfirmed, yDeaths, yRecovered} = this.props.getChartData(countryData[0].stats);
        const newChartData = {datasets: []};
        newChartData.labels = xTime;
        newChartData.datasets.push({
            label: countryName+' Confirmed Cases',
            borderColor: this.props.confirmedColor,
            data: yConfirmed,
            fill: false
        });
        newChartData.datasets.push({
            label: countryName+' Death Cases',
            borderColor: this.props.deathsColor,
            data: yDeaths,
            fill: false
        });
        newChartData.datasets.push({
            label: countryName+' Recovered Cases',
            borderColor: this.props.recoveredColor,
            data: yRecovered,
            fill: false
        });
        return newChartData;
    };

    /**
     * when closing popup reset chart data
     */
    closeModal = () => {
        this.props.onCloseModal();
        this.setState({
            modalClassName: 'modal',
            chartData: {datasets: []},
            multipleChartsData : {
                'Confirmed' : {
                    labels : '',
                    datasets: []
                },
                'Deaths' : {
                    labels : '',
                    datasets: []
                },
                'Recovered' : {
                    labels : '',
                    datasets: []
                }
            }
        })
    };

    render() {
        return (this.props.modalOpen) ?(
            <Fragment>
                <Backdrop onClick={this.closeModal}/>
                <Modal
                    onCloseModal={this.closeModal}
                    modalClassName={this.state.modalClassName}
                >
                    {this.props.countriesSelected.length === 1 ? (
                        <Line
                            data={this.state.singleChartData}
                            options={this.props.chartOptions}
                        />
                    ) : null}
                    {this.props.countriesSelected.length > 1 ? (
                        <div className="multi-charts-wrapper">
                            <div className="chart-container">
                                <Line
                                    data={this.state.multipleChartsData.Confirmed}
                                    options={this.props.chartOptions}
                                />
                            </div>
                            <div className="chart-container">
                                <Line
                                    data={this.state.multipleChartsData.Deaths}
                                    options={this.props.chartOptions}
                                />
                            </div>
                            <div className="chart-container">
                                <Line
                                    data={this.state.multipleChartsData.Recovered}
                                    options={this.props.chartOptions}
                                />
                            </div>
                        </div>
                    ) : null}
                </Modal>
            </Fragment>
        ) : null;
    }
}

export default CountriesStatsPopup;