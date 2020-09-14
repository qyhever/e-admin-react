import React from 'react'
import { renderRoutes } from 'react-router-config'
import withNProgress from '@/hoc/withNProgress'

const BlankLayout = ({ route }) => (
  <>
    {renderRoutes(route.routes)}
  </>
)

export default withNProgress(BlankLayout)
