import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { StoreContext } from 'redux-react-hook'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'
import Home from './views/Home.jsx'

ReactDOM.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <Route component={Home} />
    </StoreContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
