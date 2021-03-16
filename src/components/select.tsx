import React from "react";

type SelectTypes = {
    suggestions: Object[];
    theQuery?: string;
    query: (theQuery: string) => string; 
    dropdown?: string;
    country?: string;
}

class Select extends React.Component<SelectTypes> {

  handleChange = (e: any) => {
    const dropdown = (document.getElementById('countries') as HTMLInputElement);
    if(dropdown !== null){
      const theQuery: string = dropdown.value;
      this.props.query(theQuery);
    }
  }

  render(){

    let countries: Object[] = this.props.suggestions.map((country: any, i: number) => (
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