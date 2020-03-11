import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import AuthorsList from '@views/AuthorsList.jsx'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthorsList/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
