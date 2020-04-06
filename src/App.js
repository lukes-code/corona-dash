import React, { Component } from 'react';
import Nav from './components/nav';
import { StatsTile } from './components/tiles/statsTile';
import { InfoTile } from './components/tiles/infoTile';
import { SearchTile } from './components/tiles/searchTile';
import { Notice } from './components/tiles/notice';
import AreaChart from './components/tiles/areaChart';
import { Cases } from './components/tiles/cases';

import One from './svg/one.svg';
import Two from './svg/two.svg';
import Three from './svg/three.svg';
import Four from './svg/four.svg';
import Five from './svg/five.svg';
import Search from './svg/search.svg';

// new HTTP lib
import Axios from 'axios';

export const defaultAppSelection = {
  value: 'global',
  name: 'Global'
}

class App extends Component {
  countriesUrl = `https://covid19.mathdro.id/api/countries`
  base = 'https://covid19.mathdro.id/api'

  constructor(props) {
    super(props);
    this.state = {
      total: ({
        confirmed: 0,
        recovered: 0,
        deaths: 0
      }),
      countries: [],
      query: defaultAppSelection.value,
      country: ({
        name: defaultAppSelection.name,
        confirmed: 0,
        recovered: 0,
        deaths: 0,
      }),
      highestConfirmed: []
    }
  }

  _getTopCollectionValues = (Collection, N) => Array.isArray(Collection) ? Collection.slice(0,N) : []


  proxyServerCall() {
    Axios.get(`/api/allDocuments`).then(AxiosResponse => {
      const { data } = AxiosResponse
      const { countries } = data
      const sortedByConfirmed = [...countries].sort((a,b) => a.confirmed <= b.confirmed ? 1 : -1)
      const highestConfirmed = this._getTopCollectionValues(sortedByConfirmed, 5)
      this.setState({ countries, highestConfirmed })
    }).catch(AxiosHttpError => {
      console.dir(AxiosHttpError)
    })
  }


  componentDidMount(){
    this.proxyServerCall()
  }

  updateQuery = (query, country) => {
    this.setState({ query: query, country: ({ name: country }) });
    if(query === defaultAppSelection.value) {
      // do we really need to do this each time?
      this.proxyServerCall()
    } else {
      const countryDataApi = `https://covid19.mathdro.id/api/countries/${query}`
      Axios.get(countryDataApi).then(apiResponse => {
        const { data } = apiResponse
        this.setState ({
          total: ({
            confirmed: data.confirmed.value,
            recovered: data.recovered.value,
            deaths: data.deaths.value
          })
        })
      }).catch(apiError => {
        this.setState ({
          total: ({
            confirmed: 0,
            recovered: 0,
            deaths: 0
          })
        })
      })
    }
  }

  render() {

    const totalStats = this.state.total
    const countryName = this.state.country.name

      return (<>
        <Nav />
          <main>
            <section className="full">
              <Notice />
            </section>
            <section>
            </section>
            <section id="stats">
              <div className="smallTileParent">
                <div className="smallTileChild color2">
                <img src={Search} alt="search" id="search-svg" />
                <p>Select a country below</p>
                </div>
                <SearchTile countries={this.state.countries} query={this.updateQuery} color="color1"/>
              </div>
              <InfoTile title={"Confirmed Cases"} stats={totalStats.confirmed} />
              <StatsTile title={"Recovered"} total={totalStats.confirmed} stats={totalStats.recovered} />
              <StatsTile title={"Deaths"} total={totalStats.confirmed} stats={totalStats.deaths} />
            </section>
            <section id="top-cases">
              <AreaChart query={countryName} />
              <div className="smallTileParent">
                <Cases isCardLabel={true}/>
                <Cases number={One} countryData={this.state.highestConfirmed[0]}/>
              </div>
              <div className="smallTileParent">
                <Cases number={Two} countryData={this.state.highestConfirmed[1]} />
                <Cases number={Three} countryData={this.state.highestConfirmed[2]} />
              </div>
              <div className="smallTileParent">
                <Cases number={Four} countryData={this.state.highestConfirmed[3]} />
                <Cases number={Five} countryData={this.state.highestConfirmed[4]} />
              </div>
            </section>
          </main>
      </>);
    }
}
export default App;