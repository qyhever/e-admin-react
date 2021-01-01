import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { sumBy, flatten } from 'lodash'
import useEcharts from '@/hooks/useEcharts'
import { getOption } from './pie-option'
import styles from './pie.module.less'

const PieChart = () => {
  const chartRef = useRef(null)
  const [option, setOption] = useState({})

  const [disabledLegendIndexs, setDisabledLegendIndexs] = useState([])
  const list = useRef([])

  const [originalList, setOriginalList] = useState([])
  const colors = useRef([])
  const [originalColors, setOriginalColors] = useState([])

  const color = useMemo(() => ['#6394f9', '#62daaa', '#657797', '#f6c021', '#e96b5a', '#74caed'], [])

  const chartData = useMemo(() => [
    { value: 27, name: '分类一' },
    { value: 25, name: '分类二' },
    { value: 18, name: '分类三' },
    { value: 15, name: '分类四' },
    { value: 10, name: '分类五' },
    { value: 5, name: '其它' }
  ], [])

  useEcharts(chartRef.current, option)

  const initData = useCallback(() => {
    let scopeOriginalList = chartData.slice()
    const scopeList = chartData.slice()
    const total = sumBy(chartData, 'value')
    // originalList
    scopeOriginalList = chartData.map(item => {
      const percent = item.value / (total || 1) * 100
      return {
        name: item.name,
        value: item.value,
        percent: Math.round(percent)
      }
    })
    // 根据 数据 list 长度 和 prop color，补全不够的 colorItem
    const colorGroup = color
    const groupLen = color.length
    const len = Math.ceil((scopeList.length / groupLen) || 1)
    const colorList = flatten(Array(len).fill(colorGroup))
    list.current = scopeList
    setOriginalList(scopeOriginalList)
    colors.current = colorList.slice()
    setOriginalColors(colorList.slice())
  }, [chartData, color])

  useEffect(() => {
    const timer = setTimeout(() => {
      setOption(getOption(colors.current, list.current))
    }, 20)
    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    initData()
  }, [initData])

  function onLegendItemClick(clickIndex) {
    let scopeDisabledLegendIndexs = []
    if (disabledLegendIndexs.indexOf(clickIndex) >= 0) { // 选中集合中已有，放出当前点击数据
      scopeDisabledLegendIndexs = disabledLegendIndexs.filter(v => v !== clickIndex)
    } else { // 选中集合中没有，排除当前点击数据
      scopeDisabledLegendIndexs = disabledLegendIndexs.concat(clickIndex)
    }
    // 计算出新的数据后渲染
    list.current = originalList.filter((_, i) => scopeDisabledLegendIndexs.indexOf(i) < 0)
    colors.current = originalColors.filter((_, i) => scopeDisabledLegendIndexs.indexOf(i) < 0)
    setDisabledLegendIndexs(scopeDisabledLegendIndexs)
    setOption(getOption(colors.current, list.current))
  }

  return (
    <div className={styles.pie}>
      <div className={styles.chart} ref={chartRef}></div>
      <ul className={styles.legendList}>
        {originalList.map((item, index) => (
          <li
            className={`${styles.legendItem} ${disabledLegendIndexs.includes(index) ? styles.disabled : ''}`}
            key={index}
            onClick={() => onLegendItemClick(index)}
          >
            <div className={styles.round} style={{backgroundColor: originalColors[index]}}></div>
            <div className={styles.content}>
              <span className={styles.name}>{item.name}</span>
              <span className={styles.percent}>{item.percent}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PieChart
