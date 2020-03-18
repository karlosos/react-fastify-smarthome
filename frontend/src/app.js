import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthorPage from '@views/AuthorPage.jsx'
import AuthorsList from '@views/AuthorsList.jsx'
import Layout from '@views/Layout.jsx'
import Dashboard from '@components/Layout/Dashboard'

const App = () => {
  const routes = (
    <Switch>
      <Route path='/authors/:id' component={AuthorPage} />
      <Route path='/authors' component={AuthorsList} />
      <Route path='/hvac' render={() => 'hvac'} />
      <Route path='/' exact component={Dashboard} />
      <Redirect to='/' />
    </Switch>
  )
  return (
    <Layout>
      {routes}
    </Layout>
  )
}
export default App
