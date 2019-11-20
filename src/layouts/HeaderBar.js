import React, { Component } from 'react'
import { Layout, Icon, Dropdown, Menu } from 'antd'
import styles from './BasicLayout.module.less'
import avatarUrl from '@/assets/images/user.png'
const { Header } = Layout

class HeaderBar extends Component {
  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch.login.logout().then(() => {
        this.props.history.replace('/login')
      })
    }
  }
  render() {
    const { collapsed, onToggle, user } = this.props
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="logout">
          <span className="cursor-pointer">
            <Icon type="logout" />
            <span className="ml10">退出登录</span>
          </span>
        </Menu.Item>
      </Menu>
    )
    return (
      <Header className={styles.header}>
        <Icon
          className={styles.headerTrigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={onToggle}
        />
        <div className={styles.headerRight}>
          <Dropdown overlay={menu} placement="bottomRight">
            <div className={styles.user}>
              <span className={styles.name}>{user.userName || '用户名'}</span>
              <img className={styles.avatar} src={user.avatar || avatarUrl} alt="avatar"/>
              <Icon type="caret-down" />
            </div>
          </Dropdown>
        </div>
      </Header>
    )
  }
}

export default HeaderBar
