import React, {Component, Fragment} from "react";
import axios from 'axios';
import Loader from 'react-loader-spinner';
import WorldMap from "../../components/WorldMap/WorldMap";


const apiUrl = "http://10.0.0.7:8080";

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

    render() {
        return (
            <Fragment>
                {this.state.loadingData ? (
                    <Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />
                ) : <WorldMap
                    country_stats = {this.state.countryStats}
                /> }
            </Fragment>
        )
    }
}

export default Stats;