import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type StatsType = {
    stats: number;
    total: number;
    title: string;
}

class statsTile extends React.Component<StatsType> {
    
    render() {

        let percentage: number = Math.round(this.props.stats * 100 / this.props.total);

        return (
            <section className="statsTile">
                <CircularProgressbar 
                    value={percentage} 
                    text={`${percentage}%`} 
                    styles={ buildStyles({
                        strokeLinecap: "butt"
                    })}
                />
                <h1>{this.props.title}</h1>
                <h1>{this.props.stats}</h1>
            </section>
        );
    }
}

export default statsTile;