import { Base64 } from 'js-base64'

const baseName = 'e-admin-react-mobx'
const TOKEN = `${baseName}-token`
const COLLAPSE = `${baseName}-collapse`
const USER = `${baseName}-user`
const REMEMBER_LOGIN_USER = `${baseName}-remember-login-user`
const SIDEBAR_THEME = `${baseName}-sidebar-theme`

export const setToken = token => {
  return localStorage.setItem(TOKEN, token)
}

export const getToken = () => {
  return localStorage.getItem(TOKEN)
}

export const removeToken = () => {
  return localStorage.removeItem(TOKEN)
}

export const setCollapse = value => {
  return localStorage.setItem(COLLAPSE, value)
}

export const getCollapse = () => {
  return JSON.parse(localStorage.getItem(COLLAPSE))
}
// data must be a object
export const setUser = data => {
  const enText = Base64.encode(JSON.stringify(data))
  return localStorage.setItem(USER, enText)
}

export const getUser = () => {
  const enText = localStorage.getItem(USER)
  if (!enText) {
    return null
  }
  let data = null
  try {
    const deText = Base64.decode(enText)
    data = JSON.parse(deText)
  } catch (err) {
    console.log(err)
  }
  return data
}

export const removeUser = () => {
  return localStorage.removeItem(USER)
}

export const removeUserData = () => {
  localStorage.removeItem(USER)
  localStorage.removeItem(TOKEN)
}

export const setRememberUser = (data) => {
  const enText = Base64.encode(JSON.stringify(data))
  return localStorage.setItem(REMEMBER_LOGIN_USER, enText)
}

export const getRememberUser = () => {
  const enText = localStorage.getItem(REMEMBER_LOGIN_USER)
  if (!enText) {
    return null
  }
  let data = null
  try {
    const deText = Base64.decode(enText)
    data = JSON.parse(deText)
  } catch (err) {
    console.log(err)
    removeRememberUser()
  }
  return data
}

export const removeRememberUser = () => {
  return localStorage.removeItem(REMEMBER_LOGIN_USER)
}

export const getSideBarTheme = () => {
  return localStorage.getItem(SIDEBAR_THEME)
}

export const setSideBarTheme = (value) => {
  return localStorage.setItem(SIDEBAR_THEME, value)
}
