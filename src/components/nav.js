import React from 'react';
import Corona from './../svg/corona.svg';

class Nav extends React.Component {
    render() {
        return(
            <nav>
                <img src={Corona} alt="logo" id="nav-logo" />
            </nav>
        );
    }
}

export default Nav;