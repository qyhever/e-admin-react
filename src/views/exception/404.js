import React from 'react'
import { Result, Button } from 'antd'

export default function Exception404({history}) {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，该页面不存在"
      extra={<Button type="primary" onClick={() => history.replace('/')}>返回首页</Button>}
    />
  )
}
