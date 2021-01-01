import React from 'react'
import { Table, Image } from 'antd'
import styles from './table.module.less'

const UserList = () => {
  const userList = [
    {
      name: 'Louis Hansen',
      location: 'USA',
      date: '2020-08-08'
    },
    {
      name: 'Craig Hause',
      location: 'Canada',
      date: '2020-07-29'
    },
    {
      name: 'Edward Grimes',
      location: 'Brazil',
      date: '2020-07-22'
    },
    {
      name: 'Bret Weaver',
      location: 'USA',
      date: '2020-07-20'
    },
    {
      name: 'Mark',
      location: 'India',
      date: '2020-06-09'
    },
    {
      name: 'Michael Thompson',
      location: 'UK',
      date: '2020-07-07'
    },
    {
      name: 'Susan Young',
      location: 'Belgium',
      date: '2020-05-08'
    },
    {
      name: 'Eric White',
      location: 'Sweden',
      date: '2020-10-08'
    }
  ].map((item, index) => {
    return Object.assign({}, item, {
      avatar: require('@/assets/images/users/' + (index + 1) + '.webp')
    })
  })
  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      render(src) {
        return (
          <Image
            className={styles.avatar}
            width={32}
            src={src}
          />
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      align: 'center'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: 'center'
    }
  ]
  return (
    <Table
      dataSource={userList}
      columns={columns}
      rowKey="name"
      pagination={false}
    >
    </Table>
  )
}

export default UserList
