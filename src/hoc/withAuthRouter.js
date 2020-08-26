import React, { Component, Suspense } from 'react'
import { Redirect } from 'react-router-dom'
import { inject } from 'mobx-react'
import { getToken } from '@/utils/local'
import { hasPermission, getDisplayName } from '@/utils'
import RouterLoading from '@/components/router-loading'
import hoistStatics from 'hoist-non-react-statics'

function withAuthRouter(WrappedComponent) {
  class WithAuthRouter extends Component {
    static displayName = `WithAuthRouter(${getDisplayName(WrappedComponent)})`
    render() {
      const token = getToken()
      if (!token) {
        return <Redirect to={{ pathname: '/login' }} />
      }
      const { wrappedComponentRef, route, userStore, ...restProps } = this.props
      const { currentUser } = userStore
      const { resourceCodes } = currentUser
      const hasAuth = hasPermission(route, resourceCodes)
      if (!hasAuth) {
        return <Redirect to={{ pathname: '/403' }} />
      }
      return (
        <Suspense fallback={<RouterLoading />}>
          <WrappedComponent ref={wrappedComponentRef} route={route} {...restProps} />
        </Suspense>
      )
    }
  }
  // WithAuthRouter.displayName = `WithAuthRouter(${getDisplayName(WrappedComponent)})`
  return hoistStatics(inject('userStore')(WithAuthRouter), WrappedComponent)
}
export default withAuthRouter
