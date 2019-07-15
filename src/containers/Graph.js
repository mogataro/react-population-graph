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
  render() {
    console.log(this.props);
    const { prefectures, actions } = this.props;
    const prefArray = prefectures.prefectures
    const maxCount = prefArray.length
    const prefNames = [];
    //アイテムを10件生成
    for (let i = 0; i < maxCount; i++) {
      prefNames.push(
        <p>{prefArray[i].prefName}</p>
      )
    }
    return (
      <div>
        <div>
          <p>RESAS API</p>
          <button onClick={() => actions.fetchPrefectures()}>都道府県を取得</button>
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