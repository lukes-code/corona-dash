import React from 'react';
import Select from './select';
import Corona from '../svg/corona.svg';

class Nav extends React.Component {
    render() {
        return(
            <nav>
                <img src={Corona} alt="logo" id="nav-logo" />
                <Select
                    suggestions={this.props.countries}
                    query={this.props.query}
                />
            </nav>
        );
    }
}

export default Nav;