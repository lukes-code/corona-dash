import React, { Component } from 'react';
import Nav from './components/nav';
import StatsTile from './components/tiles/statsTile';
import InfoTile from './components/tiles/infoTile';
import SearchTile from './components/tiles/searchTile';
import Notice from './components/tiles/notice';
import Search from './svg/search.svg';
import AreaChart from './components/tiles/areaChart';
import Cases from './components/tiles/cases';
import One from './svg/one.svg';
import Two from './svg/two.svg';
import Three from './svg/three.svg';
import Four from './svg/four.svg';
import Five from './svg/five.svg';

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
      }),
      highestConfirmed: ''
    }
  }

  highestConfirmed = () => {
    const countries = `https://covid19.mathdro.id/api/countries`;
    let topValuesOne = [];
    let max = [];
    //Fetch highest confirmed cases per country
    console.log(this.state.countries.length);
      for (let i = 0; i < this.state.countries.length; i++) {
        if(this.state.countries[i][1].iso2 != undefined){
          fetch(`${countries}/${this.state.countries[i][1].iso2}`)
          .then(response => response.json())
          .then(json => {
            // console.log(json);
            //Only get 10 highest
              if(json.error != undefined){
                return;
              } else {
                max.push([this.state.countries[i][1].name, json.confirmed.value]);
                // console.log('max is ' + max);
              }
              const topValuesOne = max.sort((a,b) => b[1]-a[1]);
              // console.log(`first ${topValuesOne}`);
              const topValuesTwo = max.sort((a,b) => b[1]-a[1]).slice(0,5);
              console.log(`${i}after ${topValuesTwo}`);
              console.log('setting state');
              this.setState({
                highestConfirmed: topValuesTwo
              });
          });
        }
      }
  }

  stats = (asycnc) => {
    const base = 'https://covid19.mathdro.id/api';
    const deaths = '/deaths';
    const confirmed = '/confirmed';
    const recovered = '/recovered';
    const countries = `https://covid19.mathdro.id/api/countries`;

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
        const countries = Object.entries(json.countries);
        this.setState ({
          countries: countries
        })
        this.highestConfirmed();
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
        // console.log(json);
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
                <Cases 
                  number={One}
                  countries={this.state.highestConfirmed[0]}
                />
              </div>
              <div className="smallTileParent">
                <Cases 
                  number={Two}
                  countries={this.state.highestConfirmed[1]}
                />
                <Cases 
                  number={Three}
                  countries={this.state.highestConfirmed[2]}
                />
              </div>
              <div className="smallTileParent">
                <Cases 
                  number={Four}
                  countries={this.state.highestConfirmed[3]}
                />
                <Cases 
                  number={Five}
                  countries={this.state.highestConfirmed[4]}
                />
              </div>
            </section>
          </main>
        </React.Fragment>
      );
    }
}
export default App;