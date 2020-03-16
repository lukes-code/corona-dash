import React, { Component } from 'react';
import Nav from './components/nav';
import StatsTile from './components/tiles/statsTile';
import Notice from './components/tiles/notice';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      total: ({
        confirmed: 0,
        recovered: 0,
        deaths: 0
      })
    }
  }

  stats = (asycnc) => {
    const base = 'https://covid19.mathdro.id/api';

    fetch(base)
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        const confirmed = json.confirmed.value;
        const recovered = json.recovered.value;
        const deaths = json.deaths.value;
        this.setState ({
          total: ({
            confirmed: confirmed,
            recovered: recovered,
            deaths: deaths
          })
        })
      });
  }

  componentDidMount(){
    this.stats();
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
            <section id="stats">
              <StatsTile
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