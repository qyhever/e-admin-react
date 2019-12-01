import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { modalFormItemLayout } from '@/config/layout'
import { createRole, updateRole } from '@/api/role'
import ResourceTree from './ResourceTree'

const { Item: FormItem } = Form

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
        let res = {}
        const resources = values.resources.keys.map(Number)
        if (detail.id) {
          res = await updateRole({
            ...values,
            id: detail.id,
            resources
          })
        } else {
          res = await createRole({
            ...values,
            resources
          })
        }
        if (res.success) {
          const {onCreateSuccess, onEditSuccess} = this.props
          message.destroy()
          message.success(detail.id ? '修改成功' : '添加成功')
          this.handleCancel()
          detail.id ? onEditSuccess() : onCreateSuccess()
        }
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
    const { resourceTree = [], form } = this.props
    const { visible, submitting, detail, title } = this.state
    const { getFieldDecorator } = form
    const resources = detail.resources || []
    const keys = resources.map(v => v.id)
    // exclude dir item
    const checkedKeys = resources.filter(item => item.type === '2').map(v => v.id)
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
          
          <FormItem label="角色名" {...modalFormItemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入角色名!' }],
              initialValue: detail.name || ''
            })(
              <Input placeholder="请输入角色名" allowClear autoComplete="off" />
            )}
          </FormItem>
          
          <FormItem label="角色描述" {...modalFormItemLayout}>
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入角色描述!' }],
              initialValue: detail.description || ''
            })(
              <Input placeholder="请输入角色描述" allowClear autoComplete="off" />
            )}
          </FormItem>
          
          <FormItem label="可用权限" {...modalFormItemLayout}>
            {getFieldDecorator('resources', {
              rules: [{ required: true, message: '请选择父级菜单!' }],
              initialValue: {checkedKeys, keys}
            })(
              <ResourceTree resourceTree={resourceTree} />
            )}
          </FormItem>
          
        </Form>
      </Modal>
    )
  }
}

export default EditModal
