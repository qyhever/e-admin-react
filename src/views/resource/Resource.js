import React, { Component } from 'react'
import { Form, Row, Col, Input, Button, Select, Switch, Table, Pagination, message, Modal } from 'antd'
import { queryFormItemLayout, queryFormColLayout } from '@/config/layout'
import { formatDateTime } from '@/utils'
import { getResources, deleteResource, patchResource, getDirs } from '@/api/resource'
import EditModal from './EditModal'

const { Item: FormItem } = Form
const { Option } = Select

@Form.create()
class User extends Component {
  constructor(props) {
    super(props)
    this.modalRefFn = inst => this.modalRef = inst
  }
  state = {
    loading: false,
    deleting: false,
    list: [],
    total: 0,
    page: 1,
    size: 10,
    dirs: []
  }
  form = {}
  sorter = {}
  componentDidMount() {
    this.query()
    this.queryResourceDirs()
  }
  query = async () => {
    try {
      this.setState({
        loading: true
      })
      const params = Object.assign({}, this.form, this.sorter, {
        page: this.state.page,
        size: this.state.size
      })
      const res = await getResources(params)
      if (res.success) {
        this.setState({
          list: res.data.list || [],
          total: res.data.total || 0
        })
      }
    } catch (err) {
      console.log(err)
    } finally {
      this.setState({
        loading: false
      })
    }
  }
  queryResourceDirs = async () => {
    try {
      const res = await getDirs()
      if (res.success) {
        const list = res.data || []
        this.setState({
          dirs: [{
            id: 0,
            name: '无',
            code: null
          }, ...list]
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
      this.setState({
        loading: true
      })
      const res = await patchResource({
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
    } finally {
      this.setState({
        loading: false
      })
    }
  }
  handleDelete = (record) => {
    Modal.confirm({
      title: '温馨提示',
      content: '确定要删除吗？',
      centered: true,
      onOk: () => {
        this.setState({
          deleting: true,
          loading: true
        }, async () => {
          try {
            const res = await deleteResource({
              id: record.id,
              type: record.type === '2' ? 'resource' : 'dir'
            })
            if (res.success) {
              this.query()
              message.destroy()
              message.success('删除成功')
            }
          } catch (err) {
            console.log(err)
          } finally {
            this.setState({
              deleting: false,
              loading: false
            })
          }
        })
      },
      onCancel: () => {
        // ...
      }
    })
  }
  handleCreate = () => {
    this.modalRef.open()
  }
  handleCreateSuccess = () => {
    this.setState({
      page: 1,
      size: 10
    }, () => {
      this.query()
    })
  }
  handleEdit = (record) => {
    this.modalRef.open(record)
  }
  
  render() {
    const { getFieldDecorator } = this.props.form
    const { loading, list, total, page, size, dirs } = this.state
    const modalProps = {
      dirs,
      onCreateSuccess: this.handleCreateSuccess,
      onEditSuccess: () => this.query()
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
        return (
          <span>
            <Button type="link" onClick={() => this.handleEdit(record)}>编辑</Button>
            <Button type="link" disabled={this.state.deleting} onClick={() => this.handleDelete(record)}>删除</Button>
          </span>
        )
      }
    }]
    return (
      <div className="com-container">
        <Form onSubmit={this.handleSearch}>
          <Row gutter={24}>

            <Col {...queryFormColLayout}>
              <FormItem label="权限名" {...queryFormItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入权限名" allowClear autoComplete="off" />
                )}
              </FormItem>
            </Col>

            <Col {...queryFormColLayout}>
              <FormItem label="权限编码" {...queryFormItemLayout}>
                {getFieldDecorator('code', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入权限编码" allowClear autoComplete="off" />
                )}
              </FormItem>
            </Col>

            <Col {...queryFormColLayout}>
              <FormItem label="类型" {...queryFormItemLayout}>
                {getFieldDecorator('type', {
                  initialValue: ''
                })(
                  <Select
                    placeholder="请选择状态"
                    allowClear
                    getPopupContainer={triggerNode => triggerNode.parentNode}>
                    <Option value="">全部</Option>
                    <Option value="1">目录</Option>
                    <Option value="2">资源</Option>
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
        <EditModal {...modalProps} wrappedComponentRef={this.modalRefFn} />
      </div>
    )
  }
}

export default User
