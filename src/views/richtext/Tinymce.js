import React, { useState, useEffect } from 'react'
import PageWrapper from '@/components/page-wrapper'
import TinymceEditor from '@/components/tinymce'

export default function Tinymce() {
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
      <TinymceEditor value={value} onChange={setValue}></TinymceEditor>
    </PageWrapper>
  )
}
