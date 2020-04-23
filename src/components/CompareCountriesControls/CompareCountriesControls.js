import React from "react";

const CompareCountriesControls = (props) => {

    /**
     *
     * @returns {string}
     */
    function getCheckBoxText() {
        return (!props.compareMode) ? "Compare Statistics Between Countries" : "Clear Selected Countries"
    }

    return (
        <div className="compare-controls-container">
            <div>
                <input type="checkbox"
                       onChange={props.clearSelected} /> {' '}
                {getCheckBoxText()}
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