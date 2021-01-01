export const getOption = (
  color,
  list
) => {
  const option = {
    color,
    tooltip: {
      show: true,
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, .9)',
      extraCssText: 'box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);',
      padding: [10, 10],
      textStyle: {
        color: '#3c3c3c',
        fontSize: 12
      },
      formatter(data) {
        const { name, value, marker } = data
        return `
        <p style="margin-bottom: 8px">${name}</p>
        <div>${marker}
            <span style="margin-left: 28px">${value}</span>
        </div>
      `
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '60%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        itemStyle: {
          borderWidth: 1,
          borderColor: '#fff'
        },
        data: list
      }
    ]
  }
  return option
}
