import React from "react";

const CompareCountriesControls = (props) => {
    return (
        <div className="compare-controls-container">
            <div>
                <input type="checkbox"
                       onChange={props.clearSelected} /> {' '}
                Compare countries
            </div>
            <div>
                {props.selectedCountries.length > 1 && props.compareMode ? (
                    <button
                        onClick={props.showCompareResults}
                    >
                        Show compare results
                    </button>
                ) : null}
            </div>
        </div>
    );
};

export default CompareCountriesControls;