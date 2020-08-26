import React from 'react'
import PageWrapper from '@/components/page-wrapper'

function Dashboard() {
  return (
    <PageWrapper>
      {Array(50).fill(null).map((_, index) =>
        <h3 key={index}>Dashboard</h3>
      )}
    </PageWrapper>
  )
}

export default React.memo(Dashboard)
