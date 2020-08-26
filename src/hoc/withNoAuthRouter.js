import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getToken } from '@/utils/local'
import { getDisplayName } from '@/utils'
import withNProgress from '@/hoc/withNProgress'

function withNoAuthRouter(WrappedComponent) {
  class WithNoAuthRouter extends Component {
    static displayName = `WithNoAuthRouter(${getDisplayName(WrappedComponent)})`
    render() {
      const token = getToken()
      if (token) {
        return <Redirect to={{ pathname: '/dashboard' }} />
      }
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
  return withNProgress(WithNoAuthRouter)
}
export default withNoAuthRouter
