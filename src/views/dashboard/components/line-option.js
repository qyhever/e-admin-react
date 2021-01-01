export const getOption = () => {
  const data = {
    yearList: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
    salesList: [
      {
        name: 'Food',
        data: [136, 380, 270, 354, 337, 375, 116, 360, 400]
      },
      {
        name: 'Clothes',
        data: [438, 341, 495, 367, 456, 383, 406, 468, 361]
      },
      {
        name: 'Electronics',
        data: [320, 395, 333, 137, 500, 548, 308, 320, 527]
      }
    ]
  }
  
  const seriesData = data.salesList.map(item => {
    return {
      name: item.name,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      data: item.data
    }
  })
  
  const option = {
    color: ['#d897eb', '#f69899', '#64ea91'],
    grid: {
      top: 60,
      left: 60,
      right: 30,
      bottom: 60
    },
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
        const list = data
        const [d] = list
        const { name } = d
        const stringList = list.map(item => {
          const { value, marker, seriesName } = item
          return `
            <div>
              ${marker}
              <span style="margin-left: 14px">${seriesName}:</span>
              <span style="margin-left: 14px">${value}</span>
            </div>
          `
        })
        
        return `
          <p style="margin-bottom: 8px; font-weight: 700">${name}</p>
          ${stringList.join('')}
        `
      }
    },
    legend: {
      top: 20,
      right: 30,
      data: data.salesList.map(v => v.name)
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
      data: data.yearList
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
    series: seriesData
  }
  return option
}
