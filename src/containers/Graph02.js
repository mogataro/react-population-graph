import React, { Component } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class Graph extends Component {
  constructor() {
    super();
    this.state = {
      selected: Array(47).fill(false),
      prefectures: [],
      series: []
    };
    this._changeSelection = this._changeSelection.bind(this);
  }

  componentDidMount() {
    // 47都道府県の一覧を取得
    // API Doc: https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
    fetch('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
      headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY }
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ prefectures: res.result });
      });
  }

  _changeSelection(index) {
    const selected_copy = this.state.selected.slice();
    // selectedの真偽値を反転
    selected_copy[index] = !selected_copy[index];

    if (!this.state.selected[index]) {
      // チェックされていなかった場合はデータを取得
      // API Doc: https://opendata.resas-portal.go.jp/docs/api/v1/population/sum/perYear.html
      fetch(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${index + 1}`,
        {
          headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY }
        }
      )
        .then(response => response.json())
        .then(res => {
          let tmp = [];
          Object.keys(res.result.data[0].data).forEach(i => {
            tmp.push(res.result.data[0].data[i].value);
          });
          const res_series = {
            name: this.state.prefectures[index].prefName,
            data: tmp
          };
          this.setState({
            selected: selected_copy,
            series: [...this.state.series, res_series]
          });
        });
    } else {
      const series_copy = this.state.series.slice();
      // チェック済みの場合はseriesから削除
      for (let i = 0; i < series_copy.length; i++) {
        if (series_copy[i].name == this.state.prefectures[index].prefName) {
          series_copy.splice(i, 1);
        }
      }
      this.setState({
        selected: selected_copy,
        series: series_copy
      });
    }
  }

  renderItem(props) {
    return (
      <FormControlLabel
        control={
          <Checkbox
            key={props.prefCode}
            checked={this.state.selected[props.prefCode - 1]}
            onChange={() => this._changeSelection(props.prefCode - 1)}
            inputProps={{
              'aria-label': 'primary checkbox',
            }}
          />
        }
        label={props.prefName}
      />
    );
  }

  render() {
    const obj = this.state.prefectures;
    const options = {
      chart: {
        type: 'spline',
        backgroundColor: 'transparent'
      },
      title: {
        text: ''
      },
      xAxis: {
        labels: {
          style: {
            fontSize: '12px'
          }
        },
        title: {
          text: '年度(年)'
        },
        lineWidth: 2
      },
      yAxis: {
        title: {
          text: '人口数(人)'
        },
        labels: {
          formatter: function() {
            return this.value.toLocaleString()
          }
        },
        lineWidth: 2
      },
      responsive: {
        rules: [
          {
            condition: {
              maxheight: 400
            },
            chartOptions: {
              legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top'
              }
            }
          }
        ]
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointInterval: 5,
          pointStart: 1965
        }
      },
      tooltip: {
        crosshairs: true,
        shared: true,
        useHTML: true,
        formatter() {
          return this.points.map(point => {
            return `
              <i style="
                background-color:${point.color};
                border-radius:50%;
                display: inline-block;
                height:6px;
                margin-right:4px;
                width:6px;"
              ></i>${
                point.series.name
              }: <b>${point.y.toLocaleString()}</b><br>`
          })
        }
      },
      credits: {
        enabled: false
      },
      series: this.state.series
    }
    return (
      <div>
        {Object.keys(obj).map(i => this.renderItem(obj[i]))}
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default Graph;