import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getToken } from '@/utils/local'

class Auth extends Component {
  render() {
    const token = getToken()
    if (!token) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    const { children } = this.props
    return children
  }
}

export default Auth
