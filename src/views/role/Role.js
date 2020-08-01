import React, { Component } from 'react'
import { Form, Row, Col, Input, Button, Table, Pagination, message, Modal } from 'antd'
import { queryFormItemLayout, queryFormColLayout } from '@/config/layout'
import { formatDateTime, listToTree } from '@/utils'
import { getRoles, deleteRole } from '@/api/role'
import { getTotalResources } from '@/api/resource'
import EditModal from './EditModal'

const { Item: FormItem } = Form

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
    resourceTree: []
  }
  form = {}
  sorter = {}
  componentDidMount() {
    this.query()
    this.queryTotalResources()
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
      const res = await getRoles(params)
      this.setState({
        list: res.list || [],
        total: res.total || 0
      })
    } catch (err) {
      console.log(err)
    } finally {
      this.setState({
        loading: false
      })
    }
  }
  queryTotalResources = async () => {
    try {
      const res = await getTotalResources()
      const list = res || []
      const resourceTree = listToTree(list, null, 'code', 'parentCode')
      this.setState({
        resourceTree
      })
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
            await deleteRole({
              id: record.id
            })
            this.query()
            message.destroy()
            message.success('删除成功')
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
    const { loading, list, total, page, size, resourceTree } = this.state
    const modalProps = {
      resourceTree,
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
        if (record.name === '超级管理员') {
          return <span>-</span>
        }
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
              <FormItem label="角色名" {...queryFormItemLayout}>
                {getFieldDecorator('name', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入角色名" allowClear autoComplete="off" />
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
