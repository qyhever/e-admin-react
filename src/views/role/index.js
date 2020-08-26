import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Spin, Input, Button, Table, Modal, message } from 'antd'
import { useAntdTable, useBoolean, useRequest } from 'ahooks'
import PageWrapper from '@/components/page-wrapper'
import { queryFormColLayout } from '@/utils/layout'
import { formatDateTime } from '@/utils/date'
import { getRoles, deleteRole } from './service'
import { getTotalResources } from '@/api/global'
import UpdateModal from './UpdateModal'

export default function Role() {
  const [ form ] = Form.useForm()
  const [ detail, setDetail ] = useState({})
  // 查询所有权限
  const { data: resourceList = [], loading: resourceQuerying } = useRequest(getTotalResources)
  // Modal control
  const [ visible, { setTrue: openModal, setFalse: closeModal } ] = useBoolean(false)
  // 关闭 modal 时，清空 detail
  useEffect(() => {
    if (!visible) {
      setDetail({})
    }
  }, [visible])
  // 表单 表格 联动请求
  const { tableProps, search, loading: querying, refresh } = useAntdTable((options = {}) => {
    const { current, pageSize, sorter, ...rest } = options
    const p = {
      page: current,
      size: pageSize,
      ...rest,
      ...form.getFieldsValue(null, () => true) // 先放这里，hack 没有 form 参数的问题
    }
    if (sorter?.field && sorter?.order) {
      p.sortProp = sorter.field
      p.sortOrder = sorter.order === 'ascend' ? 1 : -1
    }
    return getRoles(p)
  }, {
    form,
    defaultParams: [
      { current: 1, pageSize: 10 },
      { name: '', code: '', type: '' }
    ],
    formatResult: (data) => {
      return {
        list: data.list || [],
        total: data.total || 0
      }
    }
  })
  const { submit, reset } = search
  // 删除请求
  const { loading: deletting, run: runDelete } = useRequest(deleteRole, {
    manual: true,
    onSuccess: () => {
      message.destroy()
      message.success('删除成功')
      refresh() // 刷新表格数据
    }
  })
  // 删除操作
  const onDelete = (record) => {
    Modal.confirm({
      title: '温馨提示',
      content: '确定要删除吗？',
      centered: true,
      onOk: () => {
        runDelete({
          id: record.id
        })
      }
    })
  }
  // 打开编辑 modal
  const onUpdate = (record) => {
    setDetail(record)
    openModal()
  }
  const columns = [{
    title: '角色名',
    align: 'center',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '角色描述',
    align: 'center',
    dataIndex: 'description',
    key: 'description'
  }, {
    title: '添加时间',
    align: 'center',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    render: (text) => <span>{text ? formatDateTime(text) : '-'}</span>
  }, {
    title: '修改时间',
    align: 'center',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    sorter: true,
    render: (text) => <span>{text ? formatDateTime(text) : '-'}</span>
  }, {
    title: '操作',
    align: 'center',
    dataIndex: 'operation',
    key: 'operation',
    render: (_, record) => {
      if (record.name === '超级管理员') {
        return <span>-</span>
      }
      return (
        <span>
          <Button type="link" onClick={() => onUpdate(record)}>编辑</Button>
          <Button type="link" onClick={() => onDelete(record)}>删除</Button>
        </span>
      )
    }
  }]
  return (
    <PageWrapper>
      <Spin spinning={querying || deletting || resourceQuerying}>
        <Form
          form={form}
        >
          <Row>
            <Col {...queryFormColLayout}>
              <Form.Item
                name="name"
                label="角色名"
              >
                <Input placeholder="请输入角色名" allowClear autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...queryFormColLayout}>
              <Form.Item wrapperCol={{offset: 2}}>
                <Button type="primary" onClick={submit}>查询</Button>
                <Button onClick={reset}>重置</Button>
                <Button type="primary" onClick={openModal}>添加</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          rowKey="id"
          columns={columns}
          {...tableProps}
          loading={false}
          pagination={{
            ...tableProps.pagination,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: total => `共 ${total} 条`
          }}
        />
      </Spin>
      <UpdateModal
        visible={visible}
        close={closeModal}
        resourceList={resourceList}
        refresh={refresh}
        query={submit}
        detail={detail}
      />
    </PageWrapper>
  )
}
