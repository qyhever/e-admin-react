import React, { Fragment } from 'react'
import { renderRoutes } from 'react-router-config'

export default ({ route }) => (
  <Fragment>
    {renderRoutes(route.routes)}
  </Fragment>
)
