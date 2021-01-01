import React from 'react'
import { Table, Typography, Tag } from 'antd'
import { genGuid } from '@/utils'

const { Paragraph } = Typography

const OrderList = () => {
  const orderList = Array(8).fill(null).map(() => {
    return {
      orderId: genGuid(),
      price: (Math.random() * 10000 + 1000) | 0
    }
  })
  const columns = [
    {
      title: 'ID',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'center',
      render(text) {
      return <Paragraph copyable style={{margin: 0}}>{text}</Paragraph>
      }
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render(text, record, index) {
        const type = index % 2 === 0 ? 'success' : 'error'
        const content = index % 2 === 0 ? 'success' : 'fail'
        return (
        <Tag color={type}>{content}</Tag>
        )
      }
    }
  ]
  return (
    <Table
      dataSource={orderList}
      columns={columns}
      rowKey="orderId"
      pagination={false}
    >
    </Table>
  )
}

export default OrderList
