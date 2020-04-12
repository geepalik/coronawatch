import React,{Component, memo, useState} from "react";
import './WorldMap.css';
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";
import ReactTooltip from 'react-tooltip';

const color1 = '#ffe5e5';
const color2 = '#ff8080';
const color3 = '#ff1a1a';
const color4 = '#b30000';
const color5 = '#4d0000';

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = ({country_stats}) => {
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

    function getRowFromObject(array, indexLookup,keyToRemove, alternativeKey){
        return array.filter(function (array) {
            return (array[indexLookup] === keyToRemove || array[indexLookup] === alternativeKey);
        });
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

    function getColorFromTotal(countryTotal) {
        if(countryTotal <= 999){return color1;} else
        if(countryTotal >= 1000 && countryTotal <= 9999){return color2;} else
        if(countryTotal >= 10000 && countryTotal <= 99999){return color3;} else
        if(countryTotal >= 100000){return color4;}
    }

    function fillCountryColor(countryName, countryNameLong) {
        let countryData = getRowFromObject(country_stats, 'country', countryName, countryNameLong);
        if(countryData.length === 0){
            console.log("couldnt fill color for country "+countryName);
        }else{
            if(countryData[0].country_total_stats && countryData[0].country_total_stats.hasOwnProperty('confirmed')){
                return getColorFromTotal(countryData[0].country_total_stats.confirmed);
            }else{
                console.log("Country "+countryName+" doesnt have confirmed value");
            }
        }
    }

    function getTooltipData(countryName, countryNameLong, population) {
        let countryData = getRowFromObject(country_stats, 'country', countryName, countryNameLong);
        let countryResults = "No data for "+countryName;
        if(
            countryData.length > 0 &&
            countryData[0].country_total_stats &&
            countryData[0].country_total_stats.hasOwnProperty('confirmed')
        ){
            const countryTotalStats = countryData[0].country_total_stats;
            countryResults =  countryName+" <br>Confirmed: "+countryTotalStats.confirmed+"<br>Deaths: "+countryTotalStats.deaths+"<br>Recovered: "+countryTotalStats.recovered;
        }
        return countryResults;
    }

    return (
        <div id="world_map_container">
            <ReactTooltip>{content}</ReactTooltip>
            <div id="svgMapWrapper">
                <div className="indicator">
                    <div style={getGradientStyle()} className="indicator-gradient"></div>
                    <span>1 - 100000+ Active Cases</span>
                </div>
                <ComposableMap
                    projection="geoMercator"
                    data-tip=""
                    data-html="true"
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
                                            //setContent(`${NAME} — ${POP_EST}`);
                                        }}
                                        onMouseLeave={() => {
                                            setContent("");
                                        }}
                                        onClick={() => {
                                            console.log(geo.properties.NAME);
                                        }}
                                        style={{
                                            hover: {
                                                fill: "#D6D6DA",
                                                outline: "none"
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
                <div className="controls">
                    <button onClick={handleZoomIn}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                    <button onClick={handleZoomOut}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="3"
                        >
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(WorldMap);
