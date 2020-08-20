import React, { Component } from 'react'
import { Modal, Form, Input, Radio, Select, message } from 'antd'
import { modalFormItemLayout } from '@/config/layout'
import { createResource } from '@/api/resource'

const { Item: FormItem } = Form
const { Option } = Select

@Form.create()
class EditModal extends Component {
  state = {
    visible: false,
    submitting: false,
    detail: {}
  }
  open = (detail = {}) => {
    const title = detail.id ? '编辑' : '添加'
    const data = {
      title,
      visible: true
    }
    if (detail.id) {
      data.detail = detail
    }
    this.setState(data)
  }
  handleOk = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      try {
        if (err) return
        const { detail } = this.state
        this.setState({
          submitting: true
        })
        const params = {
          ...values
        }
        if (detail.id) {
          params.id = detail.id
        }
        await createResource(params)
        const {onCreateSuccess, onEditSuccess} = this.props
        message.destroy()
        message.success(detail.id ? '修改成功' : '添加成功')
        this.handleCancel()
        detail.id ? onEditSuccess() : onCreateSuccess()
      } catch (err){
        console.log(err)
      } finally {
        this.setState({
          submitting: false
        })
      }
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
      detail: {}
    })
    this.props.form.resetFields()
  }
  render() {
    const { dirs = [], form } = this.props
    const { visible, submitting, detail, title } = this.state
    const { getFieldDecorator } = form
    return (
      <Modal
        title={title}
        width={600}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose={false}
        maskClosable={false}
        confirmLoading={submitting}
      >
        <Form>
          
          <FormItem label="权限名" {...modalFormItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入权限名!' }],
              initialValue: detail.name || ''
            })(
              <Input placeholder="请输入权限名" allowClear autoComplete="off" />
            )}
          </FormItem>
          
          <FormItem label="权限编码" {...modalFormItemLayout}>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: '请输入权限编码!' }],
              initialValue: detail.code || ''
            })(
              <Input placeholder="请输入权限编码" allowClear autoComplete="off" />
            )}
          </FormItem>
          
          <FormItem label="权限类型" {...modalFormItemLayout}>
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择权限类型!' }],
              initialValue: detail.type || '2'
            })(
              <Radio.Group>
                <Radio value="1">目录</Radio>
                <Radio value="2">资源</Radio>
              </Radio.Group>
            )}
          </FormItem>
          
          <FormItem label="父级菜单" {...modalFormItemLayout}>
            {getFieldDecorator('parentCode', {
              rules: [{ required: true, message: '请选择父级菜单!' }],
              initialValue: detail.parentCode || null
            })(
              <Select
                placeholder="请选择角色"
                allowClear
                getPopupContainer={triggerNode => triggerNode.parentNode}>
                {dirs.map(dir =>
                  <Option key={dir.id} value={dir.code}>{dir.name}</Option>
                )}
              </Select>
            )}
          </FormItem>
          
        </Form>
      </Modal>
    )
  }
}

export default EditModal
