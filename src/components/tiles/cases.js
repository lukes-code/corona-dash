import React from 'react';
import Globe from '../../svg/globe.svg';

class Cases extends React.Component{

    state = {
        country: true,
    }

    componentDidMount(){
        if(!this.props.country){
            this.setState({ country: true })
         } else{
            this.setState({ country: false })
         }
         if(!this.props.country){
            this.setState({ country: true })
         } else{
            this.setState({ country: false })
         }
         console.log(this.props.countries);
    }

    render() {
        if(!this.state.country){
            return(
                <div className="casesTile" id="color1">
                    <img src={Globe} alt="globe" id="globe-svg" />
                    <h2>Top 5 <br/>Countries</h2>
                    <p>For confirmed cases</p>
                </div>
            );
        } else {
            if(this.props.countries != undefined){
            return(
                <div className="casesTile" id="color2">
                    <img src={this.props.number} alt="number" id="number-svg" />
                    <h2>{this.props.countries[0]}</h2>
                    <p>{this.props.countries[1]}</p>
                </div>
            );
            } else {
                return(
                    <div className="casesTile" id="color2">
                    <img src={this.props.number} alt="number" id="number-svg" />
                    <h2>Loading</h2>
                    <p>Data</p>
                </div>
                );
            }
        }
    }
}

export default Cases;