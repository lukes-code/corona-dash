import React from 'react';
import Corona from '../../svg/corona.svg';

type InfoProps = {
    title: string;
    stats: number;
    total: number;
};

class infoTile extends React.Component<InfoProps> {
    
    render() {

        const percentage: number = Math.round(this.props.stats * 100 / this.props.total);

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