import React, { Component, Fragment } from 'react'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { inject, observer } from 'mobx-react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import withNProgress from '@/hoc/withNProgress'
import SideBar from './SideBar'
import HeaderBar from './HeaderBar'
import styles from './basic.module.less'

@withNProgress
@inject('appStore')
@inject('userStore')
@observer
class BasicLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pathname: ''
    }
  }
  render() {
    const { appStore, userStore, location, route } = this.props
    const { collapsed, toggleCollapsed } = appStore
    const { currentUser, menus } = userStore
    const branches = matchRoutes(route.routes, location.pathname)
    // const branch = branch[branches.length]
    console.log(branches)
    const sideProps = {
      collapsed,
      menus,
      location,
      toggleCollapsed
    }
    const headerProps = {
      collapsed,
      toggleCollapsed,
      currentUser
    }
    return (
      <div className={styles.basicLayout}>
        <SideBar {...sideProps}></SideBar>
        <section className={`${styles.appMain} ${collapsed ? styles.collapsed : ''}`}>
          <div className={styles.headerPadding}></div>
          <HeaderBar {...headerProps}></HeaderBar>
          <TransitionGroup component={Fragment}>
            <CSSTransition
              key={location.pathname}
              timeout={{ enter: 300, exit: 0 }}
              classNames="fade"
              unmountOnExit
            >
              {renderRoutes(route.routes, {}, { location })}
            </CSSTransition>
          </TransitionGroup>
        </section>
      </div>
    )
  }
}

export default BasicLayout
