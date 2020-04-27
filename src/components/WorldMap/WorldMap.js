import React,{memo, useState} from "react";
import './WorldMap.css';
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";
import ReactTooltip from 'react-tooltip';
import ZoomInOutButtons from "../ZoomInOutButtons/ZoomInOutButtons";
import CompareCountriesControls from "../CompareCountriesControls/CompareCountriesControls";

const color1 = '#ffe5e5';
const color2 = '#ff8080';
const color3 = '#ff1a1a';
const color4 = '#b30000';
const color5 = '#4d0000';

const comparedCountryElement = "#svg_map_wrapper>svg g.rsm-geographies>path[compare]";

//TODO
//when loading component check if URL returns content
//else show message
const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = ({countryStats, getRowFromObject, selectedCountries, setClickedCountry, compareMode, clearSelectedCountriesForCompare, showCompareResults}) => {
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
    const [content, setContent] = useState("");

    function handleZoomIn () {
        if(position.zoom >= 4) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom * 2}));
    }

    function handleZoomOut () {
        if(position.zoom <= -1) return;
        setPosition(pos => ({ ...pos, zoom: pos.zoom / 2}));
    }

    function handleMoveEnd(position) {
        setPosition(position);
    }

    /**
     *
     * @returns {{background: string}}
     */
    function getGradientStyle() {
        return {
            background: 'linear-gradient(90deg, '+color1+' 0, '+color5+' 100%)'
        }
    }

    /**
     *
     * @param countryTotal
     * @returns {string}
     */
    function getColorFromTotal(countryTotal) {
        if(countryTotal <= 999){return color1;} else
        if(countryTotal >= 1000 && countryTotal <= 9999){return color2;} else
        if(countryTotal >= 10000 && countryTotal <= 99999){return color3;} else
        if(countryTotal >= 100000){return color4;}
    }

    //TODO
    //this and next function
    //calculate fill color and hoverdata when loading the component (oncomponentmount)
    //and add to country data to be shown when hovering
    //instead of calculating when hovering and loading
    function fillCountryColor(countryName, countryNameLong) {
        let countryData = getRowFromObject(countryStats, 'country', countryName, countryNameLong);
        if(countryData.length === 0){
            //console.log("couldnt fill color for country "+countryName);
            //log or show if we dont have data for this country
        }else{
            if(countryData[0].country_total_stats && countryData[0].country_total_stats.hasOwnProperty('confirmed')){
                return getColorFromTotal(countryData[0].country_total_stats.confirmed);
            }else{
                //console.log("Country "+countryName+" doesnt have confirmed value");
                //log or show if we dont have confirmed data for this country
            }
        }
    }

    /**
     *
     * @param countryName
     * @param countryNameLong
     * @param population
     * @returns {string}
     */
    function getTooltipData(countryName, countryNameLong, population) {
        let countryData = getRowFromObject(countryStats, 'country', countryName, countryNameLong);
        let countryResults = "No data for "+countryName;
        if(
            countryData.length > 0 &&
            countryData[0].country_total_stats &&
            countryData[0].country_total_stats.hasOwnProperty('confirmed')
        ){
            const countryTotalStats = countryData[0].country_total_stats;
            countryResults =  countryName+" <br>Confirmed: "+countryTotalStats.confirmed+" ("+calculatePercentage(population,countryTotalStats.confirmed)+"% of population)<br>Deaths: "+countryTotalStats.deaths+"<br>Recovered: "+countryTotalStats.recovered;
        }
        return countryResults;
    }

    /**
     * check if country has valid timeline statistics
     * only then show popup
     * @param countryName
     * @param countryNameLong
     */
    function checkIfCountryHasData(countryName, countryNameLong) {
        const countryData = getRowFromObject(countryStats, 'country', countryName, countryNameLong);
        let apiCountryName = "";
        if(
            countryData.length > 0 &&
            countryData[0].stats.length > 1 &&
            countryData[0].country_total_stats
        ){
            setClickedCountry(countryData[0].country);
            apiCountryName = countryData[0].country;
        }
        return apiCountryName;
    }

    /**
     *
     * @param mainNumber
     * @param percentage
     * @returns {string}
     */
    function calculatePercentage(mainNumber, percentage) {
        return Number((percentage / mainNumber)*100).toFixed(2);
    }



    /**
     * check if compare mode and if function returns nonempty string
     * that means its a country with valid data
     * if exists in array of comparedCountries already
     * set the color to original fill depending on cases
     *
     * @param clickedCountry
     * @param countryName
     * @param countryLongName
     */
    function clickCountryOperations(clickedCountry, countryName, countryLongName) {
        const apiCountryName = checkIfCountryHasData(countryName, countryLongName);
        if(compareMode && apiCountryName.length > 0){
            if(selectedCountries.indexOf(apiCountryName) > -1){
                //clear indication of comparing
                clickedCountry.target.style.fill = clickedCountry.target.getAttribute('statcolor');
                clickedCountry.target.removeAttribute("compare");
            }else{
                //set indication for comparing
                clickedCountry.target.style.fill = "#0400FF";
                clickedCountry.target.setAttribute("compare","true");
            }
        }
    }

    function clearSelected() {
        clearSelectedCountriesForCompare(comparedCountryElement)
    }

    return (
        <div id="world_map_container">
            <ReactTooltip>{content}</ReactTooltip>
            <CompareCountriesControls
                clearSelected = {clearSelected}
                selectedCountries = {selectedCountries}
                compareMode = {compareMode}
                showCompareResults = {showCompareResults}
            />
            <ZoomInOutButtons
                handleZoomIn={handleZoomIn}
                handleZoomOut={handleZoomOut}
            />
            <div id="svg_map_wrapper">
                <ComposableMap
                    projection="geoMercator"
                    data-tip=""
                    data-html="true"
                    height={500}
                >
                    <ZoomableGroup
                        zoom={position.zoom}
                        center={position.coordinates}
                        onMoveEnd={handleMoveEnd}
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map(geo =>
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        statcolor={fillCountryColor(geo.properties.NAME, geo.properties.NAME_LONG)}
                                        fill={fillCountryColor(geo.properties.NAME, geo.properties.NAME_LONG)}
                                        onMouseEnter={(event) => {
                                            if(!compareMode){
                                                event.target.style.fill = "#D6D6DA";
                                            }
                                            const { NAME, NAME_LONG, POP_EST } = geo.properties;
                                            setContent(getTooltipData(NAME, NAME_LONG, POP_EST))
                                        }}
                                        onMouseLeave={(event) => {
                                            if(!compareMode){
                                                event.target.style.fill = event.target.getAttribute('statcolor');
                                            }
                                            setContent("");
                                        }}
                                        onClick={(event) => {
                                            clickCountryOperations(event, geo.properties.NAME, geo.properties.NAME_LONG);
                                        }}
                                    />)
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
            <div className="indicator">
                <div style={getGradientStyle()} className="indicator-gradient"></div>
                <span style={{color:"white"}}>1 - 100K+ Confirmed COVID-19 Cases</span>
            </div>
        </div>
    );
};

export default memo(WorldMap);
