import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class Checkboxes extends Component {
  // ページロード時にactions.fetchPrefectures()を実行する
  componentDidMount() {
    const { actions } = this.props
    actions.fetchPrefectures()
  }
  render() {
    const { prefectures, actions } = this.props;
    const prefArray = prefectures.prefectures
    const prefNames = prefArray.map((p, i) => {
      return (
        <FormControlLabel
        control={
          <Checkbox
            key={i}
            checked={false}
            onChange={actions.updatePrefCodes()}
            value={p.prefCode}
            inputProps={{
              'aria-label': 'primary checkbox',
            }}
          />
        }
        label={p.prefName}
      />
      )
    })
    // const prefNames = prefArray.map((p, i) => <p key={i}>{p.prefName}</p>)
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
  prefectures: state.prefectures
});

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapState, mapDispatch)(Checkboxes);