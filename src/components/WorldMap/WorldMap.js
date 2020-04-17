import React,{Component, memo, useState} from "react";
import './WorldMap.css';
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";
import ReactTooltip from 'react-tooltip';
import ZoomInOutButtons from "../ZoomInOutButtons/ZoomInOutButtons";

const color1 = '#ffe5e5';
const color2 = '#ff8080';
const color3 = '#ff1a1a';
const color4 = '#b30000';
const color5 = '#4d0000';

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = ({country_stats, getRowFromObject, setClickedCountry}) => {
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
        let countryData = getRowFromObject(country_stats, 'country', countryName, countryNameLong);
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
        let countryData = getRowFromObject(country_stats, 'country', countryName, countryNameLong);
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
        let countryData = getRowFromObject(country_stats, 'country', countryName, countryNameLong);
        if(
            countryData.length > 0 &&
            Object.keys(countryData[0].stats) &&
            countryData[0].stats.length > 1
        ){
            setClickedCountry(countryData[0].country);
        }
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

    return (
        <div id="world_map_container">
            <ReactTooltip>{content}</ReactTooltip>
            <div className="indicator">
                <div style={getGradientStyle()} className="indicator-gradient"></div>
                <span>1 - 100000+ Active Cases</span>
            </div>
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
                                        fill={fillCountryColor(geo.properties.NAME, geo.properties.NAME_LONG)}
                                        onMouseEnter={() => {
                                            const { NAME, NAME_LONG, POP_EST } = geo.properties;
                                            setContent(getTooltipData(NAME, NAME_LONG, POP_EST))
                                        }}
                                        onMouseLeave={() => {
                                            setContent("");
                                        }}
                                        onClick={() => {
                                            checkIfCountryHasData(geo.properties.NAME, geo.properties.NAME_LONG);
                                        }}
                                        style={{
                                            hover: {
                                                fill: "#D6D6DA",
                                                outline: "none",
                                                cursor: "pointer"
                                            },
                                            pressed: {
                                                fill: "#E42",
                                                outline: "none"
                                            }
                                        }}
                                    />)
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        </div>
    );
};

export default memo(WorldMap);
