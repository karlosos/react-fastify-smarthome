import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthorPage from '@views/AuthorPage.jsx'
import AuthorsList from '@views/AuthorsList.jsx'
import Layout from '@views/Layout.jsx'
import Dashboard from '@components/Dashboard'
import Notifications from '@components/Notifications'
import Hvac from '@components/Hvac'
import './i18n'
import { ThemeProvider } from '@material-ui/styles'
import theme from './common/constants/theme'

const App = () => (
  <ThemeProvider theme={theme}>
    <Layout>
      <Switch>
        <Route path='/notifications' component={Notifications} />
        <Route path='/authors/:id' component={AuthorPage} />
        <Route path='/authors' component={AuthorsList} />
        <Route path='/hvac' component={Hvac} />
        <Route path='/' exact component={Dashboard} />
        <Redirect to='/' />
      </Switch>
    </Layout>
  </ThemeProvider>
)

export default App
