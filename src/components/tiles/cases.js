import React from 'react';
import Globe from '../../svg/globe.svg';

import { NumberUtil } from './../../util/numbers'

// this is a react functional component, with no state
export const Cases = (props) => {

    const { isCardLabel, countryData, number } = props;
    let name = ''
    let confirmed = 0
    let renderCase = false
    if(countryData && typeof countryData.confirmed === 'number' && countryData.name) {
        name = countryData.name
        confirmed = countryData.confirmed
        renderCase = true
    }

    if(isCardLabel === true) {
        return(
            <div className="casesTile color1">
                <img src={Globe} alt="globe" id="globe-svg" />
                <h2>Top 5 <br/>Countries</h2>
                <p>For confirmed cases</p>
            </div>
        );
    } else if(renderCase) {
        return(
            <div className="casesTile color2">
                <img src={number} alt="number" id="number-svg" />
                <h2>{name}</h2>
                <p>{NumberUtil.toCommaDelim(confirmed, 0)}</p>
            </div>
        );
    } else if(countryData === undefined) {
            return(
                <div className="casesTile  color2">
                <img src={number} alt="number" id="number-svg" />
                <h2>Loading</h2>
                <p>Data</p>
            </div>
            );
    } else {
        return null
    }
}