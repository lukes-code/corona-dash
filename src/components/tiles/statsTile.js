import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { NumberUtil } from './../../util/numbers'

export const StatsTile = props => {
    let { stats, total, title } = props;
    const percentage = total > 0 ? Math.round(stats * 100 / total) : 0;
    return <section className="statsTile">
                <CircularProgressbar value={percentage} text={`${percentage}%`} styles={ buildStyles({strokeLinecap: "butt"})}/>
                <h1>{title}</h1>
                <h1>{NumberUtil.toCommaDelim(stats)}</h1>
            </section>
}