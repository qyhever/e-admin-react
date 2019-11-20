import React, { Component } from 'react'
// import { matchRoutes } from 'react-router-config'
// import routes from '@/router/routes'
import request from '@/utils/request'

class Dashboard extends Component {
  query = async () => {
    try {
      const res = await request({
        url: '/user'
      })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }
  render() {
    // const branch = matchRoutes(routes, this.props.location.pathname)
    // console.log(branch)
    return (
      <div>
        <p onClick={this.query}>Dashboard</p>
      </div>
    )
  }
}

export default Dashboard
