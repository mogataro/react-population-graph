import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class CheckboxList extends Component {
  // constructor() {
  //   super();
  //   this._changeSelection = this._changeSelection.bind(this);
  // }
  // ページロード時にactions.fetchPrefectures()を実行する
  componentDidMount() {
    const { actions } = this.props
    actions.fetchPrefectures()
  }

  _changeSelection(index) {
    const { graphs, actions } = this.props;
    console.log(graphs)
    console.log('チェンジセレクション')
    actions.updateSelected(index)
  }

  // _changeSelection(index) {
  //   const { graphs, actions } = this.props;
  //   const selected_copy = graphs.selected.slice();
  //   // selectedの真偽値を反転
  //   selected_copy[index] = !selected_copy[index];

  //   if (!this.state.selected[index]) {
  //   //   // チェックされていなかった場合はデータを取得
  //   //   // API Doc: https://opendata.resas-portal.go.jp/docs/api/v1/population/sum/perYear.html
  //   //   fetch(
  //   //     `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${index + 1}`,
  //   //     {
  //   //       headers: { 'X-API-KEY': process.env.REACT_APP_API_KEY }
  //   //     }
  //   //   )
  //   //     .then(response => response.json())
  //   //     .then(res => {
  //   //       let tmp = [];
  //   //       Object.keys(res.result.data[0].data).forEach(i => {
  //   //         tmp.push(res.result.data[0].data[i].value);
  //   //       });
  //   //       const res_series = {
  //   //         name: this.state.prefectures[index].prefName,
  //   //         data: tmp
  //   //       };
  //         this.setState({
  //           selected: selected_copy
  //   //         series: [...this.state.series, res_series]
  //         });
  //   //     });
  //   } else {
  //   //   const series_copy = this.state.series.slice();
  //   //   // チェック済みの場合はseriesから削除
  //   //   for (let i = 0; i < series_copy.length; i++) {
  //   //     if (series_copy[i].name == this.state.prefectures[index].prefName) {
  //   //       series_copy.splice(i, 1);
  //   //     }
  //   //   }
  //     this.setState({
  //       selected: selected_copy
  //   //     series: series_copy
  //     });
  //   }
  // }
  
  render() {
    const { graphs, actions } = this.props;
    const prefArray = graphs.prefectures
    const prefNames = prefArray.map((props, i) => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              key={props.prefCode}
              checked={graphs.selected[props.prefCode - 1]}
              onChange={() => this._changeSelection(props.prefCode - 1)}
              inputProps={{
                'aria-label': 'primary checkbox',
              }}
            />
          }
          label={props.prefName}
        />
      )
    })
    return (
      <div>
        <div>
          <p>RESAS API</p>
          {prefNames}
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  //- ownPropsとは現在のpropsを表す
  graphs: state.graphs
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapState, mapDispatch)(CheckboxList);