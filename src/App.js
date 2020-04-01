import React, { Component } from 'react';
import Nav from './components/nav';
import StatsTile from './components/tiles/statsTile';
import InfoTile from './components/tiles/infoTile';
import SearchTile from './components/tiles/searchTile';
import Notice from './components/tiles/notice';
import Search from './svg/search.svg';
import AreaChart from './components/tiles/areaChart';
import Cases from './components/tiles/cases';

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
    const deaths = '/deaths';
    const confirmed = '/confirmed';
    const recovered = '/recovered';
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

      //Fetch highest deaths per country
      fetch(`${base}${deaths}`)
      .then(response => response.json())
      .then(json => {
        let max = [];
        //Only get 10 highest
        for (let i = 0; i < 10; i++) {
            max.push([json[i].countryRegion, json[i].deaths]);
        }
        this.setState({
          highestDeaths: max
        })
      });

      //Fetch highest confirmed cases per country
      fetch(`${base}${confirmed}`)
      .then(response => response.json())
      .then(json => {
        console.log(`confirmed ${json}`);
        let max = [];
        //Only get 10 highest
        for (let i = 0; i < 10; i++) {
            max.push([json[i].countryRegion, json[i].confirmed]);
        }
        this.setState({
          highestConfirmed: max
        })
      });

      //Fetch highest confirmed cases per country
      fetch(`${base}${recovered}`)
      .then(response => response.json())
      .then(json => {
        console.log(`recovered ${json}`);
        let max = [];
        //Only get 10 highest
        for (let i = 0; i < 10; i++) {
            max.push([json[i].countryRegion, json[i].recovered]);
        }
        this.setState({
          highestRecovered: max
        })
      });

      fetch(countries)
      .then(response => response.json())
      .then(json => {
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
          <Nav />
          <main>
            <section className="full">
              <Notice />
            </section>
            <section>
              <h1>{}</h1>
            </section>
            <section id="stats">
              <div className="smallTileParent">
                <div className="smallTileChild" id="color2">
                <img src={Search} alt="search" id="search-svg" />
                <p>Select a country below</p>
                </div>
                <SearchTile 
                  countries={this.state.countries}
                  query={this.updateQuery}
                  color="color1"
                />
              </div>
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
            <section id="top-cases">
              <AreaChart 
                query={this.state.country.name}
              />
              <div className="smallTileParent">
                <Cases 
                  country="false"
                />
                <Cases />
              </div>
              <div className="smallTileParent">
                <Cases />
                <Cases />
              </div>
              <div className="smallTileParent">
                <Cases />
                <Cases />
              </div>
            </section>
          </main>
        </React.Fragment>
      );
    }
}
export default App;