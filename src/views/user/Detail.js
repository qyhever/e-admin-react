import React, { Component } from 'react'
import qs from 'qs'

class UserDetail extends Component {
  render() {
    const search = this.props.location.search
    const query = qs.parse(search)
    console.log(query)
    return (
      <div>
        UserDetail
      </div>
    )
  }
}

export default UserDetail
