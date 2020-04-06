import React from 'react';
import Corona from '../../svg/corona.svg';
import { NumberUtil } from './../../util/numbers'

export const InfoTile = (props) => {
    let { stats, title } = props
    stats = NumberUtil.toCommaDelim(stats)
    return <section className="statsTile">
                <img src={Corona} alt="corona"/>
                <h1>{title}</h1>
                <h1>{stats}</h1>
            </section>
}