import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/Home.jsx'
const app = (props) => {
  let routes = (
    <Switch>
      <Route path="/authors/:id" render={() => 'author + id'} />
			<Route path="/authors" render={() => 'author'} />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
		</Switch>
  )
  return (
    routes
  )
}

export default app;