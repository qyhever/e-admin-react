import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import styles from './BasicLayout.module.less'
import logoUrl from '@/assets/images/logo.png'
import IconFont from '@/components/iconfont'
import { Scrollbars } from 'react-custom-scrollbars'
const { Sider } = Layout
const { Item, SubMenu } = Menu

const getTotalSelectedKeys = routes => {
  const getTotalSelectedRoutes = routes => {
    let result = []
    routes.forEach(item => {
      if (Array.isArray(item.routes)) {
        result = result.concat(getTotalSelectedRoutes(item.routes))
      } else {
        result.push(item)
      }
    })
    return result.filter(item => !item.hidden && !item.routes)
  }
  const totalSelectedRoutes = getTotalSelectedRoutes(routes)
  return totalSelectedRoutes.map(item => item.path)
}

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
    this.totalSelectedKeys = getTotalSelectedKeys(props.menus)
    this.selectedKey = this.totalSelectedKeys.find(key => props.location.pathname.startsWith(key))
    this.openKeys = []
    const openKey = this.rootMenuKeys.find(key => props.location.pathname.startsWith(key))
    this.state = {
      openKeys: [openKey],
      collapsed: false,
      lastOpenKeys: []
    }
  }
  // hack 菜单折叠后，子菜单不消失的 问题
  // 原因：菜单折叠后，openKeys 并没有清空
  // https://github.com/ant-design/ant-design/issues/14536
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
  // 只展开当前父级菜单
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
    const { collapsed, menus } = this.props
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
            defaultSelectedKeys={[this.selectedKey]}
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
