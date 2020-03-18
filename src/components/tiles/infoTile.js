import React from 'react';
import Corona from '../../svg/corona.svg';


class infoTile extends React.Component {
    
    render() {

        const percentage = Math.round(this.props.stats * 100 / this.props.total);

        return (
            <section className="statsTile">
                <img src={Corona} alt="corona"
                />
                <h1>{this.props.title}</h1>
                <h1>{this.props.stats}</h1>
            </section>
        );
    }
}

export default infoTile;