import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button } from 'antd'
import { getToken } from '@/utils/local'
import styles from './Login.module.less'
const FormItem = Form.Item

@connect(({ loading }) => ({
  loading: loading.effects.login.login
}))
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch.login.login(values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const token = getToken()
    // 有 token，跳转到首页
    if (token) {
      return <Redirect to={{ pathname: '/dashboard' }} />
    }
    return (
      <div className={styles.login}>
        <div className={styles.form}>
          <div className={styles.logo}>
            <h1 className={styles.title}>后台管理系统</h1>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem hasFeedback>
              {getFieldDecorator('userName', {
                initialValue: 'admin',
                rules: [{ required: true, message: '请输入账号!' }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="账号"
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                initialValue: '123456',
                rules: [{ required: true, message: '请输入密码!' }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={this.props.loading}
                onSubmit={this.handleSubmit}>
                登录
              </Button>
            </FormItem>
            <p className={styles.account}>
              <span>用户名：admin</span>
              <span>密码：123456</span>
            </p>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login
