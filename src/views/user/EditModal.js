import React, { Component } from 'react'
import { Modal, Form, Input, Radio, Select, message } from 'antd'
import md5 from 'md5'
import { modalFormItemLayout } from '@/config/layout'
import { createUser, updateUser } from '@/api/user'
import UploadSingleImage from '@/components/upload-single-image'

const { Item: FormItem } = Form
const { Option } = Select

@Form.create()
class EditModal extends Component {
  state = {
    submitting: false
  }
  handleOk = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      try{
        if (err) return
        const { detail } = this.props
        this.setState({
          submitting: true
        })
        let res = {}
        if (detail.id) {
          res = await updateUser({
            ...values,
            id: detail.id
          })
        } else {
          const { password, ...params } = values
          res = await createUser({
            ...params,
            password: md5(md5(password))
          })
        }
        if (res.success) {
          const {onCreateSuccess, onEditSuccess} = this.props
          message.destroy()
          message.success(detail.id ? '修改成功' : '添加成功')
          detail.id ? onEditSuccess() : onCreateSuccess()
        }
      } catch(err){
        console.log(err)
      } finally {
        this.setState({
          submitting: false
        })
      }
    })
  }
  handleCancel = () => {
    this.props.onClose()
    this.props.form.resetFields()
  }
  render() {
    const { visible, roles = [], detail, form } = this.props
    const { submitting } = this.state
    const { getFieldDecorator } = form
    const title = detail.id ? '编辑' : '添加'
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
        
          <FormItem label="头像" {...modalFormItemLayout}>
            {getFieldDecorator('avatar', {
              rules: [{ required: true, message: '请上传头像!' }],
              initialValue: detail.avatar || ''
            })(
              <UploadSingleImage />
            )}
          </FormItem>
          
          <FormItem label="账户名" {...modalFormItemLayout}>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入账户名!' }],
              initialValue: detail.userName || ''
            })(
              <Input placeholder="请输入账户名" allowClear autoComplete="off" />
            )}
          </FormItem>
          
          <FormItem label="真实姓名" {...modalFormItemLayout}>
            {getFieldDecorator('fullName', {
              rules: [{ required: true, message: '请输入真实姓名!' }],
              initialValue: detail.fullName || ''
            })(
              <Input placeholder="请输入真实姓名" allowClear autoComplete="off" />
            )}
          </FormItem>
          
          {!detail.id &&
            <FormItem label="密码" {...modalFormItemLayout}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
                initialValue: detail.password || ''
              })(
                <Input type="password" placeholder="请输入密码" allowClear autoComplete="off" />
              )}
            </FormItem>
          }
          
          <FormItem label="状态" {...modalFormItemLayout}>
            {getFieldDecorator('enable', {
              rules: [{ required: true, message: '请输入密码!' }],
              initialValue: typeof detail.enable === 'undefined' ? true : detail.enable
            })(
              <Radio.Group buttonStyle="solid">
                <Radio.Button value={true}>启用</Radio.Button>
                <Radio.Button value={false}>禁用</Radio.Button>
              </Radio.Group>
            )}
          </FormItem>
          
          <FormItem label="角色" {...modalFormItemLayout}>
            {getFieldDecorator('role', {
              rules: [{ required: true, message: '请选择角色!' }],
              initialValue: Array.isArray(detail.roles) ? detail.roles.map(v => v.id) : []
            })(
              <Select
                placeholder="请选择角色"
                mode="multiple"
                allowClear
                getPopupContainer={triggerNode => triggerNode.parentNode}>
                {roles.map(role =>
                  <Option key={role.id} value={role.id}>{role.name}</Option>
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
