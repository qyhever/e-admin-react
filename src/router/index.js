import React from 'react'
import { Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
import { history } from '@/utils/history'

export default () => (
  <Router history={history}>
    {renderRoutes(routes)}
  </Router>
)
