import React, { Component } from 'react'
import { Form, Row, Col, Input, Button, Select, Table, Switch, Pagination, message, Modal } from 'antd'
import { queryFormItemLayout, queryFormColLayout } from '@/config/layout'
import { formatDateTime } from '@/utils'
import { getUsers, patchUser, deleteUser } from '@/api/user'
import EditModal from './EditModal'
import { getTotalRoles } from '@/api/role'

const { Item: FormItem } = Form
const { Option } = Select

@Form.create()
class User extends Component {
  state = {
    loading: false,
    list: [],
    total: 0,
    page: 1,
    size: 10,
    visible: false,
    detail: {},
    roles: []
  }
  form = {}
  sorter = {}
  componentDidMount() {
    this.query()
    this.queryTotalRoles()
  }
  queryTotalRoles = async () => {
    try {
      const res = await getTotalRoles()
      if (res.success) {
        const list = res.data || []
        this.setState({
          roles: list
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  query = async () => {
    try {
      const params = Object.assign({}, this.form, this.sorter, {
        page: this.state.page,
        size: this.state.size
      })
      const res = await getUsers(loading => this.setState({loading}), params)
      if (res.success) {
        this.setState({
          list: res.data.list || [],
          total: res.data.total || 0
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  handleSearch = e => {
    e.preventDefault()
    const values = this.props.form.getFieldsValue()
    this.form = values
    this.query()
  }
  handleReset = () => {
    this.props.form.resetFields()
    this.form = {}
    this.query()
  }
  handleTableChange = (pagination, _, sorter) => {
    const { current, pageSize } = pagination
    this.setState({
      page: current || 1,
      size: pageSize || 10
    }, () => {
      const params = {}
      if (sorter.field && sorter.order) {
        params.sortProp = sorter.field
        params.sortOrder = sorter.order === 'ascend' ? 1 : -1
      } else {
        params.sortProp = null
        params.sortOrder = null
      }
      this.sorter = params
      this.query()
    })
  }
  handlePaginationChange = (page, size) => {
    this.setState({
      page,
      size
    }, () => {
      this.query()
    })
  }
  handleToggleEnable = async (record) => {
    try {
      const res = await patchUser(loading => this.setState({loading}), {
        id: record.id,
        enable: !record.enable
      })
      if (res.success) {
        const list = this.state.list.map(item => {
          if (item.id === record.id) {
            return {
              ...item,
              enable: !item.enable
            }
          }
          return item
        })
        this.setState({
          list
        })
        message.destroy()
        message.success('操作成功')
      }
    } catch (err) {
      console.log(err)
    }
  }
  handlePreview = (record) => {
    this.props.history.push(`/user/detail?id=${record.id}`)
  }
  handleDelete = (record) => {
    Modal.confirm({
      title: '温馨提示',
      content: '确定要删除吗？',
      centered: true,
      onOk: async () => {
        try {
          const res = await deleteUser(loading => this.setState({loading}), {
            id: record.id
          })
          if (res.success) {
            this.query()
            message.destroy()
            message.success('删除成功')
          }
        } catch (err) {
          console.log(err)
        }
      },
      onCancel: () => {
        // ...
      }
    })
  }
  handleCreate = () => {
    this.setState({
      visible: true
    })
    console.log(this.formRef)
  }
  handleCreateSuccess = () => {
    this.setState({
      visible: false,
      page: 1,
      size: 10
    }, () => {
      this.query()
    })
  }
  handleEdit = (record) => {
    this.setState({
      visible: true,
      detail: record
    })
  }
  handleEditSuccess = () => {
    this.setState({
      visible: false,
      detail: {}
    }, () => {
      this.query()
    })
  }
  handleModalClose = () => {
    this.setState({
      visible: false,
      detail: {}
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form
    const { loading, list, total, page, size, visible, detail, roles } = this.state
    const modalProps = {
      visible,
      detail,
      roles,
      onCreateSuccess: this.handleCreateSuccess,
      onEditSuccess: this.handleEditSuccess,
      onClose: this.handleModalClose
    }
    const pagination = {
      total,
      current: page,
      pageSize: size,
      showTotal: total => `共${total}条`,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: this.handlePaginationChange,
      onShowSizeChange: this.handlePaginationChange
    }
    const columns = [{
      title: '头像',
      align: 'center',
      dataIndex: 'avatar',
      key: 'avatar',
      render: text => <img src={text} className="avatar" alt="加载失败" />
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
        return <Switch checked={text} disabled={loading} onChange={value => this.handleToggleEnable(record, value)} />
      }
    }, {
      title: '添加时间',
      align: 'center',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      // sortOrder: sortOrder,
      render: (text) => <span>{text ? formatDateTime(text) : '-'}</span>
    }, {
      title: '修改时间',
      align: 'center',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: true,
      // sortOrder: sortOrder,
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
            <Button type="link" onClick={() => this.handlePreview(record)}>查看</Button>
            <Button type="link" onClick={() => this.handleEdit(record)}>编辑</Button>
            <Button type="link" disabled={loading} onClick={() => this.handleDelete(record)}>删除</Button>
          </span>
        )
      }
    }]
    return (
      <div className="com-container">
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24}>

            <Col {...queryFormColLayout}>
              <FormItem label="用户名" {...queryFormItemLayout}>
                {getFieldDecorator('userName', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入用户名" allowClear autoComplete="off" />
                )}
              </FormItem>
            </Col>

            <Col {...queryFormColLayout}>
              <FormItem label="真实姓名" {...queryFormItemLayout}>
                {getFieldDecorator('fullName', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入真实姓名" allowClear autoComplete="off" />
                )}
              </FormItem>
            </Col>

            <Col {...queryFormColLayout}>
              <FormItem label="启用状态" {...queryFormItemLayout}>
                {getFieldDecorator('enable', {
                  initialValue: ''
                })(
                  <Select
                    placeholder="请选择状态"
                    allowClear
                    getPopupContainer={triggerNode => triggerNode.parentNode}>
                    <Option value="">全部</Option>
                    <Option value={1}>启用</Option>
                    <Option value={0}>禁用</Option>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col {...queryFormColLayout}>
              <FormItem wrapperCol={{offset: 2}}>
                <Button type="primary" htmlType="submit" disabled={loading} onSubmit={this.handleSearch}>查询</Button>
                <Button onClick={this.handleReset} disabled={loading}>重置</Button>
                <Button type="primary" onClick={this.handleCreate}>添加</Button>
              </FormItem>
            </Col>
          </Row>

        </Form>
        <div className="table-container">
          <Table
            scroll={{ x: 1376 }}
            loading={loading}
            dataSource={list}
            columns={columns}
            rowKey="id"
            pagination={false}
            onChange={this.handleTableChange}
          />
        </div>
        <div className="pagination-container">
          <Pagination {...pagination} />
        </div>
        <EditModal {...modalProps} wrappedComponentRef={(inst) => this.formRef = inst} />
      </div>
    )
  }
}

export default User
