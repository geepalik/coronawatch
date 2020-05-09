import React, {Fragment} from "react";
import CompareCountriesControls from "../CompareCountriesControls/CompareCountriesControls";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './CountriesList.css'

const comparedCountryElement = ".countries-list-container li[compare]";

const CountriesList = (props) => {

    function setClickedCountry(e, countryName) {
        props.setClickedCountry(countryName);
        if(props.compareMode){
            if(props.selectedCountries.indexOf(countryName) > -1){
                e.target.closest('.country-row').classList.remove('selected-country');
                e.target.closest('.country-row').removeAttribute('compare');
            }else{
                e.target.closest('.country-row').classList.add('selected-country');
                e.target.closest('.country-row').setAttribute('compare','true');
            }
        }
    }

    function clearSelected(){
        props.clearSelectedCountriesForCompare(comparedCountryElement, true)
    }

    return (
        <Fragment>
            <CompareCountriesControls
                clearSelected = {clearSelected}
                selectedCountries = {props.selectedCountries}
                compareMode = {props.compareMode}
                showCompareResults = {props.showCompareResults}
            />

            <div className="countries-list-container">
                <List component="nav">
                    {props.countryStats.map((countryData, i) => {
                        if(
                            !countryData.country_total_stats ||
                            !countryData.country_total_stats.hasOwnProperty('confirmed')
                        ) {
                            return ""
                        }
                        return (
                            <ListItem
                                key={i}
                                className="country-row"
                                data-id={countryData.country}
                                onClick={(event) => setClickedCountry(event, countryData.country)}
                            >
                                <ListItemText
                                    primary={countryData.country}
                                    secondary={
                                        <Fragment>
                                            <span style={{color:props.confirmedColor}}>
                                                Confirmed: {countryData['country_total_stats']['confirmed']}
                                            </span>
                                            <span className="country-indication" style={{color:props.deathsColor}}>
                                                Deaths: {countryData['country_total_stats']['deaths']}
                                            </span>
                                            <span className="country-indication" style={{color:props.recoveredColor}}>
                                                Recovered: {countryData['country_total_stats']['recovered']}
                                            </span>
                                        </Fragment>
                                    }/>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        </Fragment>
    );
}

export default CountriesList;