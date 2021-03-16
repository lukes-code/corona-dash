import React from 'react';
import Select from '../select';

type SearchType = { 
    countriesList: Object[];
    color: string;
    query: any;
}

class SearchTile extends React.Component<SearchType>{
    render() {
        return(
            <section className="smallTileChild" id={this.props.color}>
                <Select
                    suggestions={this.props.countriesList}
                    query={this.props.query}
                />
            </section>
        );
    }
}

export default SearchTile;