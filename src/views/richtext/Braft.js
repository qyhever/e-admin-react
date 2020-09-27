import React, { useEffect } from 'react'
import { Form, Input, Button, Row } from 'antd'
import PageWrapper from '@/components/page-wrapper'
import BraftEditor from '@/components/braft'

const FormItem = Form.Item

export default function Braft() {
  const [form] = Form.useForm()

  useEffect(() => {
    const timer = setTimeout(() => {
      form.setFieldsValue({
        content: '<p>Hello <b>Braft!</b></p>'
      })
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [form])

  const onFinish = values => {
    const result = {
      title: values.title,
      content: values.content.toHTML()
    }
    console.log(result)
  }
  return (
    <PageWrapper>
      <Form
        form={form}
        onFinish={onFinish}
      >
        <FormItem
          name="title"
          label="文章标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入标题" maxLength={20} style={{width: '300px'}} autoComplete="off" />
        </FormItem>
        <FormItem
          name="content"
          label="文章正文"
          trigger="onBlur"
          validateTrigger="onBlur"
          rules={[{
            required: true,
            validator: (_, value) => {
              if (value.isEmpty()) {
                return Promise.reject('请输入正文内容')
              }
              return Promise.resolve()
            }
          }]}
        >
          <BraftEditor className="braft-editor" placeholder="请输入正文内容" />
        </FormItem>
        <FormItem>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Row>
        </FormItem>
      </Form>
    </PageWrapper>
  )
}
