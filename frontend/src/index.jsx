import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store'
import Home from './views/Home.jsx'
import ShowcaseHanna from '@components/ShowcaseHanna/ShowcaseHanna.jsx'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={ShowcaseHanna} />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
