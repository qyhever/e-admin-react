import React, { useState, useCallback } from 'react'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

function About() {
  const [date, setDate] = useState(dayjs())
  const onChange = useCallback(value => {
    setDate(value)
  }, [])

  return (
    <div>
      About
      <DatePicker value={date} onChange={onChange} />
    </div>
  )
}

export default React.memo(About)
