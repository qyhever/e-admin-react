import React, { Component } from 'react'
import { message } from 'antd'
import asyncLoadScript from '@/utils/async-script'
import { uploadFileToQiniu } from '@/api/global'
import { getRandomStr } from '@/utils'
import plugins from './plugins'
import toolbar from './toolbar'
import initImageUploadPlugin from './customer-image-upload'
const scriptSrc = process.env.PUBLIC_URL + '/tinymce5.4.2/tinymce.js'

export default class TinymceEditor extends Component {
  static defaultProps = {
    height: 300
  }

  hasInit = false
  hasChange = false

  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      id: getRandomStr(),
      loaded: false
    }
  }

  componentDidMount() {
    asyncLoadScript(scriptSrc, window.tinymce, err => {
      if (err) {
        return message.warning('加载编辑器失败')
      }
      this.setState({
        loaded: true
      }, () => {
        this.initEditor()
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      if (this.hasInit && !this.hasChange) {
        this.editor.setContent(this.props.value || '')
      }
    }
  }

  componentWillUnmount() {
    this.editor && this.editor.remove()
  }

  initEditor = () => {
    const { id, value } = this.state
    const { height } = this.props
    initImageUploadPlugin()
    window.tinymce.init({
      selector: '#' + id,
      language: 'zh_CN',
      content_style: 'img {max-width:100%;}',
      auto_focus: false,
      height,
      min_height: height,
      object_resizing: false,
      placeholder: '请输入内容',
      plugins,
      toolbar,
      fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
      font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
      autosave_ask_before_unload: false,
      branding: false, // 隐藏编辑器界面右下角的“Powered by Tiny”（官方汉化为：由Tiny驱动）字样
      contextmenu: 'bold copy',
      elementpath: false, // 隐藏底栏的元素路径
      statusbar: false,
      toolbar_mode: 'wrap', // 工具栏布局模式
      quickbars_insert_toolbar: '', // [插入]快捷工具栏
      quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote', // [选择]快捷工具栏
      fullpage_default_font_size: '14px',
      ax_wordlimit_num: 140,
      ax_wordlimit_callback(editor, txt, num){
        message.destroy()
        message.warning('当前字数：' + txt.length + '，限制字数：' + num)
      },
      init_instance_callback: editor => {
        this.editor = editor
        editor.setContent(value || '')
        this.hasInit = true
        editor.on('keyup input', () => {
          this.hasChange = true
        })
        editor.on('NodeChange Change keyup', () => {
          const value = editor.getBody().innerHTML
          this.setState({
            value
          })
          this.props.onChange && this.props.onChange(value)
        })
      },
      imageSelectorCallback: async (file, success) => {
        const hide = message.loading('上传中...', 0)
        try {
          const src = await uploadFileToQiniu(file)
          success(src)
        } catch (err) {
          console.log(err)
          message.destroy()
          message.error('上传失败')
        } finally {
          hide()
        }
      }
    })
  }

  render() {
    const { id, loaded } = this.state
    const { height } = this.props
    if (!loaded) {
      return <div style={{height: height + 'px'}}></div>
    }
    return (
      <textarea id={id} style={{visibility: 'hidden', height: height + 'px'}}></textarea>
    )
  }
}
