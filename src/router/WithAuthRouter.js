import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getToken } from '@/utils/local'
import RouterLoading from '@/components/router-loading'

function checkPermission(route, user) {
  const currentRoute = route || {}
  const currentUser = user || {}
  // 路由权限
  const auth = currentRoute.auth
  const resources = currentUser.resources || []
  // 当前用户拥有权限
  const resourceCodes = resources.map(item => item.code)
  if (auth && Array.isArray(auth)) {
    return auth.every(code => resourceCodes.includes(code))
  }
  return true
}

function withAuthRouter(OriginalComponent) {
  class WrappedComponent extends Component {
    render() {
      const token = getToken()
      if (!token) {
        return <Redirect to={{ pathname: '/login' }} />
      }
      const hasAuth = checkPermission(this.props.route, this.props.app.user)
      if (!hasAuth) {
        return <Redirect to={{ pathname: '/404' }} />
      }
      return (
        <Suspense fallback={<RouterLoading/>}>
          <OriginalComponent {...this.props} />
        </Suspense>
      )
    }
  }
  return connect(
    ({ app }) => ({ app })
  )(WrappedComponent)
}
export default withAuthRouter
