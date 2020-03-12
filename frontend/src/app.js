import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './views/Home.jsx'
import AuthorPage from './views/AuthorPage.jsx'
import AuthorsList from '@views/AuthorsList.jsx'

const App = (props) => (
  <Switch>
    <Route path='/authors/:id' component={AuthorPage} />
    <Route path='/authors' component={AuthorsList} />
    <Route path='/' exact component={Home} />
    <Redirect to='/' />
  </Switch>
)

export default App
