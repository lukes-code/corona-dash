import React from 'react';
import Chart from "react-apexcharts";

type AreaProps = {
  query: string;
}

type AreaState = {
  series: Object[];
  options: {
    chart: {
      height: number;
      type: string;
    },
    dataLabels: {
      enabled: boolean;
    },
    colors: string[];
    stroke: {
      curve: string;
    },
    xaxis: {
      type: string;
      categories: Object[];
    },
    tooltip: {
      x: {
        format: string;
      }
    }
  },
}

class AreaChart extends React.Component<AreaProps, AreaState> {
    constructor(props: AreaProps) {
      super(props);

      this.state = {
      
        series: [{
          name: "Country1",
          data: [31, 40, 28, 51, 42, 109, 100]
        }, {
          name: 'Country2',
          data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
          chart: {
            height: 350,
            type: 'area'
          },
          dataLabels: {
            enabled: false
          },
          colors: ['#6C63FF', '#34c1ad'],
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
          },
        },
      
      
      };
    }

    componentDidMount(){
        const query = this.props.query;
        this.setState({
            series: ([{
                name: query, 
                data: [31, 40, 28, 51, 42, 109, 100]
            }, {
                name: 'Highest Case Country', 
                data: [21, 44, 58, 21, 32, 89, 50]
            }]),
        });
    }

    render() {
      return (
        <div id="areaTile">
         <Chart 
            options={this.state.options} 
            series={this.state.series} 
            type="area" 
            height={350} 
        />
        </div>
      );
    }
  }

  export default AreaChart;