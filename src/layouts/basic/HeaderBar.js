import React from 'react'
import { Row, Dropdown, Menu, Avatar } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, CaretDownOutlined, LogoutOutlined } from '@ant-design/icons'
import styles from './basic.module.less'
import avatarUrl from '@/assets/images/user.png'
import { removeUserData } from '@/utils/local'

const HeaderBar = props => {
  const { collapsed, currentUser: user, toggleCollapsed } = props
  const onHeaderToggleClick = () => {
    toggleCollapsed()
  }
  const handleMenuClick = ({key}) => {
    if (key === 'logout') {
      console.log('logout')
      removeUserData()
      window.location.reload()
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="logout">
        <span className="cursor-pointer">
          <LogoutOutlined/>
          <span className="ml10">退出登录</span>
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <header className={styles.headerBar}>
      <Row className={styles.headerToggle} align="middle" justify="center" onClick={onHeaderToggleClick}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Row>
      <div className={styles.headerRight}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Row className={styles.user} align="middle">
            <span className={styles.name}>{user.userName || '用户名'}</span>
            <Avatar
              className={styles.avatar}
              src={user.avatar}
              icon={<img src={avatarUrl} alt="avatar"/>}
            />
            <CaretDownOutlined/>
          </Row>
        </Dropdown>
      </div>
    </header>
  )
}

export default HeaderBar
