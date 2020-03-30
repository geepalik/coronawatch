import React,{Component} from "react";
import WorldMapSvg from "./WorldMapSvg";

class WorldMap extends Component{

    componentDidMount() {
        console.log("in world map: "+this.props.country_stats);
    }

    render() {
        return <WorldMapSvg />;
    }
}

export default WorldMap;
