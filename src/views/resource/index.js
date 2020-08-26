import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Button, Row, Col, Spin, Table, Switch, Modal, message } from 'antd'
// import useRequest from '@ahooksjs/use-request'
import { useAntdTable, useBoolean, useRequest } from 'ahooks'
import PageWrapper from '@/components/page-wrapper'
import { queryFormColLayout } from '@/utils/layout'
import { formatDateTime } from '@/utils/date'
import { getResources, deleteResource, getDirs, patchResource } from './service'
import UpdateModal from './UpdateModal'

const { Option } = Select
export default function Resource() {
  const [ form ] = Form.useForm()
  const [ detail, setDetail ] = useState({})
  // 查询目录资源
  const { data: dirData = [], loading: dirQuerying } = useRequest(getDirs)
  const { loading: toggling, run: toggleEnable } = useRequest(patchResource, {
    manual: true
  })
  const dirs = [
    {
      id: 0,
      name: '无',
      code: null
    },
    ...dirData
  ]
  // Modal control
  const [ visible, { setTrue: openModal, setFalse: closeModal } ] = useBoolean(false)
  // 关闭 modal 时，清空 detail
  useEffect(() => {
    if (!visible) {
      setDetail({})
    }
  }, [visible])
  // 表单 表格 联动请求
  const { tableProps, search, loading: querying, refresh, mutate } = useAntdTable((options = {}) => {
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
    return getResources(p)
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
  const { loading: deletting, run: runDelete } = useRequest(deleteResource, {
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
          id: record.id,
          type: record.type === '2' ? 'resource' : 'dir'
        })
      }
    })
  }
  // 打开编辑 modal
  const onUpdate = (record) => {
    setDetail(record)
    openModal()
  }
  // 切换状态
  const onToggleEnable = (record) => {
    toggleEnable({
      id: record.id,
      enable: !record.enable
    })
    const list = tableProps.dataSource.map(item => {
      if (item.id === record.id) {
        return {
          ...item,
          enable: !item.enable
        }
      }
      return item
    })
    // 突变，主动修改数据
    mutate({
      list,
      total: tableProps.pagination.total
    })
  }
  const columns = [{
    title: '权限名',
    align: 'center',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '权限编码',
    align: 'center',
    dataIndex: 'code',
    key: 'code'
  }, {
    title: '类型',
    align: 'center',
    dataIndex: 'type',
    key: 'type',
    render: text => {
      return <span>{text === '1' ? '目录' : '资源'}</span>
    }
  }, {
    title: '启用状态',
    align: 'center',
    dataIndex: 'enable',
    key: 'enable',
    render: (text, record) => {
      return <Switch checked={text} onChange={value => onToggleEnable(record, value)} />
    }
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
      <Spin spinning={querying || deletting || dirQuerying || toggling}>
        <Form
          form={form}
        >
          <Row gutter={24}>
            <Col {...queryFormColLayout}>
              <Form.Item
                name="name"
                label="权限名"
              >
                <Input placeholder="请输入权限名" allowClear autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...queryFormColLayout}>
              <Form.Item
                name="code"
                label="权限编码"
              >
                <Input placeholder="请输入权限编码" allowClear autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...queryFormColLayout}>
              <Form.Item
                name="type"
                label="类型"
              >
                <Select
                  placeholder="请选择类型"
                  allowClear
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  <Option value="">全部</Option>
                  <Option value="1">目录</Option>
                  <Option value="2">资源</Option>
                </Select>
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
        {/* <Pagination
          {...pagination}
          showQuickJumper
          showSizeChanger
          showTotal={total => `共 ${total} 条`}
        /> */}
      </Spin>
      <UpdateModal
        visible={visible}
        close={closeModal}
        dirs={dirs}
        refresh={refresh}
        query={submit}
        detail={detail}
      />
    </PageWrapper>
  )
}
