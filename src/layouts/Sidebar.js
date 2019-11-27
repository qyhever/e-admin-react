import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import styles from './BasicLayout.module.less'
import logoUrl from '@/assets/images/logo.png'
import IconFont from '@/components/iconfont'
import { Scrollbars } from 'react-custom-scrollbars'
const { Sider } = Layout
const { Item, SubMenu } = Menu

const generateMenus = (menus) => {
  return menus.map(item => {
    if (Array.isArray(item.routes)) {
      const title = (
        <span>
         {item.icon && (item.icon.indexOf('icon-') === 0 ? <IconFont type={item.icon} /> : <Icon type={item.icon} />)}
          <span>{item.title}</span>
        </span>
      )
      return !item.hidden && (
        <SubMenu key={item.path} title={title}>
          {generateMenus(item.routes)}
        </SubMenu>
      )
    }
    return !item.hidden && (
      <Item key={item.path}>
        <Link to={item.path}>
          {item.icon && (item.icon.indexOf('icon-') === 0 ? <IconFont type={item.icon} /> : <Icon type={item.icon} />)}
          <span>{item.title}</span>
        </Link>
      </Item>
    )
  })
}

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.rootMenuKeys = props.menus.filter(item => Array.isArray(item.routes)).map(item => item.path)
    this.openKeys = []
    const openKey = this.rootMenuKeys.find(key => props.location.pathname.startsWith(key))
    this.state = {
      openKeys: [openKey],
      collapsed: false,
      lastOpenKeys: []
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.collapsed !== state.collapsed) {
      if (props.collapsed) {
        state.lastOpenKeys = state.openKeys
        return {
          collapsed: props.collapsed,
          openKeys: []
        }
      }
      return {
        collapsed: props.collapsed,
        openKeys: state.lastOpenKeys
      }
    }
    return null
  }
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) < 0)
    if (this.rootMenuKeys.indexOf(latestOpenKey) < 0) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      })
    }
  }
  render() {
    const { collapsed, menus, location } = this.props
    let { pathname } = location
    pathname = pathname === '/' ? '/dashboard' : pathname
    return (
      <Sider
        width={210}
        className={styles.slideContainer}
        collapsible
        collapsed={collapsed}
        trigger={null}
        theme="dark">
        <Scrollbars style={{height: '100%'}} autoHide>
          <Link className={styles.logoContainer} to="/">
            <img alt="logo" src={logoUrl} className={styles.image} />
            {!collapsed && <h1 className={styles.title}>后台管理系统</h1>}
          </Link>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          >
          {generateMenus(menus)}
          </Menu>
        </Scrollbars>
      </Sider>
    )
  }
}
