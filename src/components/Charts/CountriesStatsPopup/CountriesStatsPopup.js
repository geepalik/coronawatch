import React, {Component, Fragment} from "react";
import {Line} from "react-chartjs-2";
import Modal from "../../Modal/Modal";
import Backdrop from "../../Backdrop/Backdrop";

class CountriesStatsPopup extends Component{

    constructor(props) {
        super(props);
        this.state = {
            chartData : {datasets: []}
        }
    }

    /**
     * create chart for clicked country
     * TODO prepare case when comparing countries
     * @param prevProps
     * @param prevState
     * @param snapshot
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        //for now, one country
        const countryName = this.props.countriesSelected[0];
        if(countryName && prevProps.countriesSelected[0] !== countryName){
            this.prepareChart(countryName);
        }
    }

    /**
     * render chart
     * @param countryName
     */
    prepareChart = (countryName) =>{
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
        this.setState({chartData: newChartData})
    };

    /**
     * when closing popup reset chart data
     */
    closeModal = () => {
        this.props.onCloseModal();
        this.setState({chartData: {datasets: []}})
    };

    render() {
        return (this.props.countriesSelected.length >= 1 && this.props.modalOpen) ?(
            <Fragment>
                <Backdrop onClick={this.closeModal}/>
                <Modal
                    onCloseModal={this.closeModal}
                >
                    {this.state.chartData.datasets.length > 0 ? (
                        <Line
                            data={this.state.chartData}
                            options={this.props.chartOptions}
                        />
                    ) : null}
                </Modal>
            </Fragment>
        ) : null;
    }
}

export default CountriesStatsPopup;