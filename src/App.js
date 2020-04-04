import React, { Component } from 'react';
import Nav from './components/nav';
import StatsTile from './components/tiles/statsTile';
import InfoTile from './components/tiles/infoTile';
import SearchTile from './components/tiles/searchTile';
import Notice from './components/tiles/notice';

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

  _getTopCollectionValues = (Collection, N) => Array.isArray(Collection) ? Collection.slice(0,N) : []

  highestConfirmed = () => {
    let countriesISO = this.state.countries.map(u => {
        let iso2 = ''
        let name = ''
        let out = { iso2, name }
        if(Array.isArray(u) && u.length === 2) {
          let secondNode = u[1]
          if(secondNode && typeof secondNode.iso2 === 'string' && typeof secondNode.name === 'string') {
            let { iso2, name } = secondNode
            out = { iso2, name }
          }
        }
        return out
      }).filter(w => w.iso2 !== '' && w.name !== '')

      this._countriesPromise(countriesISO)

  }

  callBack = (allRes) => {
    debugger
    const sortedByConfirmed = [...allRes].sort((a,b) => a.confirmed <= b.confirmed ? 1 : -1)
    const top5Confirmed = this._getTopCollectionValues(sortedByConfirmed, 5)
    this.setState({
      highestConfirmed: top5Confirmed
    });
  }

  addData(countriesList, responses, callBack) {
    if(Array.isArray(countriesList)) {
      const _country = countriesList.pop()
      const url = `${this.countriesUrl}/${_country.iso2}`
      Axios.get(url).then(axiosResponse => {
        const { data } = axiosResponse
        const { confirmed, recovered, deaths } = data
        const _newData = {..._country, confirmed: confirmed.value, recovered: recovered.value, deaths: deaths.value}
        responses.push(_newData)
      }).catch(httpError => {
        console.dir(httpError)
      }).finally(() => {
        if(countriesList.length>0) {
          this.addData(countriesList, responses, callBack)
        } else {
          callBack()
        }
      })
    }
  }

  _countriesPromise(countriesList) {
    const outCollection = []
    this.addData(countriesList, outCollection, () => this.callBack(outCollection))
  }

  stats = () => {
    const deaths = '/deaths';
    const confirmed = '/confirmed';
    const recovered = '/recovered';

    fetch(this.base)
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

      fetch(this.countriesUrl)
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