import React, { Component } from 'react';
import Nav from './components/nav';
import StatsTile from './components/tiles/statsTile';
import InfoTile from './components/tiles/infoTile';
import Notice from './components/tiles/notice';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: ({
        confirmed: 0,
        recovered: 0,
        deaths: 0
      }),
      countries: [],
      query: 'NA',
      country: ({
        name: 'Global',
        confirmed: 0,
        recovered: 0,
        deaths: 0,
      })
    }
  }

  stats = (asycnc) => {
    const base = 'https://covid19.mathdro.id/api';
    const countries = `https://covid19.mathdro.id/api/countries`

    fetch(base)
      .then(response => response.json())
      .then(json => {
        const confirmed = json.confirmed.value;
        const recovered = json.recovered.value;
        const deaths = json.deaths.value;
        this.setState ({
          total: ({
            confirmed: confirmed,
            recovered: recovered,
            deaths: deaths
          }),
          country: ({
            name: 'Global'
          })
        })
      });

      fetch(countries)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        const countries = Object.entries(json.countries);
        this.setState ({
          countries: countries
        })
      });
  }

  componentDidMount(){
    this.stats();
  }

  updateQuery = (query, country) => {
    this.setState({ query: query, country: ({ name: country }) });
    if(query === 'NA'){
      this.stats();
    } else {
      const countries = `https://covid19.mathdro.id/api/countries/${query}`

      fetch(countries)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if(json.error !== undefined){
          this.setState ({
            total: ({
              confirmed: 0,
              recovered: 0,
              deaths: 0
            })
          })
        } else {
          this.setState ({
            total: ({
              confirmed: json.confirmed.value,
              recovered: json.recovered.value,
              deaths: json.deaths.value
            })
          })
        }
      });
    }
  }

  render() {

    const totalStats = this.state.total;

      return (
        <React.Fragment>
          <Nav 
            countries={this.state.countries}
            query={this.updateQuery}
          />
          <main>
            <section className="full">
              <Notice />
            </section>
            <section>
              <h1>{}</h1>
            </section>
            <section id="stats">
              <InfoTile
                title={"Confirmed Cases"}
                total={totalStats.confirmed}
                stats={totalStats.confirmed}
              />
              <StatsTile
                title={"Recovered"}
                total={totalStats.confirmed}
                stats={totalStats.recovered}
              />
              <StatsTile
                title={"Deaths"}
                total={totalStats.confirmed}
                stats={totalStats.deaths}
              />
            </section>
          </main>
        </React.Fragment>
      );
    }
}
export default App;