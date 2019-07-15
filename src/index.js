import React from 'react';
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import CalculatorContainer from './containers/CalculatorContainer';
import Graph from './containers/Graph';
import reducer from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
)

render(
  <Provider store={store}>
    <CalculatorContainer />
    <Graph />
  </Provider>,
  document.getElementById('root')
)