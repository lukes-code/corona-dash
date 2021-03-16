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

type AppProps = {
  //Props
  countriesList: Object[];
};

export interface StatPayload {
  value: number;
  detail: string;
}
export interface BaseStatistics {
  confirmed: StatPayload;
  recovered: StatPayload;
  deaths: StatPayload;
  dailySummary: string;
  dailyTimeSeries: string;
  image: string;
  source: string;
  countries: string;
  countryDetail: {
    pattern: string;
  };
  example: string;
  lastUpdate: string;
}
/**
 * Country interface returned by /api/countries
 */
export interface Country {
  name: string;
  iso2: string;
  iso3: string;
}

export interface CountryStats extends BaseStatistics {}

type AppState = {
  total: {
    confirmed: number;
    recovered: number;
    deaths: number;
  };
  countries: Country[];
  query: string;
  country: {
    name: string;
    confirmed?: number;
    recovered?: number;
    deaths?: number;
  };
  highestConfirmed: CountryStats[];
  countryStatistics: CountryStats[];
};

interface CountriesResponse {
  countries: Country[];
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    //<App /> isnt being passed any props.. so null here would work
    super(props);
    this.state = {
      total: {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
      },
      countryStatistics: [],
      countries: [],
      query: 'NA',
      country: {
        name: 'Global',
        confirmed: 0,
        recovered: 0,
        deaths: 0,
      },
      highestConfirmed: [],
    };
  }

  // highestConfirmed = async () => {
  //   const countryQuery: string = `https://covid19.mathdro.id/api/countries`;
  //   let max: any[][] = []; //try to avoid let and mutability checkout the benefits of immutable state  https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/
  //   const countries: Object = this.state.countries; // this is redundant just remove it
  //   //Fetch highest confirmed cases per country
  //   for (let i = 0; i < this.state.countries.length; i++) {
  //     if (this.state.countries[i][1].iso2 != undefined) {
  //       await fetch(`${countryQuery}/${this.state.countries[i][1].iso2}`) // we are using await (ES6 syntax) here with .then which defeats its purpose. async/await removes the need ofr .then and we can write this like so
  //         /**
  //          * const data = await fetch('/foo) // this waits for a Promise.resolve(dataTobePassedBack) and data = dataToBePassedBack
  //          * this.setState({
  //          *  bar: data.bar
  //          * })
  //          */
  //         .then((response) => response.json())
  //         .then((json) => {
  //           if (json.error != undefined) {
  //             return;
  //           } else {
  //             max.push([this.state.countries[i][1].name, json.confirmed.value]); // again avoid doing this
  //           }
  //           console.log(max);
  //           const topValuesTwo: any = max.sort((a, b) => b[1] - a[1]).slice(0, 5); // usually inferring types is best however since we are assinging any to max typescript is unable to determine the type.. again this goes back to immutability and its benefits
  //           if (i === this.state.countries.length - 1) {
  //             this.setState({
  //               highestConfirmed: topValuesTwo,
  //             });
  //           }
  //         });
  //     }
  //   }
  // };

  /**
   * Heres how I would of wrote the above function
   */

  private async highestConfirmedv2() {
    const countriesStr = `https://covid19.mathdro.id/api/countries`; //typescript can infer simple types here easily no need to explicitly define the type
    //await inside loops is a very tricky thing.. you did good by avoiding .forEach
    try {
      for (const country of this.state.countries) {
        const response = await fetch(`${countriesStr}/${country.iso2}`); // This returns something like this {"confirmed":{"value":55995,"detail":"https://covid19.mathdro.id/api/countries/AF/confirmed"},"recovered":{"value":49499,"detail":"https://covid19.mathdro.id/api/countries/AF/recovered"},"deaths":{"value":2460,"detail":"https://covid19.mathdro.id/api/countries/AF/deaths"},"lastUpdate":"2021-03-16T12:25:56.000Z"} which is
        // since this returns json we need to parse it with the .json method..
        const stats: CountryStats = await response.json(); // i would usually create an interface for this
        // now we use state as its immutable by nature
        this.setState({
          countryStatistics: [...this.state.countryStatistics, stats], // we are setting a new array in state and spreading the contents of the old one in
        });
      }

      // now the loop is done and we are saving our data to state.. lets find the two highest ones
      this.setState({
        //sort the array ascending by highest value

        highestConfirmed: this.state.countryStatistics.sort((a, b) => a.confirmed.value - b.confirmed.value),
      });
    } catch (error) {
      //catch any errors here
      console.log(error);
    }
  }
  /**
   * Again a more simplified version
   */
  private async stats() {
    const base = 'https://covid19.mathdro.id/api';
    const countries = `https://covid19.mathdro.id/api/countries`;
    const response = await fetch(base);
    const baseReponse: BaseStatistics = await response.json();
    this.setState({
      total: {
        confirmed: baseReponse.confirmed.value,
        recovered: baseReponse.recovered.value,
        deaths: baseReponse.deaths.value,
      },
      country: {
        name: 'Global',
      },
    });

    const countryResponse = await fetch(countries);
    const countriesResponse: CountriesResponse = await countryResponse.json();
    this.setState({
      countries: countriesResponse.countries,
    });
    this.highestConfirmedv2();
  }

  // stats = (asycnc?: any) => {
  //   //doesnt need any args here as its never called with any see lines 125 and 131
  //   const base: string = 'https://covid19.mathdro.id/api';
  //   const deaths: string = '/deaths';
  //   const confirmed: string = '/confirmed';
  //   const recovered: string = '/recovered';
  //   const countries: string = `https://covid19.mathdro.id/api/countries`;

  //   fetch(base)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       const confirmed: number = json.confirmed.value;
  //       const recovered: number = json.recovered.value;
  //       const deaths: number = json.deaths.value;
  //       this.setState({
  //         total: {
  //           confirmed: confirmed,
  //           recovered: recovered,
  //           deaths: deaths,
  //         },
  //         country: {
  //           name: 'Global',
  //         },
  //       });
  //     });

  //   fetch(countries)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       const countries = Object.entries(json.countries);
  //       this.setState({
  //         countries: countries,
  //       });
  //       this.highestConfirmedv2();
  //     });
  // };

  componentDidMount() {
    this.stats();
  }

  updateQuery = (query: string, country: string) => {
    this.setState({ query: query, country: { name: country } });
    if (query === 'NA') {
      this.stats();
    } else {
      const countries: string = `https://covid19.mathdro.id/api/countries/${query}`;

      fetch(countries)
        .then((response) => response.json())
        .then((json) => {
          // console.log(json);
          if (json.error !== undefined) {
            this.setState({
              total: {
                confirmed: 0,
                recovered: 0,
                deaths: 0,
              },
            });
          } else {
            this.setState({
              total: {
                confirmed: json.confirmed.value,
                recovered: json.recovered.value,
                deaths: json.deaths.value,
              },
            });
          }
        });
    }
  };

  render() {
    const totalStats: { confirmed: number; recovered: number; deaths: number } = this.state.total;

    return (
      <React.Fragment>
        <Nav />
        <main>
          <section className='full'>
            <Notice />
          </section>
          <section></section>
          <section id='stats'>
            <div className='smallTileParent'>
              <div className='smallTileChild' id='color2'>
                <img src={Search} alt='search' id='search-svg' />
                <p>Select a country below</p>
              </div>
              <SearchTile countriesList={this.state.countries} query={this.updateQuery} color='color1' />
            </div>
            <InfoTile title={'Confirmed Cases'} total={totalStats.confirmed} stats={totalStats.confirmed} />
            <StatsTile title={'Recovered'} total={totalStats.confirmed} stats={totalStats.recovered} />
            <StatsTile title={'Deaths'} total={totalStats.confirmed} stats={totalStats.deaths} />
          </section>
          <section id='top-cases'>
            <AreaChart query={this.state.country.name} />
            <div className='smallTileParent'>
              <Cases country={false} />
              <Cases country={true} numbering={One} countries={this.state.highestConfirmed[0]} />
            </div>
            <div className='smallTileParent'>
              <Cases country={true} numbering={Two} countries={this.state.highestConfirmed[1]} />
              <Cases country={true} numbering={Three} countries={this.state.highestConfirmed[2]} />
            </div>
            <div className='smallTileParent'>
              <Cases country={true} numbering={Four} countries={this.state.highestConfirmed[3]} />
              <Cases country={true} numbering={Five} countries={this.state.highestConfirmed[4]} />
            </div>
          </section>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
