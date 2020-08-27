import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Switch } from 'antd'
import { BulbOutlined } from '@ant-design/icons'
import { throttle } from 'lodash'
import IconFont from '@/components/iconfont'
import logoUrl from '@/assets/images/logo.png'
import { Scrollbars } from 'react-custom-scrollbars'
import styles from './basic.module.less'
import { getSideBarTheme, setSideBarTheme } from '@/utils/local'
const { Sider } = Layout
const { Item, SubMenu } = Menu

// 获取所有路由路径 ['path1', 'path2']
const getTotalKeys = routes => {
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

const RenderIcon = props => {
  const { name } = props
  if (!name) {
    return null
  }
  if (name.startsWith('icon-')) {
    return <IconFont type={name} />
  }
  const Icon = require('@ant-design/icons')[name]
  if (Icon) {
    return <Icon/>
  }
  return require('@ant-design/icons').SmileOutlined
}

// 递归生成菜单树
const generateMenus = (menus) => {
  return menus.map(item => {
    if (item.routes && item.routes.length) {
      const title = (
        <span>
          <RenderIcon name={item.icon}/>
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
          <RenderIcon name={item.icon}/>
          <span>{item.title}</span>
        </Link>
      </Item>
    )
  })
}

class SideBar extends Component {
  constructor(props) {
    super(props)
    // 父菜单（即有展开箭头的）
    this.rootMenuKeys = props.menus.filter(item => Array.isArray(item.routes)).map(item => item.path)
    // 所有子菜单
    this.totalKeys = getTotalKeys(props.menus)
    // 当前高亮菜单，当前 pathname 以 key 开头，则 key 需要选中高亮
    this.selectedKey = this.totalKeys.find(key => props.location.pathname.startsWith(key))
    // 当前展开菜单，当前 pathname 以 key 开头，则 key 需要展开
    const openKey = this.rootMenuKeys.find(key => props.location.pathname.startsWith(key))
    this.state = {
      openKeys: [openKey],
      collapsed: false,
      lastOpenKeys: [],
      theme: getSideBarTheme() === 'light' ? 'light' : 'dark'
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
  componentDidMount() {
    this.handleResizeThrottled = throttle(this.handleResize, 500)
    window.addEventListener('resize', this.handleResizeThrottled)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeThrottled)
  }
  handleResize = () => {
    this.props.toggleCollapsed(window.innerWidth <= 1400)
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
  onSwitchChange = val => {
    const theme = val ? 'dark' : 'light'
    setSideBarTheme(theme)
    this.setState({
      theme
    })
  }
  render() {
    const { theme } = this.state
    const { collapsed, menus } = this.props
    const toggleThemeLeftStyle = { display: collapsed ? 'none' : 'block' }
    return (
      <Sider
        width={210}
        className={`${styles.sideBar} ${styles[theme]}`}
        collapsible
        collapsed={collapsed}
        collapsedWidth={60}
        trigger={null}
        theme={theme}
      >
        <Scrollbars style={{height: '100%'}} autoHide>
          <Link className={styles.logoContainer} to="/">
            <img alt="logo" src={logoUrl} className={styles.image} />
            {!collapsed && <h1 className={styles.title}>后台管理系统</h1>}
          </Link>
          <Menu
            mode="inline"
            theme={theme}
            defaultSelectedKeys={[this.selectedKey]}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
          >
            {generateMenus(menus)}
          </Menu>
        </Scrollbars>
        <div className={styles.toggleTheme}>
          <div className={styles.toggleThemeLeft} style={toggleThemeLeftStyle}>
            <BulbOutlined />
            <span className={styles.toggleThemeText}>切换主题</span>
          </div>
          <Switch checkedChildren="黑" unCheckedChildren="白" checked={theme === 'dark'} onChange={this.onSwitchChange}></Switch>
        </div>
      </Sider>
    )
  }
}

export default SideBar
