import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { createBrowserHistory } from 'history'
import routes from './routes'

import Login from '@/views/login'

export const history = createBrowserHistory({
  basename: '/e-admin-react'
})

export default () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" render={() => <Redirect to={{ pathname: '/dashboard' }} />} />
    {renderRoutes(routes)}
  </Switch>
)
