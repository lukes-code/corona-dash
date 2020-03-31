import React from 'react';
import Select from '../select';

class SearchTile extends React.Component{
    render() {
        return(
            <section className="smallTileChild" id={this.props.color}>
                <Select
                    suggestions={this.props.countries}
                    query={this.props.query}
                />
            </section>
        );
    }
}

export default SearchTile;