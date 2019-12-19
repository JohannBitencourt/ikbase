import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import { Provider } from 'react-redux'
import App from './App'

require('dotenv').config();

/* Habilita Redux */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(  
  <Provider store={store}>
    <App />
  </Provider>, 
document.getElementById('root'));