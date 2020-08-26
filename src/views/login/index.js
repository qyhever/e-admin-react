import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import md5 from 'md5'
import { getRememberUser, setRememberUser, removeRememberUser } from '@/utils/local'
import styles from './index.module.less'
import { useStore } from '@/store'

const Login = (props) => {
  const { userStore } = useStore()
  const { history } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (form) {
      const rememberUser = getRememberUser()
      if (rememberUser) {
        form.setFieldsValue(rememberUser)
      }
    }
  }, [form])
  const onFinish = (values) => {
    if (values.remember) {
      setRememberUser(values)
    } else {
      removeRememberUser()
    }
    const params = {
      userName: values.userName,
      password: md5(md5(values.password))
    }
    userStore.loginByAccount({
      loadingCb: v => setLoading(v),
      data: params
    }).then(() => {
      history.replace('/dashboard')
    })
  }
  return (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <h1 className={styles.title}>登录</h1>
        </div>
        <Form
          className={styles.form}
          form={form}
          name="basic"
          hideRequiredMark
          colon={false}
          labelAlign="left"
          initialValues={{ remember: true }}
          onFinish={onFinish}>
          <Form.Item
            name="userName"
            hasFeedback
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input placeholder="输入账号" maxLength={20} />
          </Form.Item>

          <Form.Item
            name="password"
            hasFeedback
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="输入密码" maxLength={25} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button className={styles.buttonSubmit} type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default React.memo(Login)
