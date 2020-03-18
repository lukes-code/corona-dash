import React from "react";

class Select extends React.Component {

  handleChange = (e) => {
    const dropdown = document.getElementById('countries');
    const query = dropdown.value;
    // if(dropdown.value === 'NA') console.log('do nothing');
    console.log(`query is ${query}`);
  }

  render(){

    let countries = this.props.suggestions.map((country, i) => (
      <option value={country[1]}>{country[0]}</option>
    ));
    console.log(`countries are ${this.props.suggestions}`);

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