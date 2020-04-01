import React from 'react';
import Globe from '../../svg/globe.svg';

class Cases extends React.Component{

    state = {
        country: true
    }

    componentDidMount(){
        if(!this.props.country){
            this.setState({ country: true })
         } else{
            this.setState({ country: false })
         }
    }

    render() {

        if(!this.state.country){
            return(
                <div className="casesTile" id="color1">
                    {/* <img src={Globe} alt="search" id="search-svg" /> */}
                    <p>Select your country or origin below</p>
                </div>
            );
        } else {
            return(
                <div className="casesTile" id="color2">
                    <h1>ITALY</h1>
                    <p>160321</p>
                </div>
            );
        }
        
    }
}

export default Cases;