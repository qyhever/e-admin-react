import React, { useEffect, useRef } from 'react'
import { message, Tooltip, Row } from 'antd'
import { useHistory } from 'react-router-dom'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import asyncLoadScript from '@/utils/async-script'
const src = 'https://webapi.amap.com/maps?v=1.4.7&key=6a169cffad64fb2322801c076ae7d3ec&plugin=AMap.CitySearch,AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder'

function Analysis() {
  const mapRef = useRef(null)
  const history = useHistory()
  useEffect(() => {
    asyncLoadScript(src, window.AMap, err => {
      if (err) {
        message.destroy()
        message.warning('加载地图失败')
        return
      }
      mapRef.current = new window.AMap.Map('mapContainer', {
        zoom: 12
      })
    })
    return () => {
      mapRef.current.destroy()
    }
  }, [])

  function onBack() {
    history.goBack()
  }

  function onForward() {
    history.push('/market')
  }

  return (
    <div className={styles.analysis}>
      <Row className={styles.buttonGroup}>
        <Tooltip placement="bottom" title="返回">
          <Row className={styles.back} align="middle" justify="center" onClick={onBack}>
            <ArrowLeftOutlined />
          </Row>
        </Tooltip>
        <Tooltip placement="bottom" title="市场地图">
          <Row className={styles.forward} align="middle" justify="center" onClick={onForward}>
            <ArrowRightOutlined />
          </Row>
        </Tooltip>
      </Row>
      <div id="mapContainer" className={styles.mapContainer}></div>
    </div>
  )
}

export default Analysis
