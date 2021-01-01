import React from 'react'
import styles from './index.module.less'

const SvgIcon = (props) => {
  const { className, name } = props
  const iconName = `#svg-${name}`
  return (
    <svg className={`${styles.svgIcon} ${name} ${className}`} aria-hidden="true">
      <use xlinkHref={iconName} />
    </svg>
  )
}

SvgIcon.defaultProps = {
  className: '',
  name: ''
}

export default React.memo(SvgIcon)
