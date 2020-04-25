import React, {Fragment} from "react";
import CompareCountriesControls from "../CompareCountriesControls/CompareCountriesControls";
import './CountriesList.css'

const comparedCountryElement = ".countries-list-container li[compare]";

const CountriesList = (props) => {

    function setClickedCountry(e) {
        const countryName = e.target.dataset.id;
        props.setClickedCountry(countryName);
        if(props.compareMode){
            if(props.selectedCountries.indexOf(countryName) > -1){
                e.target.classList.remove('selected-country');
                e.target.removeAttribute('compare');
            }else{
                e.target.classList.add('selected-country');
                e.target.setAttribute('compare','true');
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
            <ul className="countries-list-container">
                {props.countryStats.map((countryData, i) => {
                    if(countryData.country_total_stats && countryData.country_total_stats.hasOwnProperty('confirmed')){
                        return (
                            <li
                                className="country-row"
                                key={i}
                                data-id={countryData.country}
                                onClick={setClickedCountry}
                            >
                                <span>{countryData.country}</span>
                                <span style={{color:props.confirmedColor}}>Confirmed: {countryData['country_total_stats']['confirmed']}</span>
                                <span>Deaths: {countryData['country_total_stats']['deaths']}</span>
                                <span>Recovered: {countryData['country_total_stats']['recovered']}</span>
                            </li>
                        );
                    }
                })}
            </ul>
        </Fragment>
    );
}

export default CountriesList;