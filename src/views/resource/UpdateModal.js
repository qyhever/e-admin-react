import React, { useEffect } from 'react'
import { Modal, Form, Input, Radio, Select, message } from 'antd'
import { useRequest } from 'ahooks'
import { modalFormItemLayout } from '@/utils/layout'
import { saveResource } from './service'

const { Item: FormItem } = Form
const { Option } = Select

function UpdateModal(props) {
  const { visible, close, dirs, refresh, query, detail } = props
  const [ form ] = Form.useForm()
  // 编辑模式，回显数据
  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        id: detail.id || '',
        name: detail.name || '',
        code: detail.code || '',
        type: detail.type || '2',
        parentCode: detail.parentCode || null
      })
    }
  }, [visible, form, detail])
  let cancelSaveReq = null
  const onSubmitSuccess = () => {
    message.destroy()
    message.success(detail.id ? '编辑成功' : '添加成功')
    form.resetFields()
    close()
    detail.id ? refresh() : query()
  }
  // create
  const { loading: submitting, run: save } = useRequest((p) => {
    return saveResource(p, cancel => {
      cancelSaveReq = cancel
    })
  }, {
    manual: true,
    onSuccess: () => {
      onSubmitSuccess()
    }
  })
  const onCancel = () => {
    cancelSaveReq && cancelSaveReq()
    form.resetFields()
    close()
  }
  const onOk = async () => {
    try {
      await form.validateFields()
      const values = form.getFieldsValue()
      const formData = {
        ...values
      }
      const { id } = detail
      if (id) {
        formData.id = id
      }
      save(formData)
    } catch (error) {
      console.log(error)
    }
  }
  const initialValues = {
    name: '',
    code: '',
    type: '2',
    parentCode: null
  }
  return (
    <Modal
      visible={visible}
      title={detail.id ? '编辑' : '添加'}
      width={600}
      onCancel={onCancel}
      maskClosable={false}
      onOk={onOk}
      confirmLoading={submitting}
    >
      <Form
        form={form}
        initialValues={initialValues}
      >
        <FormItem
          {...modalFormItemLayout}
          name="name"
          label="权限名"
          rules={[{ required: true, message: '请输入权限名!' }]}
        >
          <Input placeholder="请输入权限名" allowClear autoComplete="off" />
        </FormItem>

        <FormItem
          {...modalFormItemLayout}
          name="code"
          label="权限编码"
          rules={[{ required: true, message: '请输入权限编码!' }]}
        >
          <Input placeholder="请输入权限编码" allowClear autoComplete="off" />
        </FormItem>

        <FormItem
          {...modalFormItemLayout}
          name="type"
          label="权限类型"
          rules={[{ required: true, message: '请选择权限类型!' }]}
        >
          <Radio.Group>
            <Radio value="1">目录</Radio>
            <Radio value="2">资源</Radio>
          </Radio.Group>
        </FormItem>

        <FormItem
          {...modalFormItemLayout}
          name="parentCode"
          label="父级菜单"
          rules={[{ required: true, message: '请选择父级菜单!' }]}
        >
          <Select
            placeholder="请选择父级菜单"
            allowClear
            getPopupContainer={triggerNode => triggerNode.parentNode}>
            {dirs.map(dir =>
              <Option key={dir.id} value={dir.code}>{dir.name}</Option>
            )}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  )
}

export default React.memo(UpdateModal)
