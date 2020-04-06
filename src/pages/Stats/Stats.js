import React, {Component, Fragment} from "react";
import Loader from 'react-loader-spinner';
import WorldMap from "../../components/WorldMap/WorldMap";


const apiUrl = "http://localhost:8080";

class Stats extends Component{

    state = {
        loadingData: true,
        totalWorldStats : {},
        countryStats : {},
    };

    componentDidMount() {
        fetch(apiUrl+'/coronawatch/stats')
            .then(res => {
                if(res.status !== 200){
                    throw new Error('Failed to get data');
                }
                return res.json();
            })
            .then(resData => {
                this.setState({loadingData: false});
                this.setState({totalWorldStats: resData.total_world_stats});
                this.setState({countryStats: resData.country_stats});
                //console.log(resData);
            })
            .catch(err => {
                //dialog box cant get fresh data
                //get from local storage
                throw new Error('Failed to get data');
            });
    }
    render() {
        return (
            <Fragment>
                {this.state.loadingData ? (
                    <Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />
                ) : <WorldMap
                    country_stats = {this.state.countryStats}
                    testVal = "hello"
                /> }
            </Fragment>
        )
    }
}

export default Stats;