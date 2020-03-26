import React from "react";
import uuid from 'react-uuid';

class Select extends React.Component {

  handleChange = (e) => {
    const dropdown = document.getElementById('countries');
    const query = dropdown.value;
    const country = [this.selectedIndex].innerText;
    console.log(`query is ${query}`);
    this.props.query(query, country);
  }

  render(){

    let countries = this.props.suggestions.map((country, i) => (
      <option 
        value={country[1].iso2}
      >
        {country[1].name}
      </option>
    ));

    // console.log(`countries are ${this.props.suggestions}`);

    return (
        <React.Fragment>
            <select onChange={this.handleChange} id="countries">
              <option value="NA">Global</option>
                {countries}
            </select>
        </React.Fragment>
      );
  }
}

export default Select;