import request from '@/api/request'
import { getExplore, getOS } from './device'
import { queryLocalCity } from './index'

;(async () => {
  const VISIT = 'VISIT'
  const startTime = localStorage.getItem(VISIT)

  if (startTime && new Date().getTime() - Number(startTime) < 10 * 60 * 1000) {
    return
  }

  try {
    const res = await queryLocalCity()
    const explore = getExplore()
    const response = await request({
      method: 'post',
      url: '/visit',
      data: {
        browser: explore.name + '' + explore.version,
        system: getOS(),
        ip: window.returnCitySN.cip,
        region: res.province + '-' + res.city,
        project: 'e-admin-react'
      }
    })
    console.log(response)
    localStorage.setItem(VISIT, new Date().getTime())
  } catch (err) {
    console.log(err)
  }
})()
