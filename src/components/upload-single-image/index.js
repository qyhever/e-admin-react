import React, { useState } from 'react'
import { Upload, Spin } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { getQiniuToken } from '@/api/global'
import { getRandomStr } from '@/utils'
import styles from './index.module.less'

const QINIU_PREFIX = 'https://qiniu.qyhever.com/'
const QINIU_UPLOAD_URL = 'https://upload-z2.qiniup.com'

export default function UploadSingleImage(props) {
  const { value, uploadClassName = '', imgClassName = '', imgStyle = {}, onChange } = props
  const [params, setParams] = useState({})
  const [uploading, { setTrue: showLoading, setFalse: hideLoading }] = useBoolean(false)

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      const { response } = info.file
      const url = QINIU_PREFIX + response.key
      onChange(url)
      hideLoading()
    }
  }
  const handleBeforeUpload = async (file) => {
    try {
      showLoading()
      const { token } = await getQiniuToken()
      const fileName = file.name.replace(/\..*$/, '')
      setParams({
        token,
        key: getRandomStr() + fileName
      })
    } catch (error) {
      console.log(error)
      hideLoading()
      throw error
    }
  }
  return (
    <Upload
      listType="picture-card"
      action={QINIU_UPLOAD_URL}
      data={params}
      className={`${styles.uploadContainer} ${uploadClassName} ${value ? styles.hoverMask : ''}`}
      showUploadList={false}
      beforeUpload={handleBeforeUpload}
      onChange={handleChange}
    >
      <Spin className={styles.spin} spinning={uploading}></Spin>
      {value
        ? <img src={value} style={imgStyle} className={`${styles.image} ${imgClassName}`} alt="avatar" object-fit="cover" />
        : <PlusOutlined className={styles.uploadPlus} />
      }
      <div className={styles.uploadMask}>
        <PlusOutlined className={styles.uploadMaskPlus} />
      </div>
    </Upload>
  )
}
