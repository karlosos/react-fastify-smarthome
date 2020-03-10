import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
<<<<<<< HEAD

import AuthorsList from '@views/AuthorsList.jsx'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthorsList/>
    </Provider>
=======
import KamilJCard from './components/Authors/KamilJCard'

ReactDOM.render(
  <BrowserRouter>
    <StoreContext.Provider value={store}>
      <Route component={KamilJCard} />
    </StoreContext.Provider>
>>>>>>> feat: [64] add Kamil J about card
  </BrowserRouter>,
  document.getElementById('root')
)
