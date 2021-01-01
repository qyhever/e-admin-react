export const getOption = () => {
  const data = [10, 52, 200, 334, 390, 330, 220, 110, 150, 221, 236, 289]
  const option = {
    color: ['#1890ff'],
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, .9)',
      extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);',
      padding: [20, 20],
      textStyle: {
        color: '#3c3c3c',
        fontSize: 12
      },
      axisPointer: {
        lineStyle: {
          color: '#ccc'
        }
      },
      formatter(data) {
        const [d] = data
        const { name, value, marker } = d
        return `
          <p style="margin-bottom: 8px; font-weight: 700">${name}</p>
          <div>
            ${marker}
            <span style="margin-left: 14px">${value}</span>
          </div>
        `
        // const stringList = data.map(item => {
        //   const { value, marker, seriesName } = item
        //   return `
        //     <div>
        //       ${marker}
        //       <span style="margin-left: 14px">${seriesName}:</span>
        //       <span style="margin-left: 14px">${value}</span>
        //     </div>
        //   `
        // })
        // return `
        //   <p style="margin-bottom: 8px; font-weight: 700">${name}</p>
        //   ${stringList.join('')}
        // `
      }
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#ebebeb'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#666'
      },
      data: Array(12).fill(null).map((_, index) => index + 1 + '月')
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#ddd'
        }
      },
      axisLabel: {
        color: '#666'
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: 30,
        data
      }
    ]
  }
  return option
}
