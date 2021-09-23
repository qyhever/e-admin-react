import React, { useMemo, useCallback, useRef } from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { message } from 'antd'
import { debounce } from 'lodash'
import { uploadFileToQiniu } from '@/api/global'

export default function Braft(props) {
  const { value, onChange, ...restProps } = props
  const editorIns = useRef(null)
  const onEditorChange = useMemo(() => {
    return debounce(v => {
      onChange && onChange(v)
    }, 100)
  }, [onChange])

  const onUpload = useCallback(async param => {
    try {
      const url = await uploadFileToQiniu(param.file, '', event => {
        param.progress(event.loaded / event.total * 100)
      })
      param.success({
        url,
        meta: {
          id: param.id,
          title: param.id,
          alt: '加载失败'
        }
      })
      setTimeout(() => {
        editorIns.current.forceRender()
      }, 20)
    } catch (err) {
      console.log(err)
      message.destroy()
      message.error('上传失败')
    }
  }, [])

  return (
    <BraftEditor
      ref={editorIns}
      {...restProps}
      value={BraftEditor.createEditorState(value)}
      onChange={onEditorChange}
      media={{ uploadFn: onUpload }}
    />
  )
}
