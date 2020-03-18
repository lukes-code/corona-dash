import React from 'react';
import Select from './select';

class Nav extends React.Component {
    render() {
        return(
            <nav>
                <h1>CopingWithCorona</h1>
                <Select
                    suggestions={this.props.countries}
                />
            </nav>
        );
    }
}

export default Nav;