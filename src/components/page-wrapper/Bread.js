import React from 'react'
import { NavLink } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc'
import styles from './index.module.less'

/**
 * examples
 */
// const routes = [
//   { path: '/', breadcrumb: '首页' },
//   { path: '/dashboard', breadcrumb: '控制台' },
//   { path: '/form', breadcrumb: '表单' },
//   { path: '/form/basic', breadcrumb: '表单' }
// ]

const Bread = (({ breadcrumbs }) => {
  return (
    <Breadcrumb className={styles.bread}>
      {breadcrumbs.map(breadcrumb => (
        <Breadcrumb.Item key={breadcrumb.key}>
          {breadcrumb.match.url === '/' ?
            <NavLink to={breadcrumb.match.url}>
              {breadcrumb.breadcrumb.props.children}
            </NavLink> :
            <span>{breadcrumb.breadcrumb.props.children}</span>
          }
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
})

export default ({ breads = [] }) => {
  const BreadWrapper = withBreadcrumbs(breads)(Bread)
  return <BreadWrapper/>
}
