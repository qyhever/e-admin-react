import React from 'react'
import { Typography } from 'antd'
import PageWrapper from '@/components/page-wrapper'

const { Paragraph } = Typography

export default function Clipboard() {
  return (
    <PageWrapper>
      <Paragraph copyable>This is a copyable text.</Paragraph>
      <Paragraph copyable={{ text: 'This is customer text' }}>Replace copy text.</Paragraph>
    </PageWrapper>
  )
}
