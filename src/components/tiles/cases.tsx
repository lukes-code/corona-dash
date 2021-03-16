import React, { useState, useEffect } from 'react';
import Globe from '../../svg/globe.svg';

type CaseProps = {
    country: boolean;
    countries?: any;
    numbering?: string;
}

const Cases: React.FC<CaseProps> = ({country,countries,numbering}) => {
    //use of hooks
    const [hasSearched, setHasSearched] = useState<boolean>(false)
    useEffect(() => {
        if(countries !== undefined) setHasSearched(true);
      });
        
    //conditional rendering
    if(!country){
        return(
            <div className="casesTile" id="color1">
                <img src={Globe} alt="globe" id="globe-svg" />
                <h2>Top 5 <br/>Countries</h2>
                <p>For confirmed cases</p>
            </div>
        );
    } else {
        if(countries != undefined){
            return(
                <div className="casesTile" id="color2">
                    <img src={numbering} alt="number" id="number-svg" />
                    <h2>{countries[0]}</h2>
                    <p>{countries[1]}</p>
                </div>
            );
        } else {
            return(
                <div className="casesTile" id="color2">
                <img src={numbering} alt="number" id="number-svg" />
                <h2>Loading</h2>
                <p>Data</p>
            </div>
            );
        }
    }
};

export default Cases;