import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'

import Login from '@/views/login'
// import Authorized from './Authorized'
// import LayoutRouter from './LayoutRouter'

export default () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" render={() => <Redirect to={{ pathname: '/dashboard' }} />} />
    {renderRoutes(routes)}
    {/* <Authorized path="/" component={LayoutRouter} /> */}
  </Switch>
)
