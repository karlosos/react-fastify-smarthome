import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthorPage from '@views/AuthorPage.jsx'
<<<<<<< HEAD
import AuthorsList from '@views/AuthorsList.jsx'
import Layout from '@views/Layout.jsx'
import Dashboard from '@components/Layout/Dashboard'

const App = () => (
  <Layout>
    <Switch>
      <Route path='/authors/:id' component={AuthorPage} />
      <Route path='/authors' component={AuthorsList} />
      <Route path='/' exact component={Dashboard} />
      <Redirect to='/' />
    </Switch>
  </Layout>
=======

const App = (props) => (
  <Switch>
    <Route path='/authors/:id' component={AuthorPage} />
    <Route path='/authors' component={Home} />
    <Route path='/hvac' component={Home} />
    <Route path='/' exact component={Home} />
    <Redirect to='/' />
  </Switch>
>>>>>>> feat: PATRON2020-105 add header and draft layout, modify routes
)

export default App
