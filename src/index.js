import React from 'react';
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import CheckboxList from './containers/CheckboxList';
// import CheckboxList from './containers/CheckboxListaaa';
import Graph02 from './containers/Graph02';
import reducer from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
)

render(
  <Provider store={store}>
    <CheckboxList />
  </Provider>,
  document.getElementById('root')
)