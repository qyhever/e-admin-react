import React, { useState, useEffect } from 'react'
import PageWrapper from '@/components/page-wrapper'
import QuillEditor from '@/components/quill'

export default function Quill() {
  const [value, setValue] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => {
      setValue('<b>test</b>')
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [])
  return (
    <PageWrapper>
      <QuillEditor value={value} onChange={setValue}></QuillEditor>
    </PageWrapper>
  )
}
