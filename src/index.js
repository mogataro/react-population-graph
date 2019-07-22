import React from 'react';
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import CalculatorContainer from './containers/CalculatorContainer';
import Graph02 from './containers/Graph02';
import reducer from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
)

render(
  <Provider store={store}>
    <Graph02 />
  </Provider>,
  document.getElementById('root')
)