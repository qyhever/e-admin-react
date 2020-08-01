import React, { Component } from 'react'
import { Upload, Icon, Spin } from 'antd'
import styles from './index.module.less'
import { getQiniuToken } from '@/api/common'
import classNames from 'classnames'

const QINIU_PREFIX = 'https://qiniu.qyhever.com/'
const QINIU_UPLOAD_URL = 'https://upload-z2.qiniup.com'

class Avatar extends Component {
  constructor(props) {
    super(props)
    const { value } = props
    this.params = {}
    this.state = {
      loading: false,
      imageUrl: value || ''
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('componentDidUpdate', prevProps, prevState)
  //   if (prevProps.value !== this.props.value) {
  //     this.setState({
  //       imageUrl: this.props.value || ''
  //     })
  //   }
  // }
  
  // UNSAFE_componentWillReceiveProps(nextProps) {
  //   if (nextProps.value !== this.props.value) {
  //     this.setState({
  //       imageUrl: nextProps.value || ''
  //     })
  //   }
  // }

  static getDerivedStateFromProps(props, state) {
    if (props.value !== state.value) {
      return { imageUrl: props.value || '' }
    }
    return null
  }

  handleChange = (info) => {
    if (info.file.status === 'done') {
      const { onChange } = this.props
      const { response } = info.file
      const url = QINIU_PREFIX + response.hash
      onChange(url)
      this.setState({ loading: false, imageUrl: url })
    }
  }
  
  beforeUpload = () => {
    return new Promise((resolve, reject) => {
      this.setState({ loading: true })
      getQiniuToken().then(res => {
        const { token } = res
        this.params.token = token
        resolve(true)
      }).catch(err => {
        console.log(err)
        this.setState({ loading: false })
        reject(err)
      })
    })
  }

  render() {
    const { loading, imageUrl } = this.state
    const uploadButton = (
      <div>
        {/* <Icon className={styles.icon} type={loading ? 'loading' : 'plus'} /> */}
        {loading ? null : <Icon className={styles.icon} type="plus" />}
      </div>
    )
    const {
      uploadClass = styles.uploadClass,
      imgClass = styles.imgClass,
      imgStyle
    } = this.props
    const uploadCls = classNames({
      [uploadClass]: true,
      'hover-mask': imageUrl
    })
    return (
      <Upload
        listType="picture-card"
        action={QINIU_UPLOAD_URL}
        data={this.params}
        className={uploadCls}
        showUploadList={false}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        <Spin spinning={loading}></Spin>
        {imageUrl ? <img src={imageUrl} style={imgStyle} className={imgClass} alt="avatar" /> : uploadButton}
        <div className="uploadr-mask">
          <Icon className={styles.icon} type="plus" />
        </div>
      </Upload>
    )
  }
}

export default Avatar
