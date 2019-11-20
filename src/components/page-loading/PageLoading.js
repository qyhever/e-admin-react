import React from 'react'
import { Spin } from 'antd'

const PageLoading = ({spinning = false}) => {
  const pageLoadingStyle = {
    display: spinning ? 'flex' : 'none',
    zIndex: 2000,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, .5)',
  }
  return (
    <div style={pageLoadingStyle}>
      <Spin spinning={spinning} />
    </div>
  )
}
export default PageLoading