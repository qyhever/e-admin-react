/* eslint-disable */
/**
 * @desc 获取浏览器类型和版本
 * @return {String} eg：'Chrome: 65.0.3325.181'
 */
export function getExplore() {
  const sys = {}
  const ua = navigator.userAgent.toLowerCase()
  let m = null
  if (m = ua.match(/rv:([\d.]+)\) like gecko/)) {
    sys.name = 'IE'
  } else if (m = ua.match(/msie ([\d\.]+)/)) {
    sys.name = 'IE'
  } else if (m = ua.match(/edge\/([\d\.]+)/)) {
    sys.name = 'Edge'
  } else if (m = ua.match(/firefox\/([\d\.]+)/)) {
    sys.name = 'Firefox'
  } else if (m = ua.match(/(?:opera|opr).([\d\.]+)/)) {
    sys.name = 'Opera'
  } else if (m = ua.match(/chrome\/([\d\.]+)/)) {
    sys.name = 'Chrome'
  } else if (m = ua.match(/version\/([\d\.]+).*safari/)) {
    sys.name = 'Safari'
  } else {
    sys.name = 'Unkonwn'
    sys.version = 'Unkonwn'
  }
  if (m) {
    sys.version = m[1]
  }
  return sys
}

/**
 * @desc 获取操作系统类型
 * @return {String} eg：'windows'
 */
export function getOS() {
  const userAgent = navigator.userAgent || ''
  const appVersion = navigator.appVersion || ''

  if (/Windows Phone/i.test(appVersion)) {
    return 'WindowsPhone'
  }
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) {
    return 'ios'
  }
  if (/android/i.test(userAgent)) {
    return 'android'
  }
  if (/mac/i.test(appVersion)) {
    return 'MacOSX'
  }
  if (/win/i.test(appVersion)) {
    return 'Windows'
  }
  if (/linux/i.test(appVersion)) {
    return 'Linux'
  }
  return 'Unkonwn'
}
