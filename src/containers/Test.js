import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
import NumBtn from '../components/NumBtn';
import PlusBtn from '../components/PlusBtn';
import MinusBtn from '../components/MinusBtn';
import ClearBtn from '../components/ClearBtn';
import Result from '../components/Result';

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);

class Test extends Component {
  render() {
    const { calculator, actions } = this.props;
    return (
      <div>
        <div>
          <p>アイウエオテスト</p>
        </div>
      </div>
    );
  }
}

export default Test;