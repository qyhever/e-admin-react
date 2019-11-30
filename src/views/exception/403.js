import React from 'react'
import { Result, Button } from 'antd'

export default function Exception403({history}) {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有权限访问该页面"
      extra={<Button type="primary" onClick={() => history.replace('/')}>返回首页</Button>}
    />
  )
}
