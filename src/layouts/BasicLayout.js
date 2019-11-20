import React, { Component } from 'react'
import { Layout } from 'antd'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { connect } from 'react-redux'
import classNames from 'classnames'
import styles from './BasicLayout.module.less'
import HeaderBar from './HeaderBar'
import Bread from './Bread'
import Sidebar from './Sidebar'
const { Content, Footer } = Layout

@connect(({ app }) => ({ app }))
class BasicLayout extends Component {
  state = {
    collapsed: false
  }
  handleToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    const { collapsed } = this.state
    const mainClass = classNames({
      [styles.mainContainer]: true,
      [styles.unfold]: collapsed
    })
    const { app, location, route, dispatch, history } = this.props
    const { menus, user, breads } = app
    const headerProps = {
      collapsed,
      onToggle: this.handleToggle,
      dispatch,
      history,
      user
    }
    const breadProps = {
      breads
    }
    const sidebarProps = {
      collapsed,
      menus,
      location
    }
    const branch = matchRoutes(route.routes, location.pathname)
    const isNotFound = branch[0].match.path === '*' || branch[0].match.path === '/404'
    const contentStyle = {
      paddingTop: isNotFound ? 24 : 0
    }
    return (
      <div className={styles.appContainer}>
        <Sidebar {...sidebarProps} />
        <Layout className={mainClass}>
          <HeaderBar {...headerProps} />
          <Content className={styles.content} style={contentStyle}>
            {!isNotFound && <Bread {...breadProps} />}
            <div className={styles.contentInner}>
              {renderRoutes(route.routes)}
            </div>
          </Content>
          <Footer className={styles.footer}>正在缓冲99% ©2019 Created by platchar</Footer>
        </Layout>
      </div>
    )
  }
}

export default BasicLayout
