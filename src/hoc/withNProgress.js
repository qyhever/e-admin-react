import React, { Component } from 'react'
import { getDisplayName } from '@/utils'
import { clearPending } from '@/api/request'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function withNProgress(WrappedComponent) {
  return class extends Component {
    state = {
      isFirstRender: true
    }
    static displayName = `WithNProgress(${getDisplayName(WrappedComponent)})`
    static getDerivedStateFromProps(_, state) {
      if (state.isFirstRender) {
        // NProgress.isStarted()
        NProgress.start()
        return {
          isFirstRender: false
        }
      }
      return null
    }
    componentDidMount() {
      this.unlisten = this.props.history.listen(() => {
        // 路由跳转时，取消上个路由还未完成的请求
        clearPending()
        NProgress.start()
      })
      this.timer = setTimeout(() => {
        NProgress.done()
      }, 300)
    }

    componentDidUpdate() {
      NProgress.done()
    }

    componentWillUnmount() {
      NProgress.done()
      clearTimeout(this.timer)
      this.unlisten()
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}
