import React, { Component, useState } from 'react';
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

type AppProps = {
  //Props
  countriesList: Object[];
}

type AppState = {
  total: {
    confirmed: number;
    recovered: number;
    deaths: number;
  },
  countries: any;
  query: string;
  country: {
    name: string;
    confirmed?: number;
    recovered?: number;
    deaths?: number;
  },
  highestConfirmed: Object[];
}


class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
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
      highestConfirmed: []
    }
  }

  highestConfirmed = async () => {
    const countryQuery: string = `https://covid19.mathdro.id/api/countries`;
    let max: any[][] = [];
    const countries: Object = this.state.countries;
    //Fetch highest confirmed cases per country
      for (let i = 0; i < this.state.countries.length; i++) {
        if(this.state.countries[i][1].iso2 != undefined){
          await fetch(`${countryQuery}/${this.state.countries[i][1].iso2}`)
          .then(response => response.json())
          .then(json => {
              if(json.error != undefined){
                return;
              } else {
                max.push([this.state.countries[i][1].name, json.confirmed.value]);
              }
              console.log(max);
              const topValuesTwo: any = max.sort((a,b) => b[1]-a[1]).slice(0,5);
              if(i === this.state.countries.length - 1){
                this.setState({
                  highestConfirmed: topValuesTwo
                });
              }
          });
        }
      }
  }

  stats = (asycnc?:any) => {
    const base: string = 'https://covid19.mathdro.id/api';
    const deaths: string = '/deaths';
    const confirmed: string = '/confirmed';
    const recovered: string = '/recovered';
    const countries: string = `https://covid19.mathdro.id/api/countries`;

    fetch(base)
      .then(response => response.json())
      .then(json => {
        const confirmed: number = json.confirmed.value;
        const recovered: number = json.recovered.value;
        const deaths: number = json.deaths.value;
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
        const countries: Object[] = Object.entries(json.countries);
        this.setState ({
          countries: countries
        })
        this.highestConfirmed();
        });
  }

  componentDidMount(){
    this.stats();
  }

  updateQuery = (query: string, country: string) => {
    this.setState({ query: query, country: ({ name: country }) });
    if(query === 'NA'){
      this.stats();
    } else {
      const countries: string = `https://covid19.mathdro.id/api/countries/${query}`

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

    const totalStats: {confirmed: number, recovered: number, deaths: number} = this.state.total;

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
                  countriesList={this.state.countries}
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
                  country={false}
                />
                <Cases 
                  country={true}
                  numbering={One}
                  countries={this.state.highestConfirmed[0]}
                />
              </div>
              <div className="smallTileParent">
                <Cases 
                  country={true}
                  numbering={Two}
                  countries={this.state.highestConfirmed[1]}
                />
                <Cases 
                  country={true}
                  numbering={Three}
                  countries={this.state.highestConfirmed[2]}
                />
              </div>
              <div className="smallTileParent">
                <Cases 
                  country={true}
                  numbering={Four}
                  countries={this.state.highestConfirmed[3]}
                />
                <Cases 
                  country={true}
                  numbering={Five}
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