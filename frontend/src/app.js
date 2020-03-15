import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthorPage from '@views/AuthorPage.jsx'
<<<<<<< HEAD
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
=======
import Layout from './components/Layout'
import AuthorsList from './views/AuthorsList.jsx'
import Dashboard from './views/Dashboard.jsx'

const App = (props) => {
  const routes = (
    <Switch>
      <Route path='/authors/:id' component={AuthorPage} />
      <Route path='/authors' component={AuthorsList} />
      <Route path='/hvac' render={() => 'hvac'} />
      <Route path='/' component={Dashboard} />
      <Redirect to='/' />
    </Switch>
  )

  return (
    <Layout>
      {routes}
    </Layout>
  )
}
>>>>>>> feat: PATRON2020-106 add store handling (dashboard only), add 404 page, add spinner

export default App
