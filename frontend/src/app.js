import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthorPage from '@views/AuthorPage.jsx'
import AuthorsList from '@views/AuthorsList.jsx'
import Layout from '@views/Layout.jsx'
import Dashboard from '@components/Layout/Dashboard'

const App = () => (
  <Layout>
    <Switch>
      <Route path='/authors/:id' component={AuthorPage} />
      <Route path='/authors' component={AuthorsList} />
      <Route path='/hvac' render={() => 'HVAC'} />
      <Route path='/' exact component={Dashboard} />
      <Redirect to='/' />
    </Switch>
  </Layout>
)

export default App
