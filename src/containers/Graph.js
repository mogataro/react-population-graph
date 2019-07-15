import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import NumBtn from '../components/NumBtn';
import PlusBtn from '../components/PlusBtn';
import MinusBtn from '../components/MinusBtn';
import ClearBtn from '../components/ClearBtn';
import Result from '../components/Result';

class Graph extends Component {
  // ページロード時にactions.fetchPrefectures()を実行する
  componentDidMount() {
    const { actions } = this.props
    actions.fetchPrefectures()
  }
  render() {
    const { prefectures, actions } = this.props;
    const prefArray = prefectures.prefectures
    const prefNames = prefArray.map((p, i) => <p key={i}>{p.prefName}</p>)
    const hoge = '<p>ほげ</p>'
    return (
      <div>
        <div>
          <p>RESAS API</p>
          <button onClick={() => actions.fetchPrefectures()}>都道府県を取得</button>
          <div dangerouslySetInnerHTML={{ __html: hoge }}></div>
          {prefNames}
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  prefectures: state.prefectures
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapState, mapDispatch)(Graph);