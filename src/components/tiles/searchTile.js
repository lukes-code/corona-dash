import React from 'react';
import { defaultAppSelection } from './../../App'

export const SearchTile = props => {
    
    const { color, countries, query } = props

    const handleChange = (e) => {
        const value = e.target.value
        if(value === defaultAppSelection.value) {
            query(defaultAppSelection.value, defaultAppSelection.name);
        } else {
            const selectedCountry = countries.find(i => i.iso2 === value)
            const { iso2, name } = selectedCountry
            query(iso2, name);
        }
    }

    const getOptions = () => {
        const firstOption = <option key="firstOption" value={defaultAppSelection.value}>Global</option>
        const countriesOptions = countries.map((country) => {
            const { iso2, name } = country
            return <option key={iso2} value={iso2}>{name}</option>
        })
        return [firstOption, ...countriesOptions]
    }

    const getClassName = () => {
        let className = 'smallTileChild'
        if(typeof color === 'string' && color.length > 0) {
            className += ` ${color}`
        }
        return className.trim()
    }

    return(<section onChange={handleChange} className={getClassName()}>
        <select className="countries">{getOptions()}</select>
    </section>);
}