import React from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import './CompareCountriesControls.css';

const CompareCountriesControls = (props) => {

    /**
     *
     * @returns {string}
     */
    function getCheckBoxText() {
        return (!props.compareMode) ? "Compare Statistics Between Countries" : "Click Again To Clear Selected Countries"
    }

    return (
        <div className="compare-controls-container">
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={props.clearSelected}
                            style={{color:'white'}}
                        />
                    }
                    label={getCheckBoxText()}
                />
            </FormGroup>
            <div>
                {props.selectedCountries.length > 1 && props.compareMode ? (
                    <Button variant="contained" color="primary" onClick={props.showCompareResults}>
                        Show compare results
                    </Button>
                ) : null}
            </div>
        </div>
    );
};

export default CompareCountriesControls;