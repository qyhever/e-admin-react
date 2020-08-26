import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Select, Button, Row, Col, Spin, Table, Switch, Avatar, Modal, message } from 'antd'
import { useBoolean, useRequest } from 'ahooks'
import PageWrapper from '@/components/page-wrapper'
import { queryFormColLayout } from '@/utils/layout'
import { formatDateTime } from '@/utils/date'
import { getUsers, patchUser, deleteUser } from './service'
import { getTotalRoles } from '@/api/global'
import UpdateModal from './UpdateModal'

const { Option } = Select
export default function User() {
  const [ form ] = Form.useForm()
  const history = useHistory()
  const [ detail, setDetail ] = useState({})
  // 查询全部角色
  const { data: roles = [], loading: roleQuerying } = useRequest(getTotalRoles)
  // 切换状态请求
  const { loading: toggling, run: toggleEnable } = useRequest(patchUser, {
    manual: true
  })
  // Modal control
  const [ visible, { setTrue: openModal, setFalse: closeModal } ] = useBoolean(false)
  // 关闭 modal 时，清空 detail
  useEffect(() => {
    if (!visible) {
      setDetail({})
    }
  }, [visible])
  const {
    tableProps,
    // refresh,
    loading,
    run: search,
    refresh,
    mutate
  } = useRequest((options = {}) => {
    const { current, pageSize, sorter = {} } = options
    const p = {
      page: current || 1,
      size: pageSize || 10,
      ...form.getFieldsValue()
    }
    if (sorter.field && sorter.order) {
      p.sortProp = sorter.field
      p.sortOrder = sorter.order === 'ascend' ? 1 : -1
    }
    return getUsers(p)
  }, {
    paginated: true,
    paginationProps: {
      current: 1,
      pageSize: 10
    }
  })
  const { pagination } = tableProps
  console.log(tableProps)
  const onReset = () => {
    form.resetFields()
  }
  const onFinish = () => {
    search()
  }
  // 删除请求
  const { loading: deletting, run: runDelete } = useRequest(deleteUser, {
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
  // 查看详情
  const onPreview = (record) => {
    history.push(`/user/detail?id=${record.id}`)
  }
  const columns = [{
    title: '头像',
    align: 'center',
    dataIndex: 'avatar',
    key: 'avatar',
    // render: text => <img src={text} className="avatar" alt="加载失败" />
    render: text => <Avatar src={text} />
  }, {
    title: '用户名',
    align: 'center',
    dataIndex: 'userName',
    key: 'userName'
  }, {
    title: '真实姓名',
    align: 'center',
    dataIndex: 'fullName',
    key: 'fullName'
  }, {
    title: '角色',
    align: 'center',
    dataIndex: 'roles',
    key: 'roles',
    render: (text) => {
      if (text && text.length) {
        return text.map(role =>
          <span key={role.id}>{role.name}<br/></span>
        )
      }
      return <span>-</span>
    }
  }, {
    title: '启用状态',
    align: 'center',
    dataIndex: 'enable',
    key: 'enable',
    render: (text, record) => {
      const disabled = record.userName === 'admin'
      if (disabled) {
        return <span>-</span>
      }
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
      if (record.userName === 'admin') {
        return <span>-</span>
      }
      return (
        <span>
          <Button type="link" onClick={() => onPreview(record)}>查看</Button>
          <Button type="link" onClick={() => onUpdate(record)}>编辑</Button>
          <Button type="link" onClick={() => onDelete(record)}>删除</Button>
        </span>
      )
    }
  }]
  return (
    <PageWrapper>
      <Spin spinning={loading || roleQuerying || toggling || deletting}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            userName: '',
            fullName: '',
            enable: ''
          }}
        >
          <Row gutter={24}>
            <Col {...queryFormColLayout}>
              <Form.Item
                name="userName"
                label="用户名"
              >
                <Input placeholder="请输入用户名" allowClear autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...queryFormColLayout}>
              <Form.Item
                name="fullName"
                label="真实姓名"
              >
                <Input placeholder="请输入真实姓名" allowClear autoComplete="off" />
              </Form.Item>
            </Col>
            <Col {...queryFormColLayout}>
              <Form.Item
                name="enable"
                label="启用状态"
              >
                <Select
                  placeholder="请选择状态"
                  allowClear
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                >
                  <Option value="">全部</Option>
                  <Option value={1}>启用</Option>
                  <Option value={0}>禁用</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col {...queryFormColLayout}>
              <Form.Item wrapperCol={{offset: 2}}>
                <Button type="primary" htmlType="submit">查询</Button>
                <Button onClick={onReset}>重置</Button>
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
            ...pagination,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: total => `共 ${total} 条`
          }}
        />
      </Spin>
      <UpdateModal
        visible={visible}
        close={closeModal}
        roles={roles}
        refresh={refresh}
        query={search}
        detail={detail}
      />
    </PageWrapper>
  )
}
