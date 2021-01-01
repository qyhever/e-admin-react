import React from 'react'
import { BackTop } from 'antd'
import classNames from 'classnames'
import Bread from './Bread'
import styles from './index.module.less'
import { useStore } from '@/store'

const PageWrapper = (props) => {
  const { userStore } = useStore()
  const { wrapperClass, containerClass, hasBread, isColumn, transparent } = props
  const { breads } = userStore
  const pageWrapperCls = classNames(
    styles.pageWrapper,
    wrapperClass,
    {
      [styles.hasBread]: hasBread,
      [styles.isColumn]: isColumn,
      [styles.transparent]: transparent
    }
  )
  return (
    <div className={pageWrapperCls}>
      {hasBread && <Bread breads={breads} />}
      <div className={`${styles.pageContainer} ${containerClass}`}>
        {props.children}
      </div>
      <BackTop className={styles.backTop} />
    </div>
  )
}
PageWrapper.defaultProps = {
  wrapperClass: '',
  containerClass: '',
  hasBread: true,
  isColumn: false, // 通栏的固定高度，默认高度撑满屏幕（适合不需要滚动，内容少的页面）
  transparent: false
}

export default PageWrapper
