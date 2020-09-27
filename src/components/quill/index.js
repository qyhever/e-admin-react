import React, { Component } from 'react'
import { message } from 'antd'
import { createImageFileInput } from '@/utils/dom'
import { uploadFileToQiniu } from '@/api/global'
import asyncLoadScript from '@/utils/async-script'
import Toolbar from './Toolbar'
import registerModule from './modules'
import './index.less'
const scriptSrc = process.env.PUBLIC_URL + '/quill1.3.6/quill.js'

export default class QuillEditor extends Component {
  constructor(props) {
    super(props)
    this.containerRef = el => this.containerEl = el
    this.toolbarRef = el => this.toolbarEl = el
    this.state = {
      value: props.value,
      loaded: false
    }
  }
  componentDidMount() {
    asyncLoadScript(scriptSrc, window.Quill, err => {
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
      this.setEditorContent(this.props.value)
    }
  }
  componentWillUnmount() {
    this.destroyEditor()
  }
  initEditor() {
    registerModule()
    const { placeholder = '请输入...' } = this.props
    const editor = this.editor = new window.Quill(this.containerEl, {
      theme: 'snow',
      placeholder,
      modules: {
        toolbar: this.toolbarEl
      }
    })
    this.addHandler()
    this.setEditorContent(this.props.value)
    editor.on('text-change', this.editorTextChangeHandler)
  }
  destroyEditor = () => {
    if (!this.editor) {
      return
    }
    this.editor.off('text-change', this.editorTextChangeHandler)
    this.editor = null
  }
  setEditorContent = (content) => {
    const editor = this.editor
    const delta = editor.clipboard.convert(content)
    editor.setContents(delta)
    // Promise.resolve().then(() => {
    //   this.setEditorSelection()
    // })
  }
  setEditorSelection = () => {
    const editor = this.editor
    const range = editor.getSelection()
    if (range) {
      const length = editor.getLength()
      range.index = Math.max(0, Math.min(range.index, length - 1))
      range.length = Math.max(0, Math.min(range.length, (length - 1) - range.index))
      editor.setSelection(range)
    }
  }
  addHandler = () => {
    const editor = this.editor
    const toolbar = editor.getModule('toolbar')
    toolbar.addHandler('image', () => {
      editor.setSelection(Math.max(editor.getSelection().index + 1, editor.getLength()))
      createImageFileInput().then(async file => {
        const hide = message.loading('上传中...', 0)
        try {
          const src = await uploadFileToQiniu(file)
          const range = editor.getSelection()
          if (range) {
            editor.insertEmbed(range.index, 'image', src)
            editor.setSelection(range.index + 1)
          }
        } catch (err) {
          console.log(err)
          message.destroy()
          message.error('上传失败')
        } finally {
          hide()
        }
      })
    })
  }
  editorTextChangeHandler = () => {
    // console.log('text', this.editor.getText())
    const value = this.editor.container.firstChild.innerHTML
    this.setState({
      value
    })
    this.props.onChange && this.props.onChange(value)
  }
  render() {
    const { loaded } = this.state
    const { height = '200px' } = this.props
    if (!loaded) {
      return <div style={{height}}></div>
    }
    return (
      <>
        <div ref={this.toolbarRef}>
          <Toolbar></Toolbar>
        </div>
        <div ref={this.containerRef} style={{height}}></div>
      </>
    )
  }
}
