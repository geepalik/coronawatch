import React,{Component} from "react";
import './WorldMap.css';
import WorldMapSvg from "./WorldMapSvg";

const color1 = '#ffe5e5';
const color2 = '#ff8080';
const color3 = '#ff1a1a';
const color4 = '#b30000';
const color5 = '#4d0000';

class WorldMap extends Component{

    /**
     *
     * @param countryName
     * @param countryStats
     */
    renderCountryInMap = (countryName, countryStats) => {
        const svgCountry = document.querySelector('[title="'+countryName+'"]');
        //fill country with color depending on value of total confirmed cases
        if(svgCountry && countryStats && countryStats.hasOwnProperty('confirmed')){
            const svgStatShow = countryStats.confirmed;
            svgCountry.style.fill = this.fillCountryColor(svgStatShow);
            svgCountry.setAttribute("datainfo","<p>"+countryName+"</p><p>Confirmed:"+countryStats.confirmed+"</p><p>Deaths:"+countryStats.deaths+"<p><p>Recovered:"+countryStats.recovered+"<p>");
        }else{
            svgCountry.setAttribute("datainfo","<p>"+countryName+"</p><p>No data</p>");
            console.log("could not fill country "+countryName);
        }
    };

    /**
     *
     * @param countryTotal
     * @returns {string}
     */
    fillCountryColor = (countryTotal) => {
        if(countryTotal <= 999){return color1;} else
        if(countryTotal >= 1000 && countryTotal <= 9999){return color2;} else
        if(countryTotal >= 10000 && countryTotal <= 99999){return color3;} else
        if(countryTotal >= 100000){return color4;}
    };

    /**
     *
     * @param countryStats
     */
    initMap = (countryStats) =>{
        countryStats.forEach(country =>{
            this.renderCountryInMap(country.country,country.country_total_stats);
        });
    };

    /**
     *
     * @param array
     * @param indexLookup
     * @param keyToRemove
     * @returns {*}
     */
    getRowFromObject = (array, indexLookup,keyToRemove) =>{
        return array.filter(function (array) {
            return array[indexLookup] === keyToRemove;
        });
    };

    /**
     *
     * @param event
     */
    showTooltip = (event) => {
        document.getElementById("tooltip").classList.add("active");
        document.getElementById("tooltip").innerHTML = event.target.getAttribute("datainfo");
    };

    hideTooltip = () => {
        document.getElementById("tooltip").classList.remove("active");
        document.getElementById("tooltip").style.top = "";
        document.getElementById("tooltip").style.left = "";
        document.getElementById("tooltip").innerHTML = "";
    };

    /**
     *
     * @param event
     */
    moveTooltip = (event) => {
        document.getElementById("tooltip").setAttribute("style","top:"+event.pageY+"px; left:"+event.pageX+"px;");
    };

    /**
     *
     * @param event
     */
    clickCountry = (event) => {
        const countryName = event.target.getAttribute("title");
        const countryData = this.getRowFromObject(this.props.country_stats, 'country', countryName);
        //update chart here
        console.log(countryData);
    };

    render() {
        this.initMap(this.props.country_stats);

        return (
            <div id="world_map_container">
                <div id="tooltip"></div>
                <div id="svgMapWrapper">
                    <WorldMapSvg
                        onClick={this.clickCountry}
                        onMouseEnter={this.showTooltip}
                        onMouseLeave={this.hideTooltip}
                        onMouseMove={this.moveTooltip}
                    />
                </div>
            </div>
            );
    }
}

export default WorldMap;
